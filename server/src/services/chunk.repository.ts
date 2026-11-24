import {Chunk, type IChunk} from "../models/chunk.js";

export interface UpsertChunkInput{
    chunkId:string;
    content:string;
    contentHash:string;
    metadata:{
        section:string;
        title:string;
        source:string;
    },
    embedding:number[];
}


export async function getExistingChunkHashes(): Promise<Map<string, string>>{
    const docs = await Chunk.find({}, {chunkId:1, contentHash:1}).lean();
    return new Map(docs.map((doc)=>[doc.chunkId, doc.contentHash]));
}

export async function upsertChunk(input:UpsertChunkInput): Promise<void>{
    await Chunk.findOneAndUpdate(
       { chunkId:input.chunkId},
       {
            $set:{
                content:input.content,
                contentHash:input.contentHash,
                metadata:input.metadata,
                embedding:input.embedding,
            },
       },
       {upsert:true, new:true}

    )
}

export async function deleteStaleChunk(staleIds:string[]):Promise<number>{
    if(staleIds.length === 0) return 0;
    const result = await Chunk.deleteMany({chunkId:{$in:staleIds}});
    return result.deletedCount;
}



export interface RetrievedChunk{
    chunkId:string;
    content:string;
    metadata:{
            section:string;
            title:string;
            source:string;
    },
    score:number;
}

export async function SearchSimilarChunks(
    queryVector:number[], 
    options: {limit?:number; section ?: string } = {}
    ):Promise<RetrievedChunk[]>  
{
    const limit = options.limit ?? 4;

    const vectorSearchStage = {
        index:"portfolio_vector_index",
        path:"embedding",
        queryVector,
        numCandidates:Math.max(limit * 10, 20),
        limit,
    }

    return Chunk.aggregate<RetrievedChunk>([
        {
            $vectorSearch: {
                ...vectorSearchStage,
                ...(options.section ? { filter: {"metadata.section": options.section} } : {}),
            },
        },
        {
            $project:{
                _id:0,
                chunkId:1,
                content:1,
                metadata:1,
                score:{$meta:"vectorSearchScore"},
            }
        }
    ])

}
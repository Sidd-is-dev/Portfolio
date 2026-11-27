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

function cosineSimilarity(left: number[], right: number[]): number {
    if (left.length !== right.length) {
        throw new Error("Cannot compare embeddings with different dimensions");
    }

    const dotProduct = left.reduce((sum, value, index) => {
        const otherValue = right[index];
        if (otherValue === undefined) {
            throw new Error("Cannot compare embeddings with different dimensions");
        }
        return sum + value * otherValue;
    }, 0);
    const magnitude = Math.hypot(...left) * Math.hypot(...right);

    if (magnitude === 0) {
        throw new Error("Cannot compare an empty embedding vector");
    }

    return (1 + dotProduct / magnitude) / 2;
}

export async function SearchChunksBySection(
    queryVector: number[],
    section: string,
    limit = 6
): Promise<RetrievedChunk[]> {
    const chunks = await Chunk.find({ "metadata.section": section })
        .limit(limit)
        .lean();

    return chunks
        .map((chunk) => ({
            chunkId: chunk.chunkId,
            content: chunk.content,
            metadata: chunk.metadata,
            score: Number(cosineSimilarity(queryVector, chunk.embedding).toFixed(3)),
        }))
        .sort((left, right) => right.score - left.score);
}
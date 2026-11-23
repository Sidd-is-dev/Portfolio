import mongoose, {Schema, type Document} from "mongoose";

export interface IChunkMetadata extends Document 
    {
        section:string;
        title:string;
        source:string;
    }

export interface IChunk extends Document {
    chunkId:string;
    content: string;
    contentHash:string;
    metadata:{
        section:string;
        title:string;
        source:string;
    }
    embedding:number[];
    updatedAt:Date;
}


const chunkSchema = new mongoose.Schema<IChunk>({
    chunkId:{type:String, required:true, unique:true, index:true},
    content:{type:String, required:true},
    contentHash:{type:String, required:true},
    metadata:{
        section:{type:String, required:true},
        title:{type:String, required:true},
        source:{type:String, required:true}
    },
    embedding:{type:[Number], required:true},
},
{timestamps:true}
);


export const Chunk = mongoose.model<IChunk>("ChunK", chunkSchema); 
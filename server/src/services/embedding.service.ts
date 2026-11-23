import {genAIClient, AI_MODELS } from "../lib/ai.js";

export type EmbeddingTask = "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY";

function normalizeVector(vector:number[]) :number[]{
    const norm = Math.hypot(...vector);
    if (norm === 0) return vector;
    return vector.map((v) => v/norm);
}


export async function generateEmbedding(
    text:string, 
    taskType:EmbeddingTask
):Promise<number[]>{
    
    const cleaned = text.trim();
    if (!cleaned) throw new Error("Cannont generate embedding for empty string");

    const response = await genAIClient.models.embedContent({
        model:AI_MODELS.embedding,
        contents:cleaned,
        config:{
            taskType,
            outputDimensionality:AI_MODELS.embeddingDimensions,
        },
    });

    const values = response.embeddings?.[0]?.values;

    if(!values || values.length !== AI_MODELS.embeddingDimensions){
        throw new Error(`Expected ${AI_MODELS.embeddingDimensions}-dim vector, received ${values?.length ?? 0}`);
    };

    return normalizeVector(values);

}
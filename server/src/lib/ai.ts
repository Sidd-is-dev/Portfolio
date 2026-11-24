import {GoogleGenAI} from "@google/genai";
import Groq from "groq-sdk";
import {env} from "../config/env.js";

// 1. create a new instance of the google genai client using api key from env
export const genAIClient = new GoogleGenAI({
    apiKey:env.EMBEDDING_API_KEY,   
})


// 2. create a new instance of the groq client using the api key from env
export const groqClient = new Groq({
    apiKey:env.LLM_API_KEY,
})


// 3. single source of truth for the model name to be used for the embedding and llm tasks
export const AI_MODELS = {
    embedding:"gemini-embedding-001",
    embeddingDimensions:768,
    chat:"llama-3.3-70b-versatile"
} as const;


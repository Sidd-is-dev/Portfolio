import {groqClient, AI_MODELS} from "../lib/ai.js"
import Groq from 'groq-sdk';


export interface ChatMessage{
    role:"system" | "user" | "assistant";
    content:string;
}

// Extract the exact message type expected by the SDK
type GroqMessage = Groq.Chat.Completions.ChatCompletionMessageParam;

export async function* streamChatCompletion(
    messages:GroqMessage[],
    signal?:AbortSignal
) : AsyncGenerator<string>{
    const stream = await groqClient.chat.completions.create(
        {
            model:AI_MODELS.chat,
            messages, 
            temperature:0.2,
            max_tokens:1024,
            stream:true,
            reasoning_effort:"low"
        },
        { signal }
    );

    for await (const chunk of stream){
        const token = chunk.choices[0]?.delta?.content;
        if(token){
            yield token;
        }
    }
}
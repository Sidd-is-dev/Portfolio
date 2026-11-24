// server/src/services/rag.service.ts
import { generateEmbedding } from "./embedding.service.js";
import { SearchSimilarChunks } from "./chunk.repository.js";
import { buildSystemPrompt, FALLBACK_MESSAGE } from "../prompts/portfolio.prompt.js";
import { streamChatCompletion, type ChatMessage } from "./llm.service.js";


export interface ChatHistoryTurn {
  role: "user" | "assistant";
  content: string;
}


export interface SourceCitation {
  section: string;
  title: string;
  score: number;
}


export interface RagStreamResult {
  sources: SourceCitation[];
  stream: AsyncGenerator<string>;
}


// MongoDB Atlas normalizes cosine similarity to [0, 1] via (1 + cos) / 2.
// Tune this value after checking logged scores against test recruiter questions.
const MIN_SIMILARITY_SCORE = 0.62;


async function* singleMessageStream(text: string): AsyncGenerator<string> {
  yield text;
}


export async function answerPortfolioQuery(
    question:string,
    history:ChatHistoryTurn[]=[],
    signal?:AbortSignal
): Promise<RagStreamResult>{

    // 1. Embed the visitor's question using RETRIEVAL_QUERY (asymmetric search)
  const queryVector = await generateEmbedding(question, "RETRIEVAL_QUERY");

  // 2. Retrieve Top-4 semantic matches from MongoDB Atlas
  const candidates = await SearchSimilarChunks(queryVector, { limit: 4 });

  // Helpful during development to tune MIN_SIMILARITY_SCORE
  console.log(
    "RAG Retrieval:",
    candidates.map((c) => `${c.metadata.title} (${c.score.toFixed(3)})`).join(", ")
  );

  // 3. Apply similarity threshold (anti-hallucination guardrail)
  const relevant = candidates.filter((c) => c.score >= MIN_SIMILARITY_SCORE);

  if (relevant.length === 0) {
    return {
      sources: [],
      stream: singleMessageStream(FALLBACK_MESSAGE),
    };
  }


  // 4. Assemble system prompt + sliding window of last 4 turns + current question
  const recentHistory = history.slice(-4);
  const messages: ChatMessage[] = [
    { role: "system", content: buildSystemPrompt(relevant) },
    ...recentHistory,
    { role: "user", content: question },
  ];


  // 5. Return source citations + Groq token generator
  const sources: SourceCitation[] = relevant.map((c) => ({
    section: c.metadata.section,
    title: c.metadata.title,
    score: Number(c.score.toFixed(3)),
  }));


  return {
    sources,
    stream: streamChatCompletion(messages, signal),
  };
}
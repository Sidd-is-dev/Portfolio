import fs from "node:fs/promises";
import path from "node:path";
import {connectDB, disconnectDB} from "../config/db.js";
import {ChunkMarkdown} from "../services/chunking.service.js"
import { generateEmbedding } from "../services/embedding.service.js";
import {getExistingChunkHashes, deleteStaleChunk, upsertChunk} from "../services/chunk.repository.js";

const KNOWLEDGE_DIR = path.resolve(process.cwd(), "../knowledge-base");

// Function to ingest the chunks in vector db.
async function ingest(){

    // db connection
    await connectDB();

    // files resolution
    const files = (await fs.readdir(KNOWLEDGE_DIR)).filter((f)=>f.endsWith(".md"));

    if (files.length===0) {
        throw new Error(`No .md files found in ${KNOWLEDGE_DIR}`);
    }

    // chunks building 
    const allChunks = [];
    for (const file of files) {
        const raw = await fs.readFile(path.join(KNOWLEDGE_DIR, file), "utf-8");
        allChunks.push(...ChunkMarkdown(raw, file));
    }

    const existingMap = await getExistingChunkHashes();
    let embedded = 0;
    let skipped = 0;

    for (const chunk of allChunks) {
        if (existingMap.get(chunk.chunkId) === chunk.contentHash) {
            skipped++;
            continue;
        }

        const embedding = await generateEmbedding(
        chunk.content,
        "RETRIEVAL_DOCUMENT"
        );

        await upsertChunk({ ...chunk, embedding });
        embedded++;
        console.log(`Indexed: ${chunk.chunkId}`);
    }

    const validIds = new Set(allChunks.map((c) => c.chunkId));
    const staleIds = [...existingMap.keys()].filter((id) => !validIds.has(id));
    const removed = await deleteStaleChunk(staleIds);

    console.log(
    `Done → Embedded: ${embedded}, Skipped: ${skipped}, Removed: ${removed}, Total: ${allChunks.length}`
    );
  }


  ingest().catch((err)=>console.error("Ingestion failed!", err)).finally(async()=> await disconnectDB());
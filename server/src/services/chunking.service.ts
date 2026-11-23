import crypto from "node:crypto";

export interface PreparedChunk {
  chunkId: string;
  content: string;
  contentHash: string;
  metadata: {
    section: string;
    title: string;
    source: string;
  };
}


const MAX_CHUNK_CHARS = 1200;
const OVERLAP_CHARS = 150;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}


function hashContent(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function splitWithOverlap(text: string): string[] {
  if (text.length <= MAX_CHUNK_CHARS) return [text];

  const parts: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + MAX_CHUNK_CHARS, text.length);
    parts.push(text.slice(start, end).trim());
    if (end === text.length) break;
    start = end - OVERLAP_CHARS;
  }

  return parts;
}


export function ChunkMarkdown(
  markdown: string,
  sourceFile: string
): PreparedChunk[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: { section: string; title: string; body: string[] }[] = [];

  let currentSection = "Overview";
  let currentTitle = "Overview";
  let currentBody: string[] = [];

  const flush = () => {
    const joined = currentBody.join("\n").trim();
    if (joined.length > 0) {
      blocks.push({
        section: currentSection,
        title: currentTitle,
        body: [joined],
      });
    }
    currentBody = [];
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      currentSection = line.replace(/^##\s+/, "").trim();
      currentTitle = currentSection;
    } else if (line.startsWith("### ")) {
      flush();
      currentTitle = line.replace(/^###\s+/, "").trim();
    } else if (!line.startsWith("# ")) {
      currentBody.push(line);
    }
  }
  flush();

  const prepared: PreparedChunk[] = [];
  const sourceSlug = slugify(sourceFile.replace(/\.md$/i, ""));

  for (const block of blocks) {
    const rawText = `${block.section} — ${block.title}\n${block.body[0]}`;
    const subChunks = splitWithOverlap(rawText);

    subChunks.forEach((content, index) => {
      const chunkId = `${sourceSlug}-${slugify(block.section)}-${slugify(block.title)}-${index}`;
      prepared.push({
        chunkId,
        content,
        contentHash: hashContent(content),
        metadata: {
          section: block.section,
          title: block.title,
          source: sourceFile,
        },
      });
    });
  }

  return prepared;
}
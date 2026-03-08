import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { KNOWLEDGE_INDEX_PATH, KNOWLEDGE_SOURCE_FILES } from '../config/knowledge';
import type { KnowledgeChunk, KnowledgeDocument, KnowledgeIndex } from '../lib/knowledge/types';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse') as (buffer: Buffer) => Promise<{ text: string }>;

function sanitizeText(input: string) {
  return input
    .replace(/\r/g, ' ')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function chunkText(text: string, chunkSize = 700): KnowledgeChunk[] {
  if (!text) return [];

  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const chunks: KnowledgeChunk[] = [];
  let buffer = '';
  let index = 1;

  for (const sentence of sentences) {
    if ((buffer + ' ' + sentence).trim().length > chunkSize && buffer) {
      chunks.push({ id: `chunk-${index++}`, text: buffer.trim() });
      buffer = sentence;
    } else {
      buffer = `${buffer} ${sentence}`.trim();
    }
  }

  if (buffer) {
    chunks.push({ id: `chunk-${index}`, text: buffer.trim() });
  }

  return chunks;
}

async function extractDocument(filePath: string, docIndex: number): Promise<KnowledgeDocument | null> {
  try {
    const absolute = path.resolve(filePath);
    const data = await fs.readFile(absolute);
    const parsed = await pdf(data);
    const text = sanitizeText(parsed.text || '');

    if (!text) {
      console.warn(`No extractable text for ${absolute} (may require OCR).`);
      return null;
    }

    const chunks = chunkText(text);
    if (!chunks.length) return null;

    return {
      id: `doc-${docIndex + 1}`,
      title: path.basename(absolute),
      filePath: absolute,
      chunks
    };
  } catch (error) {
    console.warn(`Failed to extract ${filePath}:`, error);
    return null;
  }
}

async function run() {
  const docs = await Promise.all(KNOWLEDGE_SOURCE_FILES.map((file, i) => extractDocument(file, i)));
  const documents = docs.filter((doc): doc is KnowledgeDocument => !!doc);

  const index: KnowledgeIndex = {
    generatedAt: new Date().toISOString(),
    documents
  };

  const outputPath = path.resolve(KNOWLEDGE_INDEX_PATH);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(index, null, 2), 'utf8');

  console.log(`Knowledge index written to ${outputPath}`);
  console.log(`Documents indexed: ${documents.length}`);
  console.log(`Chunks indexed: ${documents.reduce((sum, d) => sum + d.chunks.length, 0)}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

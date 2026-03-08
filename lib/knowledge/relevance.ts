import fs from 'node:fs/promises';
import path from 'node:path';
import { KNOWLEDGE_INDEX_PATH } from '@/config/knowledge';
import type { KnowledgeIndex, KnowledgeMatch } from './types';

const STOP_WORDS = new Set([
  'the',
  'and',
  'for',
  'that',
  'with',
  'from',
  'this',
  'your',
  'into',
  'about',
  'will',
  'have',
  'been',
  'are',
  'was',
  'were',
  'but',
  'can',
  'may',
  'any',
  'not',
  'all',
  'use',
  'using'
]);

let cachedIndex: KnowledgeIndex | null = null;

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));
}

function scoreChunk(queryTokens: string[], chunkText: string) {
  const chunkTokens = new Set(tokenize(chunkText));
  let score = 0;

  for (const token of queryTokens) {
    if (chunkTokens.has(token)) score += 1;
  }

  return score;
}

async function loadIndex() {
  if (cachedIndex) return cachedIndex;

  try {
    const filePath = path.resolve(KNOWLEDGE_INDEX_PATH);
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw) as KnowledgeIndex;
    cachedIndex = parsed;
    return parsed;
  } catch {
    return { generatedAt: '', documents: [] } as KnowledgeIndex;
  }
}

export async function getKnowledgeMatches(input: {
  title: string;
  summary: string;
  whyItMatters: string;
  llqpAngle?: string | null;
}) {
  const index = await loadIndex();
  if (!index.documents.length) return [] as KnowledgeMatch[];

  const query = [input.title, input.summary, input.whyItMatters, input.llqpAngle ?? ''].join(' ');
  const queryTokens = tokenize(query);

  const matches: KnowledgeMatch[] = [];

  for (const doc of index.documents) {
    for (const chunk of doc.chunks) {
      const score = scoreChunk(queryTokens, chunk.text);
      if (score < 3) continue;

      matches.push({
        docTitle: doc.title,
        filePath: doc.filePath,
        snippet: chunk.text.slice(0, 320),
        score
      });
    }
  }

  return matches.sort((a, b) => b.score - a.score).slice(0, 4);
}

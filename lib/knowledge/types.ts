export type KnowledgeChunk = {
  id: string;
  text: string;
};

export type KnowledgeDocument = {
  id: string;
  title: string;
  filePath: string;
  chunks: KnowledgeChunk[];
};

export type KnowledgeIndex = {
  generatedAt: string;
  documents: KnowledgeDocument[];
};

export type KnowledgeMatch = {
  docTitle: string;
  filePath: string;
  snippet: string;
  score: number;
};

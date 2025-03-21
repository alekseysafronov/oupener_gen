export type OpeningLine = {
  text: string;
  category: 'funny' | 'romantic' | 'casual' | 'creative';
  id?: string;
};

export type GeneratorState = {
  currentPhrase: OpeningLine | null;
  category: string;
  isLoading: boolean;
  savedPhrases: OpeningLine[];
}; 
export type OpeningLine = {
  text: string;
  category: 'funny' | 'romantic' | 'casual' | 'creative';
  id?: string;
  gender?: 'male' | 'female' | 'any';
  ageRange?: 'young' | 'middle' | 'mature' | 'any';
  userGender: 'male' | 'female' | 'any';
};

export type GeneratorState = {
  currentPhrase: OpeningLine | null;
  category: string;
  isLoading: boolean;
  savedPhrases: OpeningLine[];
};

export type GeneratorSettings = {
  gender: 'male' | 'female' | 'any';
  ageRange: 'young' | 'middle' | 'mature' | 'any';
  userGender: 'male' | 'female' | 'any';
}; 
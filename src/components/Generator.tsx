'use client';

import { useState, useEffect } from 'react';
import { OpeningLine } from '../types/types';
import { openingLines } from '../data/openingLines';
import SavedPhrases from './SavedPhrases';

const Generator = () => {
  const [currentPhrase, setCurrentPhrase] = useState<OpeningLine | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [savedPhrases, setSavedPhrases] = useState<OpeningLine[]>([]);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const categories = ['all', 'funny', 'romantic', 'casual', 'creative'];

  useEffect(() => {
    const saved = localStorage.getItem('savedPhrases');
    if (saved) {
      setSavedPhrases(JSON.parse(saved));
    }
  }, []);

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      const filteredLines = selectedCategory === 'all'
        ? openingLines
        : openingLines.filter(line => line.category === selectedCategory);
      
      const randomIndex = Math.floor(Math.random() * filteredLines.length);
      setCurrentPhrase(filteredLines[randomIndex]);
      setIsLoading(false);
    }, 500);
  };

  const handleCopyToClipboard = () => {
    if (currentPhrase) {
      navigator.clipboard.writeText(currentPhrase.text);
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 2000);
    }
  };

  const handleSavePhrase = () => {
    if (currentPhrase) {
      const phraseWithId = {
        ...currentPhrase,
        id: Date.now().toString()
      };
      const updatedPhrases = [...savedPhrases, phraseWithId];
      setSavedPhrases(updatedPhrases);
      localStorage.setItem('savedPhrases', JSON.stringify(updatedPhrases));
    }
  };

  const handleDeletePhrase = (id: string) => {
    const updatedPhrases = savedPhrases.filter(phrase => phrase.id !== id);
    setSavedPhrases(updatedPhrases);
    localStorage.setItem('savedPhrases', JSON.stringify(updatedPhrases));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Генератор фраз для знакомства
          </h2>
          <p className="text-center text-gray-600">
            Выберите категорию и нажмите кнопку для генерации фразы
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              aria-label={`Выбрать категорию ${category}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg font-medium
            hover:bg-purple-700 transition-colors disabled:opacity-50"
          aria-label="Сгенерировать фразу"
        >
          {isLoading ? 'Генерация...' : 'Сгенерировать фразу'}
        </button>

        {currentPhrase && (
          <div className="relative p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <p className="text-lg text-gray-800 text-center mb-4">{currentPhrase.text}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCopyToClipboard}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors relative"
                aria-label="Копировать фразу"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                {showCopyNotification && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
                    Скопировано!
                  </span>
                )}
              </button>
              <button
                onClick={handleSavePhrase}
                className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
                aria-label="Сохранить фразу"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="h-full">
        <SavedPhrases phrases={savedPhrases} onDelete={handleDeletePhrase} />
      </div>
    </div>
  );
};

export default Generator; 
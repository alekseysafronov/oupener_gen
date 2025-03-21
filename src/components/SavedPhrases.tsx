import { useState } from 'react';
import { OpeningLine } from '../types/types';

interface SavedPhrasesProps {
  phrases: OpeningLine[];
  onDelete: (id: string) => void;
}

const SavedPhrases = ({ phrases, onDelete }: SavedPhrasesProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (phrases.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <p className="text-gray-500 text-center">Нет сохраненных фраз</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        Сохраненные фразы
      </h3>
      <div className="space-y-3">
        {phrases.map((phrase) => (
          <div
            key={phrase.id}
            className="relative p-4 bg-white rounded-lg shadow-sm border border-gray-200 group"
          >
            <p className="text-gray-800 pr-8">{phrase.text}</p>
            <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
              {phrase.category}
            </span>
            <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => phrase.id && phrase.text && handleCopy(phrase.text, phrase.id)}
                className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors relative"
                aria-label="Копировать фразу"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
                {copiedId === phrase.id && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                    Скопировано!
                  </span>
                )}
              </button>
              <button
                onClick={() => phrase.id && onDelete(phrase.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Удалить фразу"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPhrases; 
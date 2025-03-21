import { OpeningLine } from '../types/types';

interface SavedPhrasesProps {
  phrases: OpeningLine[];
  onDelete: (id: string) => void;
}

const SavedPhrases = ({ phrases, onDelete }: SavedPhrasesProps) => {
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
            <button
              onClick={() => phrase.id && onDelete(phrase.id)}
              className="absolute bottom-2 right-2 p-1.5 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
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
        ))}
      </div>
    </div>
  );
};

export default SavedPhrases; 
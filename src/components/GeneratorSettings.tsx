import type { GeneratorSettings } from '../types/types';

interface GeneratorSettingsProps {
  settings: GeneratorSettings;
  onSettingsChange: (settings: GeneratorSettings) => void;
}

const GeneratorSettings = ({ settings, onSettingsChange }: GeneratorSettingsProps) => {
  const handleGenderChange = (gender: 'male' | 'female' | 'any') => {
    onSettingsChange({ ...settings, gender });
  };

  const handleAgeRangeChange = (ageRange: 'young' | 'middle' | 'mature' | 'any') => {
    onSettingsChange({ ...settings, ageRange });
  };

  const handleUserGenderChange = (userGender: 'male' | 'female') => {
    onSettingsChange({ ...settings, userGender });
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800">Настройки</h3>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Ваш пол
          </label>
          <div className="flex gap-2">
            {[
              { value: 'male', label: 'Мужской' },
              { value: 'female', label: 'Женский' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleUserGenderChange(option.value as 'male' | 'female')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors
                  ${settings.userGender === option.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Пол собеседника
          </label>
          <div className="flex gap-2">
            {[
              { value: 'any', label: 'Любой' },
              { value: 'male', label: 'Мужской' },
              { value: 'female', label: 'Женский' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleGenderChange(option.value as 'male' | 'female' | 'any')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors
                  ${settings.gender === option.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Возрастная группа
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'any', label: 'Любой' },
              { value: 'young', label: '18-25' },
              { value: 'middle', label: '26-35' },
              { value: 'mature', label: '36+' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleAgeRangeChange(option.value as 'young' | 'middle' | 'mature' | 'any')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors
                  ${settings.ageRange === option.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorSettings; 
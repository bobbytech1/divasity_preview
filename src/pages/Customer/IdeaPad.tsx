import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Header } from '../../components/Header/Header';
import { CustomButton } from '../../components/Button/CustomButton';

const CARD_COUNT = 9;
const STORAGE_KEY = 'idea_pad_cards';

export function IdeaPad() {
  const [cards, setCards] = useState<string[]>(Array(CARD_COUNT).fill(''));

  // Load from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCards(JSON.parse(stored));
    }
  }, []);

  // Save to session storage
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const handleChange = (index: number, value: string) => {
    const updated = [...cards];
    updated[index] = value;
    setCards(updated);
  };

  return (
    <div className="bg-white min-h-screen px-4">
      <Header
        name="Idea Pad"
        containerStyle="bg-white h-[7vh]"
        textStyle="capitalize"
        icon={<ChevronLeft />}
        handlePress={() => window.history.back()}
      />

      {/* Idea cards */}
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-6">
        {cards.map((text, index) => (
          <textarea
            key={index}
            value={text}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Idea ${index + 1}`}
            className={`w-full h-32 p-3 rounded-lg resize-none transition-all duration-150
              ${text.trim()
                ? 'bg-purple-100 border border-purple-300 focus:ring-purple-500'
                : 'bg-white border border-gray-300 focus:ring-gray-300'}
              focus:outline-none focus:ring-2`}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col justify-center gap-4 pt-10 pb-30">
        <CustomButton
          name="Collaborate"
          handlePress={() => alert('Collaborate clicked')}
          containerStyle="w-full text-dpurple border border-dpurple bg-white"
        />
        <CustomButton
          name="AI Generate"
          handlePress={() => alert('AI Generate clicked')}
          containerStyle="w-full text-white bg-dpurple"
        />
      </div>
    </div>
  );
}

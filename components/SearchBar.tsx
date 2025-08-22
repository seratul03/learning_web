// file: components/SearchBar.tsx
"use client";

interface SearchTriggerProps {
  onOpen: () => void;
}

export default function SearchBar({ onOpen }: SearchTriggerProps) {
  return (
    // The whole component is now a button that opens the overlay
    <button onClick={onOpen} className="w-full text-left">
      <div className="flex items-center bg-white/10 border border-white/20 rounded-full shadow-lg p-2 transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <span className="w-full bg-transparent text-gray-300 focus:outline-none px-4 py-2">
          What do you want to learn today?
        </span>
        <div className="bg-green-500 text-white font-bold rounded-full px-6 py-2">
          Search
        </div>
      </div>
    </button>
  );
}

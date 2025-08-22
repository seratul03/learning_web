// file: app/page.tsx
"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import LanguageMenu, { languages } from "@/components/LanguageMenu";
import ForYou from "@/components/ForYou";
import LearningSection from "@/components/LearningSection";
import SearchOverlay from "@/components/SearchOverlay"; // Import the new overlay

// ... (your Type Definitions for Video/Article)

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isSearching, setIsSearching] = useState(false);

  // NEW: State to control the search overlay
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // ... (your useEffect for loading saved language is unchanged)

  const handleSearch = async (topic: string) => {
    if (!topic.trim()) return;
    setIsSearching(true);
    setLoading(true);
    // ... (rest of your handleSearch function is unchanged)

    // Make sure to close the overlay after a search
    setIsSearchOpen(false);
  };

  // The "For You" cards will now open the search overlay and then search
  const handleTopicSelect = (topic: string) => {
    setIsSearchOpen(false); // Close overlay if it was open
    handleSearch(topic);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4 pt-20 pb-20">
      <div className="text-center mb-8">{/* ... Title ... */}</div>

      <div className="w-full max-w-3xl flex items-center gap-2 px-4 sticky top-4 bg-gray-900/50 backdrop-blur-md py-2 z-20">
        {/* The SearchBar now just opens the overlay */}
        <SearchBar onOpen={() => setIsSearchOpen(true)} />
        <LanguageMenu
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>

      {isSearching ? (
        <LearningSection
          loading={loading}
          error={error}
          aiExplanation={aiExplanation}
          youtubeVideos={youtubeVideos}
          articles={articles}
        />
      ) : (
        <ForYou onTopicSelect={handleTopicSelect} />
      )}

      {/* Render the Search Overlay and pass state to it */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearchSubmit={handleSearch}
      />
    </main>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Categories ---
const categories = [
  { id: "all", name: "All" },
  { id: "tech", name: "Technology" },
  { id: "arts", name: "Arts & Humanities" },
  { id: "science", name: "Science" },
  { id: "skills", name: "Life Skills" },
];

// --- Recommendations ---
const allRecommendations = [
  {
    title: "Space Exploration",
    description: "Learn about planets, stars, and the wonders of the universe.",
    icon: <span className="material-symbols-outlined">planet</span>,
    category: "tech",
  },
  {
    title: "The Roman Empire",
    description:
      "Explore the rise and fall of one of history's greatest civilizations.",
    icon: <span className="material-symbols-outlined">castle</span>,
    category: "arts",
  },
  {
    title: "Introduction to Psychology",
    description: "Understand the basics of the human mind and behavior.",
    icon: <span className="material-symbols-outlined">psychology</span>,
    category: "science",
  },
  {
    title: "The Art of Storytelling",
    description:
      "Learn the secrets to crafting compelling and memorable narratives.",
    icon: <span className="material-symbols-outlined">book_5</span>,
    category: "arts",
  },
  {
    title: "Basics of Personal Finance",
    description: "Master budgeting, saving, and investing for your future.",
    icon: <span className="material-symbols-outlined">attach_money</span>,
    category: "skills",
  },
  {
    title: "Fundamentals of UI/UX",
    description:
      "Learn principles of creating beautiful, user-friendly designs.",
    icon: <span className="material-symbols-outlined">apps</span>,
    category: "tech",
  },
  {
    title: "Chemistry Experiments",
    description: "Dive into fascinating chemical reactions and experiments.",
    icon: <span className="material-symbols-outlined">experiment</span>,
    category: "science",
  },
  {
    title: "Public Speaking Mastery",
    description: "Build confidence and deliver powerful, persuasive speeches.",
    icon: (
      <span className="material-symbols-outlined">connect_without_contact</span>
    ),
    category: "skills",
  },
];

// --- Card Component ---
type RecommendationCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onSelect: (topic: string) => void;
};

const RecommendationCard = ({
  title,
  description,
  icon,
  onSelect,
}: RecommendationCardProps) => (
  <motion.button
    onClick={() => onSelect(title)}
    aria-label={`Select topic: ${title}`}
    className="bg-white/5 p-6 rounded-xl border border-white/10 text-left h-full w-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 mb-4 text-3xl">
      {icon}
    </div>
    <h3 className="font-bold text-white text-lg">{title}</h3>
    <p className="text-gray-400 text-sm mt-1">{description}</p>
  </motion.button>
);

// --- Main Component ---
export default function ForYou({
  onTopicSelect,
}: {
  onTopicSelect: (topic: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  let filteredRecommendations =
    selectedCategory === "all"
      ? allRecommendations
      : allRecommendations.filter((rec) => rec.category === selectedCategory);

  if (filteredRecommendations.length < 5) {
    const fillers = Array.from(
      { length: 5 - filteredRecommendations.length },
      (_, i) => ({
        title: `Coming Soon ${i + 1}`,
        description: "Stay tuned for more recommendations.",
        icon: (
          <span className="material-symbols-outlined">hourglass_empty</span>
        ),
        category: selectedCategory,
      })
    );
    filteredRecommendations = [...filteredRecommendations, ...fillers];
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-white mb-4">
        Recommended For You
      </h2>
      <p className="text-gray-400 mb-6">
        First, tell us what you're interested in.
      </p>

      {/* Category Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors duration-200 ${
              selectedCategory === category.id
                ? "bg-green-500 border-green-500 text-white"
                : "bg-white/5 border-white/20 text-gray-300 hover:border-green-500"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Recommendation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredRecommendations.map((rec) => (
            <RecommendationCard
              key={rec.title}
              {...rec}
              onSelect={onTopicSelect}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

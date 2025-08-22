// file: components/SearchOverlay.tsx
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchSubmit: (topic: string) => void;
}

export default function SearchOverlay({
  isOpen,
  onClose,
  onSearchSubmit,
}: SearchOverlayProps) {
  const [topic, setTopic] = useState("");

  const trendingTopics = [
    "History of Ancient Rome",
    "Quantum Computing Explained",
    "Basics of Stoic Philosophy",
    "The Art of Japanese Woodblock Prints",
    "Neural Networks for Beginners",
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!topic.trim()) return;
    onSearchSubmit(topic);
    onClose(); // Close the overlay after search
  };

  const handleTopicClick = (selectedTopic: string) => {
    setTopic(selectedTopic);
    onSearchSubmit(selectedTopic);
    onClose(); // Close the overlay after selection
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center pt-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform transition-all">
                {/* The real search form is inside the overlay */}
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="flex items-center bg-white/10 border border-white/20 rounded-full shadow-lg p-2">
                    <input
                      autoFocus
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="What are you curious about?"
                      className="w-full text-lg bg-transparent text-white placeholder-gray-300 focus:outline-none px-6 py-3"
                    />
                    <button
                      type="submit"
                      className="bg-green-500 text-white font-bold rounded-full px-8 py-3 hover:bg-green-600 transition-colors"
                    >
                      Search
                    </button>
                  </div>
                </form>

                {/* Trending Topics Section */}
                <div className="mt-8 text-left">
                  <h3 className="font-bold text-white">Trending Topics</h3>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {trendingTopics.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleTopicClick(item)}
                        className="bg-white/10 px-4 py-2 rounded-full text-sm text-gray-200 hover:bg-white/20 hover:text-white transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

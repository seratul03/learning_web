// file: components/LanguageMenu.tsx
"use client";

import { Menu } from "@headlessui/react";
import { Fragment } from "react";

// Define our supported languages
export const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "hi", name: "हिन्दी" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
];

interface LanguageMenuProps {
  selectedLanguage: (typeof languages)[0];
  setSelectedLanguage: (language: (typeof languages)[0]) => void;
}

export default function LanguageMenu({
  selectedLanguage,
  setSelectedLanguage,
}: LanguageMenuProps) {
  return (
    // THE FIX for overlap: Added z-10 here
    <Menu as="div" className="relative inline-block text-left z-10">
      <div>
        <Menu.Button className="flex items-center justify-center w-12 h-12 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </Menu.Button>
      </div>

      <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-gray-800 border border-white/20 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1">
          {languages.map((lang) => (
            <Menu.Item key={lang.code}>
              {({ active }) => (
                <button
                  onClick={() => setSelectedLanguage(lang)}
                  className={`${
                    active ? "bg-green-500 text-white" : "text-gray-300"
                  } group flex rounded-md items-center justify-between w-full px-2 py-2 text-sm`}
                >
                  <span>{lang.name}</span>

                  {/* THE FIX for the tick mark: Conditionally render SVG */}
                  {selectedLanguage.code === lang.code && (
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 
                          01-1.414 0l-4-4a1 1 0 011.414-1.414L8 
                          12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}

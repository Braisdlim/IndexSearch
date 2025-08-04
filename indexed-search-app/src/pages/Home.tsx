import React, { useState, useMemo, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { commands } from "../data/dataset";
import Fuse from "fuse.js";
import { motion, AnimatePresence } from "framer-motion";

// Categorías principales extraídas del dataset
const ALL_CATEGORIES = [
  "Git", "Docker", "npm", "Node.js", "Linux", "Unix", "Kubernetes", "AWS", "Database", "Network", "Security", "Python", "Monitoring", "Package Manager"
];

// Optimized Fuse.js configuration for faster searches
const fuseOptions = {
  keys: [
    { name: "name", weight: 0.7 },
    { name: "description", weight: 0.2 },
    { name: "tags", weight: 0.1 }
  ],
  threshold: 0.3, // Lower threshold for more precise matches
  distance: 100, // Allow for more typos
  minMatchCharLength: 2, // Minimum characters to start matching
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  findAllMatches: false, // Only find best matches for performance
  useExtendedSearch: false,
  ignoreLocation: true, // Search anywhere in the string
  ignoreFieldNorm: true // Don't normalize field lengths
};

// Debounce hook for search optimization
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 150); // 150ms debounce

  // Filtrado por texto y categorías
  const filtered = useMemo(() => {
    let filteredCommands = commands;
    if (selectedCategories.length > 0) {
      filteredCommands = filteredCommands.filter(cmd =>
        selectedCategories.some(cat => cmd.tags.includes(cat))
      );
    }
    if (!debouncedQuery.trim()) return filteredCommands;
    
    const results = new Fuse(filteredCommands, fuseOptions).search(debouncedQuery);
    return results.slice(0, 50).map(result => result.item); // Limit results for performance
  }, [debouncedQuery, selectedCategories]);

  // Memoized callback for search input
  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  // Animación y lógica de chips
  const handleChipClick = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-800 dark:from-slate-950 dark:via-blue-950 dark:to-cyan-900">
      {/* Header elegante con responsive mejorado para móviles */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"></div>
        <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 leading-tight px-1">
              Command Library
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-cyan-100 dark:text-cyan-200 mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto leading-relaxed px-2">
              Search and discover terminal commands with fuzzy search. Find Git, Docker, npm, and Linux commands instantly.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Chips de categorías con responsive mejorado para móviles */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 justify-center mb-3 sm:mb-4 md:mb-6 lg:mb-8">
        <AnimatePresence>
          {ALL_CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => handleChipClick(cat)}
              className={`px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-full font-medium text-xs sm:text-sm md:text-base lg:text-lg transition-colors border border-cyan-400/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/40
                ${selectedCategories.includes(cat)
                  ? 'bg-cyan-500 text-white scale-105 shadow-cyan-500/30'
                  : 'bg-slate-800/60 text-cyan-200 hover:bg-cyan-700/30'}
              `}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {cat}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Contenido principal con responsive mejorado para móviles */}
      <div className="w-full px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 pb-6 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-2xl border border-cyan-500/20 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12"
        >
          <SearchBar value={query} onChange={handleSearchChange} />

          {/* Estadísticas con responsive mejorado para móviles */}
          <motion.div
            className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm md:text-base lg:text-lg text-cyan-200 dark:text-cyan-300 gap-1 sm:gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 lg:space-x-4">
              <span className="flex items-center justify-center sm:justify-start">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                {filtered.length} of {commands.length} commands
              </span>
              {debouncedQuery && (
                <span className="flex items-center justify-center sm:justify-start">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Fuzzy search active
                </span>
              )}
            </div>
          </motion.div>
          <SearchResults results={filtered} query={debouncedQuery} />
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 
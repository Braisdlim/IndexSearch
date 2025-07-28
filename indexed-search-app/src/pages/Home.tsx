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

  // Memoize Fuse instance to avoid recreating it on every render
  // const fuse = useMemo(() => new Fuse(commands, fuseOptions), []); // Eliminada porque no se usa

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
      {/* Header elegante */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4 lg:mb-6">
              Command Library
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-cyan-100 dark:text-cyan-200 mb-8 lg:mb-12 max-w-4xl mx-auto leading-relaxed">
              Search and discover terminal commands with fuzzy search. Find Git, Docker, npm, and Linux commands instantly.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Chips de categorías */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2 justify-center mb-6">
        <AnimatePresence>
          {ALL_CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => handleChipClick(cat)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors border border-cyan-400/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/40
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

      {/* Contenido principal */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-2xl border border-cyan-500/20 p-6 sm:p-8 lg:p-12"
        >
          <SearchBar value={query} onChange={handleSearchChange} />

          {/* Estadísticas */}
          <motion.div
            className="mt-6 lg:mt-8 flex items-center justify-between text-sm lg:text-base text-cyan-200 dark:text-cyan-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-4 lg:space-x-6">
              <span className="flex items-center">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                {filtered.length} of {commands.length} commands
              </span>
              {debouncedQuery && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
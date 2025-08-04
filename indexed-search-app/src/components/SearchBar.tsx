import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = memo(({ value, onChange }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const handleClear = useCallback(() => {
    onChange("");
  }, [onChange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full"
    >
      <div className="relative w-full">
        <motion.div 
          className="absolute inset-y-0 left-0 pl-2 sm:pl-3 md:pl-4 lg:pl-6 xl:pl-8 flex items-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Search className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 text-cyan-400" />
        </motion.div>
        
        <motion.input
          type="text"
          className="w-full pl-8 sm:pl-10 md:pl-12 lg:pl-14 xl:pl-16 pr-8 sm:pr-10 md:pr-12 lg:pr-14 xl:pr-16 py-2.5 sm:py-3 md:py-4 lg:py-5 xl:py-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm border border-cyan-400/30 dark:border-cyan-500/30 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 shadow-lg transition-all duration-300 placeholder-cyan-200 dark:placeholder-cyan-300 text-white dark:text-cyan-100"
          placeholder="Search commands, functions, tools..."
          value={value}
          onChange={handleChange}
          whileFocus={{
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(34, 211, 238, 0.3), 0 10px 10px -5px rgba(34, 211, 238, 0.2)"
          }}
          transition={{ duration: 0.2 }}
        />
        
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-2 sm:pr-3 md:pr-4 lg:pr-6 xl:pr-8 flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 text-cyan-400 hover:text-cyan-300 dark:hover:text-cyan-200 transition-colors" />
          </motion.button>
        )}
      </div>
      
      {value && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 sm:mt-3 md:mt-4 lg:mt-5 flex items-center justify-center sm:justify-start text-xs sm:text-sm md:text-base lg:text-lg text-cyan-300 dark:text-cyan-200"
        >
          <div className="flex space-x-1 sm:space-x-1.5">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 1, repeat: Infinity }} 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 bg-cyan-400 rounded-full" 
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 bg-cyan-400 rounded-full" 
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 bg-cyan-400 rounded-full" 
            />
          </div>
          <span className="ml-1.5 sm:ml-2 md:ml-3 lg:ml-4">Searching...</span>
        </motion.div>
      )}
    </motion.div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar; 
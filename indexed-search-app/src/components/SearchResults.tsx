import React, { memo, useRef, useState, useLayoutEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FixedSizeGrid as Grid } from "react-window";
import { GitBranch, Container, Package, Terminal, Code, Search, Copy, Check } from "lucide-react";
import { useResponsive } from "../hooks/useResponsive";

interface Command {
  id: number;
  name: string;
  description: string;
  tags: string[];
}

interface SearchResultsProps {
  results: Command[];
  query: string;
}

const getCommandIcon = (tags: string[]) => {
  if (tags.includes("Git")) return <GitBranch className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />;
  if (tags.includes("Docker")) return <Container className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />;
  if (tags.includes("npm") || tags.includes("Node.js")) return <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />;
  if (tags.includes("Linux") || tags.includes("Unix")) return <Terminal className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />;
  return <Code className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />;
};

const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-cyan-500/30 text-cyan-100 font-semibold px-1 rounded">{part}</span>
    ) : part
  );
};

const ResultCard = memo(({ command, query }: { command: Command; query: string }) => {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { isMobile } = useResponsive();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-cyan-500/20 border border-cyan-500/20 dark:border-cyan-400/20 overflow-hidden cursor-pointer transition-all duration-300 m-0.5 sm:m-1 md:m-1.5 lg:m-2">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 transform -translate-x-full group-hover:translate-x-full"></div>
      <div className="relative p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6">
        <div className="flex items-start justify-between mb-1.5 sm:mb-2 md:mb-3 lg:mb-4">
          <div className="flex-1 min-w-0 pr-2 sm:pr-3">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-cyan-100 dark:text-cyan-200 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 group-hover:text-cyan-300 dark:group-hover:text-cyan-100 transition-colors font-mono break-words leading-tight">
              {highlightText(command.name, query)}
            </h3>
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-cyan-200 dark:text-cyan-300 leading-relaxed ${isMobile ? 'line-clamp-2' : 'line-clamp-3'}`}>
              {highlightText(command.description, query)}
            </p>
          </div>
          <div className="ml-1.5 sm:ml-2 md:ml-3 lg:ml-4 p-1 sm:p-1.5 md:p-2 lg:p-3 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-md sm:rounded-lg text-white flex-shrink-0 flex items-center gap-0.5 sm:gap-1 md:gap-1.5">
            {getCommandIcon(command.tags)}
            <div className="relative">
              <button
                className="ml-0.5 sm:ml-1 md:ml-1.5 p-0.5 sm:p-1 rounded hover:bg-cyan-700/30 transition-colors"
                onClick={handleCopy}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                aria-label="Copy command"
              >
                {copied ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="text-green-400"
                  >
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  </motion.span>
                ) : (
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-cyan-200" />
                )}
              </button>
              {showTooltip && !copied && (
                <span className="absolute z-10 left-1/2 -translate-x-1/2 top-5 sm:top-6 md:top-8 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded bg-slate-900 text-cyan-100 shadow-lg animate-fade-in">
                  Copy
                </span>
              )}
              {copied && (
                <span className="absolute z-10 left-1/2 -translate-x-1/2 top-5 sm:top-6 md:top-8 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded bg-green-700 text-white shadow-lg animate-fade-in">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2">
          {command.tags.slice(0, isMobile ? 2 : 3).map((tag) => (
            <span key={tag} className="px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1.5 bg-gradient-to-r from-cyan-900/50 to-teal-900/50 dark:from-cyan-800/50 dark:to-teal-800/50 text-cyan-200 dark:text-cyan-300 rounded-full text-xs sm:text-sm font-medium border border-cyan-500/30 dark:border-cyan-400/30">
              {highlightText(tag, query)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
ResultCard.displayName = 'ResultCard';

const NoResults = memo(() => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 text-center">
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        transition={{ delay: 0.2 }} 
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 md:mb-4 lg:mb-6 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-full flex items-center justify-center"
      >
        <Search className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-cyan-400" />
      </motion.div>
      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-cyan-100 dark:text-cyan-200 mb-1 sm:mb-2">No commands found</h3>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-cyan-200 dark:text-cyan-300">Try different search terms</p>
    </motion.div>
  );
});
NoResults.displayName = 'NoResults';

// Responsive card dimensions with improved mobile support
const getCardDimensions = (screenWidth: number) => {
  if (screenWidth < 480) { // Extra small mobile
    return { minWidth: 240, maxWidth: 280, height: 120, gap: 4 };
  } else if (screenWidth < 640) { // sm
    return { minWidth: 260, maxWidth: 300, height: 130, gap: 6 };
  } else if (screenWidth < 768) { // md
    return { minWidth: 280, maxWidth: 320, height: 150, gap: 8 };
  } else if (screenWidth < 1024) { // lg
    return { minWidth: 300, maxWidth: 350, height: 170, gap: 12 };
  } else if (screenWidth < 1280) { // xl
    return { minWidth: 320, maxWidth: 380, height: 190, gap: 16 };
  } else if (screenWidth < 1536) { // 2xl
    return { minWidth: 340, maxWidth: 400, height: 210, gap: 20 };
  } else { // 3xl+
    return { minWidth: 360, maxWidth: 420, height: 230, gap: 24 };
  }
};

function useResizeObserver(ref: React.RefObject<HTMLDivElement | null>, callback: (width: number) => void) {
  useLayoutEffect(() => {
    if (!ref.current) return;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (entries[0]) {
        callback(entries[0].contentRect.width);
      }
    };
    const observer = new window.ResizeObserver(handleResize);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback]);
}

const SearchResults: React.FC<SearchResultsProps> = memo(({ results, query }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const { screenHeight } = useResponsive();

  useResizeObserver(containerRef, setContainerWidth);

  // Calculate responsive dimensions
  const { minWidth, maxWidth, height, gap } = getCardDimensions(containerWidth);
  const columnCount = Math.max(1, Math.floor((containerWidth + gap) / (minWidth + gap)));
  const cardWidth = Math.min(
    maxWidth,
    Math.floor((containerWidth - gap * (columnCount + 1)) / columnCount)
  );
  const rowCount = Math.ceil(results.length / columnCount);
  const gridHeight = Math.min(screenHeight - 350, rowCount * (height + gap));

  // Render cell
  type GridCellProps = { columnIndex: number; rowIndex: number; style: React.CSSProperties };
  const Cell = useCallback(({ columnIndex, rowIndex, style }: GridCellProps) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= results.length) return null;
    
    const left = typeof style.left === 'number' ? style.left + gap : gap;
    const top = typeof style.top === 'number' ? style.top + gap : gap;
    const width = typeof style.width === 'number' ? style.width - gap : undefined;
    const height = typeof style.height === 'number' ? style.height - gap : undefined;
    
    return (
      <div style={{ ...style, left, top, width, height }}>
        <ResultCard command={results[index]} query={query} />
      </div>
    );
  }, [results, query, columnCount, gap]);

  if (results.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 w-full flex justify-center" ref={containerRef}>
      <Grid
        columnCount={columnCount}
        rowCount={rowCount}
        columnWidth={cardWidth + gap}
        rowHeight={height + gap}
        width={containerWidth}
        height={gridHeight}
        style={{ overflowX: 'hidden' }}
      >
        {Cell}
      </Grid>
    </div>
  );
});
SearchResults.displayName = 'SearchResults';

export default SearchResults; 
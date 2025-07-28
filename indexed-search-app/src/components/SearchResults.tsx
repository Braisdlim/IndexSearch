import React, { memo, useRef, useState, useLayoutEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FixedSizeGrid as Grid } from "react-window";
import { GitBranch, Container, Package, Terminal, Code, Search, Copy, Check } from "lucide-react";

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
  if (tags.includes("Git")) return <GitBranch className="w-6 h-6" />;
  if (tags.includes("Docker")) return <Container className="w-6 h-6" />;
  if (tags.includes("npm") || tags.includes("Node.js")) return <Package className="w-6 h-6" />;
  if (tags.includes("Linux") || tags.includes("Unix")) return <Terminal className="w-6 h-6" />;
  return <Code className="w-6 h-6" />;
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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl lg:rounded-2xl shadow-2xl hover:shadow-cyan-500/20 border border-cyan-500/20 dark:border-cyan-400/20 overflow-hidden cursor-pointer transition-all duration-300 m-2">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 transform -translate-x-full group-hover:translate-x-full"></div>
      <div className="relative p-4 sm:p-5 lg:p-6">
        <div className="flex items-start justify-between mb-3 lg:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-cyan-100 dark:text-cyan-200 mb-2 group-hover:text-cyan-300 dark:group-hover:text-cyan-100 transition-colors font-mono break-words">
              {highlightText(command.name, query)}
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-cyan-200 dark:text-cyan-300 leading-relaxed line-clamp-3">
              {highlightText(command.description, query)}
            </p>
          </div>
          <div className="ml-3 lg:ml-4 p-2 lg:p-3 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg text-white flex-shrink-0 flex items-center gap-2">
            {getCommandIcon(command.tags)}
            <div className="relative">
              <button
                className="ml-2 p-1 rounded hover:bg-cyan-700/30 transition-colors"
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
                    <Check className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <Copy className="w-5 h-5 text-cyan-200" />
                )}
              </button>
              {showTooltip && !copied && (
                <span className="absolute z-10 left-1/2 -translate-x-1/2 top-8 px-2 py-1 text-xs rounded bg-slate-900 text-cyan-100 shadow-lg animate-fade-in">
                  Copy
                </span>
              )}
              {copied && (
                <span className="absolute z-10 left-1/2 -translate-x-1/2 top-8 px-2 py-1 text-xs rounded bg-green-700 text-white shadow-lg animate-fade-in">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 lg:gap-2">
          {command.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 lg:px-2 lg:py-1 bg-gradient-to-r from-cyan-900/50 to-teal-900/50 dark:from-cyan-800/50 dark:to-teal-800/50 text-cyan-200 dark:text-cyan-300 rounded-full text-xs font-medium border border-cyan-500/30 dark:border-cyan-400/30">
              {highlightText(tag, query)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
ResultCard.displayName = 'ResultCard';

const NoResults = memo(() => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 lg:mt-12 text-center">
    <motion.div 
      initial={{ scale: 0 }} 
      animate={{ scale: 1 }} 
      transition={{ delay: 0.2 }} 
      className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-full flex items-center justify-center"
    >
      <Search className="w-8 h-8 lg:w-10 lg:h-10 text-cyan-400" />
    </motion.div>
    <h3 className="text-lg lg:text-xl font-semibold text-cyan-100 dark:text-cyan-200 mb-2">No commands found</h3>
    <p className="text-cyan-200 dark:text-cyan-300">Try different search terms</p>
  </motion.div>
));
NoResults.displayName = 'NoResults';

const MIN_CARD_WIDTH = 320;
const MAX_CARD_WIDTH = 400;
const CARD_HEIGHT = 180;
const GRID_GAP = 16;

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

  useResizeObserver(containerRef, setContainerWidth);

  // Calculate columns and card width responsively
  const columnCount = Math.max(1, Math.floor((containerWidth + GRID_GAP) / (MIN_CARD_WIDTH + GRID_GAP)));
  const cardWidth = Math.min(
    MAX_CARD_WIDTH,
    Math.floor((containerWidth - GRID_GAP * (columnCount + 1)) / columnCount)
  );
  const rowCount = Math.ceil(results.length / columnCount);
  const gridHeight = Math.min(window.innerHeight - 300, rowCount * (CARD_HEIGHT + GRID_GAP));

  // Render cell
  type GridCellProps = { columnIndex: number; rowIndex: number; style: React.CSSProperties };
  const Cell = useCallback(({ columnIndex, rowIndex, style }: GridCellProps) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= results.length) return null;
    // Aseguramos que las propiedades existen y son de tipo number
    const left = typeof style.left === 'number' ? style.left + GRID_GAP : GRID_GAP;
    const top = typeof style.top === 'number' ? style.top + GRID_GAP : GRID_GAP;
    const width = typeof style.width === 'number' ? style.width - GRID_GAP : undefined;
    const height = typeof style.height === 'number' ? style.height - GRID_GAP : undefined;
    return (
      <div style={{ ...style, left, top, width, height }}>
        <ResultCard command={results[index]} query={query} />
      </div>
    );
  }, [results, query, columnCount]);

  if (results.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="mt-8 lg:mt-12 w-full flex justify-center" ref={containerRef}>
      <Grid
        columnCount={columnCount}
        rowCount={rowCount}
        columnWidth={cardWidth + GRID_GAP}
        rowHeight={CARD_HEIGHT + GRID_GAP}
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
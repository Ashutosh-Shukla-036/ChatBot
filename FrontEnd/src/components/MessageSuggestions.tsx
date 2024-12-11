import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Code, Coffee, Music, Cloud } from "lucide-react";

interface Suggestion {
  icon: React.ElementType;
  text: string;
  description: string;
  category: string;
}

const suggestions: Suggestion[] = [
  {
    icon: Brain,
    text: "Explain quantum computing",
    description: "Learn about quantum mechanics and computing",
    category: "Science",
  },
  {
    icon: Code,
    text: "Help me with React hooks",
    description: "Get coding assistance and best practices",
    category: "Programming",
  },
  {
    icon: Coffee,
    text: "Tell me a joke",
    description: "Get a quick laugh",
    category: "Fun",
  },
  {
    icon: Music,
    text: "Write a short story",
    description: "Experience creative storytelling",
    category: "Creative",
  },
  {
    icon: Cloud,
    text: "Weather",
    description: "Check the current weather conditions",
    category: "Utility",
  },
  {
    icon: Sparkles,
    text: "Give me a random fact",
    description: "Learn something interesting",
    category: "Knowledge",
  },
];

interface MessageSuggestionsProps {
  onSelect: (suggestion: string) => void;
}

export function MessageSuggestions({ onSelect }: MessageSuggestionsProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 px-4">
        <AnimatePresence>
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <motion.button
                key={suggestion.text}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => onSelect(suggestion.text)}
                className="relative p-4 bg-gradient-to-br from-white to-gray-50 
                         dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg
                         hover:shadow-xl transition-all duration-300 group
                         border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{
                        rotate: hoveredIndex === index ? 360 : 0,
                        scale: hoveredIndex === index ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                      className="p-2 bg-blue-500 rounded-lg text-white"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                  </div>
                  <div className="flex-1 text-left">
                    <motion.div
                      animate={{
                        x: hoveredIndex === index ? 5 : 0,
                      }}
                      className="font-medium text-gray-900 dark:text-white mb-1"
                    >
                      {suggestion.text}
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0.5 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0.5,
                      }}
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      {suggestion.description}
                    </motion.p>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      className="inline-block mt-2 text-xs font-medium text-blue-500 
                               dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 
                               px-2 py-1 rounded-full"
                    >
                      {suggestion.category}
                    </motion.span>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0.8,
                  }}
                  className="absolute -top-2 -right-2 bg-blue-500 text-white
                           rounded-full p-1.5 shadow-lg"
                >
                  <Sparkles className="w-3 h-3" />
                </motion.div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

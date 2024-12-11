import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Zap } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoadingDots } from './components/LoadingDots';
import { ThemeToggle } from './components/ThemeToggle';
import { MessageSuggestions } from './components/MessageSuggestions';
import { generateContent } from './components/Model'; // Import the new function
import { Message, ChatState } from './types/chat';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceInput from './components/VoiceInput';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the latest message when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };

    // Add user message and set loading state
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await generateContent(content);

      // Format the received response
      const formattedResponse = response
        ? response
            .replace(/• /g, '\n- ') // Convert bullet points to dashes
            .replace(/\*\*([^\*]+)\*\*/g, '**$1**') // Retain bold formatting
            .replace(/\* ([^\*]+)\*/g, '    - $1') // Indent sub-points
            .replace(/(Location|Timeframe|Details|Example Request)/g, '\n### $1\n') // Add headings
            .replace(/: /g, ':\n') // Ensure proper spacing
            .trim()
        : 'Sorry, I could not generate a response.';

      const assistantMessage: Message = {
        role: 'assistant',
        content: formattedResponse,
      };

      // Update state with assistant's response
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to get response. Please try again.',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-200">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl shadow-lg"
              >
                <MessageSquare className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  AI ChatBot
                </motion.h1>
                <motion.p
                  className="text-sm text-gray-500 dark:text-gray-400"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Powered by Google Gemini
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 min-h-[600px] flex flex-col"
        >
          <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
            <AnimatePresence mode="wait">
              {chatState.messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center mt-8"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className="inline-block bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg mb-6"
                  >
                    <Zap className="w-12 h-12 text-white" />
                  </motion.div>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                  >
                    Welcome to AI ChatBot!
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 dark:text-gray-300 mb-8"
                  >
                    Choose a suggestion below or ask me anything!
                  </motion.p>
                  <MessageSuggestions onSelect={handleSendMessage} />
                </motion.div>
              ) : (
                chatState.messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))
              )}
            </AnimatePresence>
            {chatState.isLoading && (
              <div className="text-center">
                <LoadingDots />
              </div>
            )}
            {chatState.error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/20 p-3 rounded-lg"
              >
                {chatState.error}
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex items-center gap-2">
            <VoiceInput onTranscript={handleSendMessage} />
            <div className="flex-1">
              <ChatInput onSend={handleSendMessage} disabled={chatState.isLoading} />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;

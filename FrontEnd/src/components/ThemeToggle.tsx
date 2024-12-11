import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg shadow"
    >
      {theme === 'dark' ? (
        <Sun className="text-yellow-500" />
      ) : (
        <Moon className="text-gray-800" />
      )}
    </button>
  );
};

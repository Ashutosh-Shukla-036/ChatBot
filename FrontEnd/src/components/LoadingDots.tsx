import React from 'react';

export const LoadingDots: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-200">.</span>
      <span className="animate-bounce delay-400">.</span>
    </div>
  );
};

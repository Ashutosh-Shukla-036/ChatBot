// src/globals.d.ts
declare global {
    interface Window {
      SpeechRecognition: typeof SpeechRecognition | undefined;
      webkitSpeechRecognition: typeof SpeechRecognition | undefined;
    }
  }
  
  export {};
  
import { useEffect, useState } from "react";
import { Mic, MicOff } from "lucide-react"; // Import microphone icons

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
}

const VoiceInput = ({ onTranscript }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
      };

      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }

      return () => {
        recognition.stop();
      };
    } else {
      console.error("SpeechRecognition is not supported in this browser.");
    }
  }, [isListening, onTranscript]);

  return (
    <button
      onClick={() => setIsListening((prev) => !prev)}
      className="voice-input-button flex items-center justify-center p-2 rounded-full shadow-md bg-blue-500 text-white hover:bg-blue-600 transition-all"
      title={isListening ? "Stop Listening" : "Start Listening"}
    >
      {isListening ? (
        <MicOff className="w-6 h-6" />
      ) : (
        <Mic className="w-6 h-6" />
      )}
    </button>
  );
};

export default VoiceInput;

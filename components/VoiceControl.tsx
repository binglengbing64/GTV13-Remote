import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, Sparkles } from 'lucide-react';
import Button from './Button';
import { interpretVoiceCommand } from '../services/geminiService';
import { RemoteCommand } from '../types';

interface VoiceControlProps {
  onCommands: (cmds: RemoteCommand[]) => void;
}

const VoiceControl: React.FC<VoiceControlProps> = ({ onCommands }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  // Use any for the ref to avoid 'Cannot find name SpeechRecognition' errors
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Cast window to any to access standard and webkit prefixed API
    const win = window as any;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processCommand(text);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const processCommand = async (text: string) => {
    setIsProcessing(true);
    const commands = await interpretVoiceCommand(text);
    setIsProcessing(false);
    if (commands.length > 0) {
        onCommands(commands);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start recognition:", err);
        setIsListening(false);
      }
    }
  };

  if (!isSupported) {
      return null; // Fallback if speech API not supported
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 py-4 px-6 bg-zinc-900/50 rounded-3xl border border-zinc-800/50 backdrop-blur-sm mt-4">
      <div className="flex items-center gap-4 w-full">
         <Button 
            onClick={toggleListening} 
            variant={isListening ? 'danger' : 'primary'} 
            className={`w-14 h-14 shrink-0 transition-all ${isListening ? 'animate-pulse' : ''}`}
        >
            {isProcessing ? (
                <Loader2 className="animate-spin text-zinc-900" size={24} />
            ) : isListening ? (
                <MicOff size={24} />
            ) : (
                <Mic size={24} />
            )}
        </Button>
        
        <div className="flex-1 min-h-[3.5rem] flex items-center">
            {isProcessing ? (
                 <div className="flex items-center gap-2 text-indigo-400">
                    <Sparkles size={16} className="animate-pulse" />
                    <span className="text-sm font-medium animate-pulse">Gemini is thinking...</span>
                 </div>
            ) : transcript ? (
                <p className="text-sm text-zinc-300 italic">"{transcript}"</p>
            ) : (
                <p className="text-sm text-zinc-500">Tap to speak (e.g., "Mute and go home")</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default VoiceControl;
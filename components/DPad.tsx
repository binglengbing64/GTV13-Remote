import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { RemoteCommand } from '../types';

interface DPadProps {
  onCommand: (cmd: RemoteCommand) => void;
}

const DPad: React.FC<DPadProps> = ({ onCommand }) => {
  
  const handlePress = (cmd: RemoteCommand) => {
    if (navigator.vibrate) navigator.vibrate(20);
    onCommand(cmd);
  };

  return (
    <div className="relative w-64 h-64 rounded-full bg-zinc-900 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center border border-zinc-800">
      {/* Outer Ring Background Gradient */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 opacity-50 pointer-events-none" />

      {/* Up */}
      <button 
        className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-20 flex items-start justify-center pt-4 text-zinc-400 hover:text-white active:scale-95 transition-all outline-none"
        onClick={() => handlePress(RemoteCommand.UP)}
      >
        <ChevronUp size={32} />
      </button>

      {/* Down */}
      <button 
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-20 flex items-end justify-center pb-4 text-zinc-400 hover:text-white active:scale-95 transition-all outline-none"
        onClick={() => handlePress(RemoteCommand.DOWN)}
      >
        <ChevronDown size={32} />
      </button>

      {/* Left */}
      <button 
        className="absolute left-2 top-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-start pl-4 text-zinc-400 hover:text-white active:scale-95 transition-all outline-none"
        onClick={() => handlePress(RemoteCommand.LEFT)}
      >
        <ChevronLeft size={32} />
      </button>

      {/* Right */}
      <button 
        className="absolute right-2 top-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-end pr-4 text-zinc-400 hover:text-white active:scale-95 transition-all outline-none"
        onClick={() => handlePress(RemoteCommand.RIGHT)}
      >
        <ChevronRight size={32} />
      </button>

      {/* Center OK Button */}
      <button 
        className="relative z-10 w-24 h-24 rounded-full bg-zinc-800 shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-zinc-700 flex items-center justify-center text-zinc-200 hover:bg-zinc-700 active:bg-zinc-600 active:scale-95 transition-all"
        onClick={() => handlePress(RemoteCommand.OK)}
      >
        <span className="font-bold text-lg tracking-wider">OK</span>
      </button>
    </div>
  );
};

export default DPad;
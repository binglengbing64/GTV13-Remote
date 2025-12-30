import React, { useState, useEffect, useCallback } from 'react';
import { 
  Power, 
  Home, 
  ArrowLeft, 
  Volume2, 
  Volume1, 
  VolumeX, 
  MoreHorizontal,
  Settings,
  Cast,
  Tv,
  Youtube,
  PlayCircle
} from 'lucide-react';

import { RemoteCommand, ConnectionStatus } from './types';
import Button from './components/Button';
import DPad from './components/DPad';
import VoiceControl from './components/VoiceControl';

const App: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: false,
    device: 'Searching...',
    latency: 0
  });

  const [lastCommand, setLastCommand] = useState<string | null>(null);

  // Simulate connection
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus({
        connected: true,
        device: 'Living Room GTV13',
        latency: 24
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = useCallback((cmd: RemoteCommand) => {
    // Visual feedback logic
    setLastCommand(cmd);
    
    // Reset visual feedback
    setTimeout(() => setLastCommand(null), 1000);

    // In a real app, this would send a WebSocket or HTTP request
    console.log(`Sending command: ${cmd}`);
  }, []);

  const handleVoiceCommands = (cmds: RemoteCommand[]) => {
    cmds.forEach((cmd, index) => {
        setTimeout(() => {
            handleCommand(cmd);
        }, index * 400); // Stagger execution for effect
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Remote Chassis */}
      <div className="w-full max-w-sm bg-zinc-950 rounded-[3rem] p-6 shadow-2xl border border-zinc-800 flex flex-col gap-6 relative overflow-hidden">
        
        {/* Status Bar / Header */}
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Connected to</span>
            <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${status.connected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 animate-pulse'}`}></span>
                <span className="text-sm font-semibold text-zinc-200">{status.device}</span>
            </div>
          </div>
          <Button 
            onClick={() => handleCommand(RemoteCommand.POWER)} 
            variant="danger" 
            className="w-12 h-12 shadow-none border-0 bg-red-500/10 text-red-500"
          >
            <Power size={20} />
          </Button>
        </div>

        {/* Dynamic Command Feedback Overlay */}
        <div className={`absolute top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ${lastCommand ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-xs font-mono text-white tracking-widest uppercase shadow-xl">
                {lastCommand}
            </div>
        </div>

        {/* Input & Apps Row */}
        <div className="grid grid-cols-4 gap-3">
             <Button onClick={() => handleCommand(RemoteCommand.INPUT)} variant="secondary" className="rounded-2xl" shape="rect">
                <Cast size={20} />
             </Button>
             <Button onClick={() => handleCommand(RemoteCommand.NETFLIX)} variant="secondary" className="rounded-2xl text-red-500" shape="rect">
                <span className="font-black text-xs tracking-tighter">N</span>
             </Button>
             <Button onClick={() => handleCommand(RemoteCommand.YOUTUBE)} variant="secondary" className="rounded-2xl text-white" shape="rect">
                <Youtube size={20} />
             </Button>
             <Button onClick={() => handleCommand(RemoteCommand.SETTINGS)} variant="secondary" className="rounded-2xl" shape="rect">
                <Settings size={20} />
             </Button>
        </div>

        {/* D-Pad Area */}
        <div className="flex justify-center py-2">
          <DPad onCommand={handleCommand} />
        </div>

        {/* Navigation Actions Row */}
        <div className="flex justify-between px-4">
           <Button onClick={() => handleCommand(RemoteCommand.BACK)} variant="ghost" className="flex flex-col gap-1 w-16 h-16 rounded-2xl">
              <ArrowLeft size={24} />
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Back</span>
           </Button>
           <Button onClick={() => handleCommand(RemoteCommand.HOME)} variant="ghost" className="flex flex-col gap-1 w-16 h-16 rounded-2xl">
              <Home size={24} />
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Home</span>
           </Button>
           <Button onClick={() => handleCommand(RemoteCommand.ASSISTANT)} variant="ghost" className="flex flex-col gap-1 w-16 h-16 rounded-2xl">
              <MoreHorizontal size={24} />
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Menu</span>
           </Button>
        </div>

        {/* Volume & Channel Rockers */}
        <div className="bg-zinc-900 rounded-3xl p-1 grid grid-cols-2 gap-1 h-40">
            {/* Volume Rocker */}
            <div className="bg-zinc-800 rounded-2xl flex flex-col justify-between items-center py-1">
                <button 
                    className="w-full flex-1 flex items-center justify-center text-zinc-400 hover:text-white active:scale-95 transition-transform"
                    onClick={() => handleCommand(RemoteCommand.VOL_UP)}
                >
                    <span className="font-bold text-xl">+</span>
                </button>
                <div className="text-zinc-600">
                    <Volume2 size={16} />
                </div>
                <button 
                    className="w-full flex-1 flex items-center justify-center text-zinc-400 hover:text-white active:scale-95 transition-transform"
                    onClick={() => handleCommand(RemoteCommand.VOL_DOWN)}
                >
                    <span className="font-bold text-xl">-</span>
                </button>
            </div>

            {/* Channel/Media Rocker (Simulated as Play/Pause/Mute for modern simplified remotes) */}
            <div className="bg-zinc-800 rounded-2xl flex flex-col justify-between items-center py-1">
                 <button 
                    className="w-full flex-1 flex items-center justify-center text-zinc-400 hover:text-white active:scale-95 transition-transform"
                    onClick={() => handleCommand(RemoteCommand.PLAY_PAUSE)}
                >
                    <PlayCircle size={20} />
                </button>
                <div className="text-zinc-600">
                    <Tv size={16} />
                </div>
                 <button 
                    className="w-full flex-1 flex items-center justify-center text-zinc-400 hover:text-white active:scale-95 transition-transform"
                    onClick={() => handleCommand(RemoteCommand.MUTE)}
                >
                    <VolumeX size={20} />
                </button>
            </div>
        </div>

        {/* Voice Assistant Module */}
        <VoiceControl onCommands={handleVoiceCommands} />

        {/* Footer info */}
        <div className="text-center pb-2">
            <p className="text-[10px] text-zinc-700 font-mono">GTV13 REMOTE BUILD 2.5.0 // GEMINI ENABLED</p>
        </div>
      </div>
    </div>
  );
};

export default App;
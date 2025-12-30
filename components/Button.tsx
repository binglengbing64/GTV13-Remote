import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glass';
  shape?: 'circle' | 'pill' | 'rect';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  className = '', 
  variant = 'secondary', 
  shape = 'circle',
  disabled = false
}) => {
  
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    
    onClick();
  };

  const baseStyles = "relative flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none touch-manipulation";
  
  const shapeStyles = {
    circle: "rounded-full aspect-square",
    pill: "rounded-full aspect-[2/1] px-6",
    rect: "rounded-xl aspect-square"
  };

  const variantStyles = {
    primary: "bg-white text-zinc-900 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-gray-100 active:bg-gray-200",
    secondary: "bg-zinc-800 text-zinc-200 shadow-lg border border-zinc-700 hover:bg-zinc-700 active:bg-zinc-600",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 active:bg-red-500/30",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5",
    glass: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10"
  };

  return (
    <button
      className={`${baseStyles} ${shapeStyles[shape]} ${variantStyles[variant]} ${className}`}
      onClick={handleInteraction}
      disabled={disabled}
      aria-label="Remote button"
    >
      {children}
    </button>
  );
};

export default Button;
'use client';

import React from 'react';

interface BadgeProps {
  variant: 'active' | 'inactive' | 'pending' | 'premium' | 'info' | 'live';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children, className = '', dot = false }) => {
  const variants: Record<string, string> = {
    active: 'bg-rovi-lime/15 text-rovi-lime border-rovi-lime/30',
    inactive: 'bg-rovi-red/15 text-rovi-red border-rovi-red/30',
    pending: 'bg-rovi-amber/15 text-rovi-amber border-rovi-amber/30',
    premium: 'bg-rovi-violet/15 text-rovi-violet border-rovi-violet/30',
    info: 'bg-rovi-blue/15 text-rovi-blue border-rovi-blue/30',
    live: 'bg-rovi-lime/15 text-rovi-lime border-rovi-lime/30',
  };

  const dotColors: Record<string, string> = {
    active: 'bg-rovi-lime',
    inactive: 'bg-rovi-red',
    pending: 'bg-rovi-amber',
    premium: 'bg-rovi-violet',
    info: 'bg-rovi-blue',
    live: 'bg-rovi-lime',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border
        font-inter font-semibold text-[10px] uppercase tracking-wider
        ${variants[variant]}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} ${variant === 'live' ? 'live-pulse' : ''}`} />
      )}
      {children}
    </span>
  );
};

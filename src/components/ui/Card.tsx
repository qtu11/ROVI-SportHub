'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  accentColor,
  hover = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-rovi-surface border border-rovi-border rounded-xl p-5
        ${accentColor ? `border-t-2` : ''}
        ${hover ? 'hover:border-rovi-blue hover:shadow-lg hover:shadow-rovi-blue/5 cursor-pointer' : ''}
        transition-all duration-200
        ${className}
      `}
      style={accentColor ? { borderTopColor: accentColor } : undefined}
    >
      {children}
    </div>
  );
};

'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-inter font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rovi-blue/50 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<string, string> = {
    primary: 'bg-rovi-blue hover:bg-rovi-blue-dark text-white shadow-lg shadow-rovi-blue/20 hover:shadow-rovi-blue/30',
    secondary: 'bg-rovi-surface-2 hover:bg-rovi-border text-rovi-text-primary border border-rovi-border hover:border-rovi-border-light',
    ghost: 'bg-transparent hover:bg-rovi-surface-2 text-rovi-text-muted hover:text-rovi-text-primary border border-rovi-border hover:border-rovi-border-light',
    danger: 'bg-rovi-red/10 hover:bg-rovi-red/20 text-rovi-red border border-rovi-red/30 hover:border-rovi-red/50',
    success: 'bg-rovi-lime/10 hover:bg-rovi-lime/20 text-rovi-lime border border-rovi-lime/30 hover:border-rovi-lime/50',
  };

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

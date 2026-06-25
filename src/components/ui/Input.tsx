'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="label-upper text-rovi-text-muted">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-rovi-text-faint">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-rovi-surface-2 border border-rovi-border rounded-lg
            px-4 py-2.5 text-sm text-rovi-text-primary
            placeholder:text-rovi-text-faint
            focus:outline-none focus:border-rovi-blue focus:ring-1 focus:ring-rovi-blue/30
            hover:border-rovi-border-light
            transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-rovi-red focus:border-rovi-red focus:ring-rovi-red/30' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-rovi-red">{error}</span>}
    </div>
  );
};

export const SearchInput: React.FC<Omit<InputProps, 'icon'>> = (props) => {
  return <Input icon={<Search size={16} />} placeholder="Tìm kiếm..." {...props} />;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="label-upper text-rovi-text-muted">{label}</label>}
      <select
        className={`
          w-full bg-rovi-surface-2 border border-rovi-border rounded-lg
          px-4 py-2.5 text-sm text-rovi-text-primary
          focus:outline-none focus:border-rovi-blue focus:ring-1 focus:ring-rovi-blue/30
          hover:border-rovi-border-light
          transition-all duration-200 cursor-pointer
          appearance-none
          ${className}
        `}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

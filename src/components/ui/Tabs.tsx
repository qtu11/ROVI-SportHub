'use client';

import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`flex gap-1 p-1 bg-rovi-surface rounded-lg border border-rovi-border ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${activeTab === tab.id
              ? 'bg-rovi-blue/15 text-rovi-blue border border-rovi-blue/30'
              : 'text-rovi-text-muted hover:text-rovi-text-primary hover:bg-rovi-surface-2'
            }
          `}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md';
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, size = 'md' }) => {
  const dims = size === 'sm' ? 'w-8 h-4' : 'w-11 h-6';
  const dotDims = size === 'sm' ? 'w-3 h-3' : 'w-5 h-5';
  const translate = size === 'sm' ? 'translate-x-4' : 'translate-x-5';

  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer">
      <div
        className={`relative ${dims} rounded-full transition-colors duration-200 ${
          checked ? 'bg-rovi-lime' : 'bg-rovi-border-light'
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-0.5 left-0.5 ${dotDims} rounded-full bg-white transition-transform duration-200 ${
            checked ? translate : 'translate-x-0'
          }`}
        />
      </div>
      {label && <span className="text-sm text-rovi-text-primary">{label}</span>}
    </label>
  );
};

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  width?: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  width = '400px',
  children,
}) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full bg-rovi-surface border-l border-rovi-border z-50 overflow-y-auto animate-slide-in-right"
        style={{ width }}
      >
        <div className="flex items-center justify-between p-5 border-b border-rovi-border">
          <h2 className="display-card text-rovi-text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-rovi-surface-2 text-rovi-text-muted transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </>
  );
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, maxWidth = '480px' }) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-rovi-surface border border-rovi-border rounded-xl overflow-hidden animate-fade-in-up"
          style={{ maxWidth, width: '100%' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-rovi-border">
            <h2 className="display-card text-rovi-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-rovi-surface-2 text-rovi-text-muted transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </>
  );
};

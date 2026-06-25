'use client';

import React from 'react';
import {
  Waves, Target, CircleDot, Trophy, Activity,
} from 'lucide-react';

const sportConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  'Bóng đá': { icon: <CircleDot size={18} />, color: '#22C55E', label: 'Bóng đá' },
  'Pickleball': { icon: <Target size={18} />, color: '#F97316', label: 'Pickleball' },
  'Cầu lông': { icon: <Activity size={18} />, color: '#EC4899', label: 'Cầu lông' },
  'Bóng rổ': { icon: <Trophy size={18} />, color: '#EF4444', label: 'Bóng rổ' },
  'Bơi lội': { icon: <Waves size={18} />, color: '#06B6D4', label: 'Bơi lội' },
  'Tennis': { icon: <CircleDot size={18} />, color: '#EAB308', label: 'Tennis' },
  'Bóng chuyền': { icon: <CircleDot size={18} />, color: '#8B5CF6', label: 'Bóng chuyền' },
  'Bóng bàn': { icon: <Activity size={18} />, color: '#F59E0B', label: 'Bóng bàn' },
};

interface SportIconProps {
  sport: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const SportIcon: React.FC<SportIconProps> = ({ sport, size = 'md', showLabel = false }) => {
  const config = sportConfig[sport] || { icon: <CircleDot size={18} />, color: '#64748B', label: sport };
  const sizes = { sm: 'w-6 h-6', md: 'w-8 h-8', lg: 'w-10 h-10' };

  return (
    <div className="inline-flex items-center gap-2">
      <div
        className={`${sizes[size]} rounded-lg flex items-center justify-center`}
        style={{ backgroundColor: `${config.color}15`, color: config.color }}
      >
        {config.icon}
      </div>
      {showLabel && <span className="text-sm text-rovi-text-primary">{config.label}</span>}
    </div>
  );
};

export const getSportColor = (sport: string) => sportConfig[sport]?.color || '#64748B';

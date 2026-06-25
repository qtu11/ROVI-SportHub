'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: { value: string; direction: 'up' | 'down' };
  icon: React.ReactNode;
  accentColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon, accentColor = '#38BDF8' }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const numericMatch = value.match(/[\d,.]+/);
    if (numericMatch) {
      const target = parseFloat(numericMatch[0].replace(/,/g, ''));
      const prefix = value.substring(0, value.indexOf(numericMatch[0]));
      const suffix = value.substring(value.indexOf(numericMatch[0]) + numericMatch[0].length);
      const duration = 800;
      const steps = 30;
      const stepTime = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        if (mounted.current) {
          if (target >= 1000) {
            setDisplayValue(`${prefix}${current.toLocaleString('vi-VN', { maximumFractionDigits: target % 1 !== 0 ? 2 : 0 })}${suffix}`);
          } else {
            setDisplayValue(`${prefix}${Math.round(current).toLocaleString('vi-VN')}${suffix}`);
          }
        }
        if (step >= steps) {
          clearInterval(timer);
          if (mounted.current) setDisplayValue(value);
        }
      }, stepTime);

      return () => { mounted.current = false; clearInterval(timer); };
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  return (
    <div className="bezel-outer bg-slate-950/20 hover:border-slate-800 transition-custom">
      <div className="bezel-inner relative overflow-hidden flex flex-col justify-between p-5 min-h-[140px]">
        {/* Ambient Corner Glow */}
        <div 
          className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[45px] opacity-15 pointer-events-none transition-custom group-hover:opacity-25"
          style={{ backgroundColor: accentColor }}
        />
        
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center border"
            style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}20` }}
          >
            <div style={{ color: accentColor }} className="w-4 h-4 flex items-center justify-center">{icon}</div>
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border font-space ${
              trend.direction === 'up'
                ? 'bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/20'
                : 'bg-[#F43F5E]/10 text-[#F43F5E] border-[#F43F5E]/20'
            }`}>
              {trend.direction === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {trend.value}
            </div>
          )}
        </div>

        <div className="relative z-10">
          <p className="label-upper text-slate-500 mb-1 text-[9px] tracking-[0.2em]">{label}</p>
          <p className="data-lg font-space font-black text-white" style={{ color: accentColor }}>{displayValue}</p>
        </div>
      </div>
    </div>
  );
};

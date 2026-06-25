"use client";

import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { DataTable } from '../../../components/ui/DataTable';
import { SportIcon } from '../../../components/shared/SportIcon';
import { Cpu, Video, Zap, Server, Gauge, AlertCircle, Settings } from 'lucide-react';
import { aiClips, eloConfig } from '../../../data/mock/campaigns';

const pipeline = [
  { name: 'Video ingestion', jobs: '1,204 jobs', active: true },
  { name: 'Scene detection', jobs: '847 jobs', active: true },
  { name: 'Clip extraction', jobs: '312 clips/hr', active: true },
  { name: 'CDN publishing', jobs: 'active', active: true },
  { name: 'ELO recalculation', jobs: 'idle', active: false },
];

const clipStatusColors: Record<string, string> = {
  'Published': 'active',
  'Processing': 'pending',
  'Failed': 'inactive',
};

export default function AIEngineHub() {
  return (
    <div>
      <h1 className="display-title text-rovi-text-primary mb-6">AI Engine Hub</h1>

      <div className="grid lg:grid-cols-12 gap-6 mb-6">
        {/* Pipeline Status */}
        <Card className="lg:col-span-5">
          <div className="flex items-center gap-2 mb-5">
            <Cpu size={20} className="text-rovi-blue" />
            <h3 className="display-card text-rovi-text-primary">AI Engine Pipeline</h3>
          </div>
          <div className="space-y-3 mb-6">
            {pipeline.map(p => (
              <div key={p.name} className="flex items-center justify-between py-2.5 border-b border-rovi-border/30 last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${p.active ? 'bg-rovi-lime live-pulse' : 'bg-rovi-text-faint'}`} />
                  <span className="text-sm text-rovi-text-primary">{p.name}</span>
                </div>
                <span className="data-sm text-rovi-text-muted">{p.jobs}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-rovi-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-rovi-text-muted"><Server size={16} /> GPU cluster:</div>
              <span className="data-sm text-rovi-blue">8/12 nodes</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-rovi-text-muted"><Gauge size={16} /> Queue lag:</div>
              <span className="data-sm text-rovi-lime">2.3s avg</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-rovi-text-muted"><AlertCircle size={16} /> Error rate:</div>
              <span className="data-sm text-rovi-lime">0.04%</span>
            </div>
          </div>
        </Card>

        {/* Recent AI Clips */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="display-card text-rovi-text-primary">AI Clips gần đây</h3>
            <Badge variant="info">{aiClips.length} clips</Badge>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiClips.map(clip => (
              <Card key={clip.id} hover className="p-0 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-rovi-surface-2 to-rovi-border/30 flex items-center justify-center relative">
                  <Video size={32} className="text-rovi-text-faint" />
                  <span className="absolute bottom-2 right-2 bg-rovi-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                    {clip.duration}
                  </span>
                  <div className="absolute top-2 left-2">
                    <SportIcon sport={clip.sport} size="sm" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-rovi-text-primary truncate">{clip.tenant}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-rovi-text-muted">{clip.timestamp}</span>
                    <Badge variant={clipStatusColors[clip.status] as any} className="text-[8px]">{clip.status}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ELO Config */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Zap size={20} className="text-rovi-violet" />
          <h3 className="display-card text-rovi-text-primary">ELO Engine Config</h3>
        </div>
        <DataTable
          columns={[
            { key: 'sport', label: 'Bộ môn', render: (d) => <SportIcon sport={d.sport} size="sm" showLabel /> },
            { key: 'algorithm', label: 'Algorithm', render: (d) => <Badge variant="info">{d.algorithm}</Badge> },
            { key: 'kFactor', label: 'K-Factor', render: (d) => <span className="data-sm">{d.kFactor}</span> },
            { key: 'lastBatch', label: 'Last batch run' },
            { key: 'playersRanked', label: 'Players ranked', sortable: true, render: (d) => <span className="data-sm">{d.playersRanked.toLocaleString()}</span> },
            { key: 'action', label: '', render: () => <Button size="sm" variant="ghost"><Settings size={14} /> Configure</Button> },
          ]}
          data={eloConfig}
        />
      </Card>
    </div>
  );
}

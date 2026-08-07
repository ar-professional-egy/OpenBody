import React from 'react';
import { Minus, Circle, HeartCrack, Ban, AlertTriangle, Droplets } from 'lucide-react';

interface Damage {
  id: string;
  part: string;
  type: 'خدش' | 'انبعاج' | 'كسر' | 'شرخ' | 'صدأ';
  severity: 'خفيف' | 'متوسط' | 'شديد' | 'حرج';
  decision: string;
  confidence: number;
  cost: number;
}

interface DamageCardProps {
  damage: Damage;
  onClick?: () => void;
}

export function DamageCard({ damage, onClick }: DamageCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'خفيف': return 'text-green-600 bg-green-50 border-green-200';
      case 'متوسط': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'شديد': return 'text-red-600 bg-red-50 border-red-200';
      case 'حرج': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getSeverityIconColor = (severity: string) => {
    switch (severity) {
      case 'خفيف': return 'text-green-600';
      case 'متوسط': return 'text-orange-600';
      case 'شديد': return 'text-red-600';
      case 'حرج': return 'text-purple-600';
      default: return 'text-slate-600';
    }
  };

  const getDamageIcon = (type: string) => {
    switch (type) {
      case 'خدش': return <Minus className="w-6 h-6" />;
      case 'انبعاج': return <Circle className="w-6 h-6" />;
      case 'كسر': return <HeartCrack className="w-6 h-6" />;
      case 'شرخ': return <Ban className="w-6 h-6" />;
      case 'صدأ': return <Droplets className="w-6 h-6" />;
      default: return <AlertTriangle className="w-6 h-6" />;
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`p-4 mb-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${onClick ? '' : 'cursor-default'}`}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-opacity-10 ${getSeverityIconColor(damage.severity)} bg-current`}>
          {getDamageIcon(damage.type)}
        </div>
        
        {/* Details */}
        <div className="flex-1">
          <h3 className="font-bold text-slate-800 text-lg mb-1">{damage.part}</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-primary-50 text-primary-700">
              {damage.type}
            </span>
            <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${getSeverityColor(damage.severity)}`}>
              {damage.severity}
            </span>
            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              {damage.decision}
            </span>
          </div>
        </div>

        {/* Confidence & Cost */}
        <div className="text-left flex flex-col items-end">
          <span className="font-black text-green-600">
            {Math.round(damage.confidence * 100)}%
          </span>
          <span className="text-slate-500 font-medium text-sm">
            {damage.cost} د.ك
          </span>
        </div>
      </div>
    </div>
  );
}

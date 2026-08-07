import React from 'react';
import { Loader2, Lightbulb } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
  message: string;
}

export function LoadingScreen({ progress, message }: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 max-w-lg mx-auto">
      {/* Animation/Icon */}
      <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 border-4 border-primary-100 rounded-full"></div>
        <div 
          className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"
          style={{ animationDuration: '1.5s' }}
        ></div>
        <Loader2 className="w-12 h-12 text-primary-500 animate-pulse" />
      </div>

      {/* Message */}
      <h2 className="text-2xl font-black text-slate-800 mb-6 text-center">
        {message}
      </h2>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
        <div 
          className="bg-primary-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        ></div>
      </div>

      {/* Percentage */}
      <span className="text-slate-500 font-bold mb-12">
        {Math.round(progress * 100)}%
      </span>

      {/* Tip */}
      <div className="w-full bg-primary-50 p-4 rounded-2xl flex items-start gap-4">
        <div className="bg-primary-100 p-2 rounded-xl text-primary-600">
          <Lightbulb className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-primary-900 mb-1">نصيحة</h4>
          <p className="text-primary-700 text-sm">
            الصور الواضحة من زوايا متعددة تعطي نتائج أدق وتفاصيل أفضل للأضرار.
          </p>
        </div>
      </div>
    </div>
  );
}

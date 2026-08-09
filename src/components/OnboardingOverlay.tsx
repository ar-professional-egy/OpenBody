import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Camera, FileText, CheckCircle } from 'lucide-react';

export function OnboardingOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Show only once per user
    const hasSeenOnboarding = localStorage.getItem('openbody_onboarding');
    if (!hasSeenOnboarding) {
      // Delay slightly for better UX
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeOverlay = () => {
    localStorage.setItem('openbody_onboarding', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const steps = [
    {
      title: "مرحباً بك في OpenBody",
      description: "اكتشف كيف يمكن للذكاء الاصطناعي مساعدتك في تقييم أضرار السيارات بدقة وسرعة عالية.",
      icon: <CheckCircle className="w-16 h-16 text-primary-500 mx-auto" />
    },
    {
      title: "1. التقط صوراً",
      description: "استخدم زر 'فحص جديد' لتشغيل الكاميرا والتقاط صور واضحة للأضرار من عدة زوايا.",
      icon: <Camera className="w-16 h-16 text-blue-500 mx-auto" />
    },
    {
      title: "2. احصل على التقرير",
      description: "سيقوم النظام بتحليل الصور وإنشاء تقرير مفصل يوضح الأجزاء المتضررة والتكلفة التقديرية.",
      icon: <FileText className="w-16 h-16 text-emerald-500 mx-auto" />
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-end p-4">
          <button 
            onClick={closeOverlay}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="px-8 pb-8 text-center">
          <div className="mb-6">
            {steps[step].icon}
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{steps[step].title}</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            {steps[step].description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === step ? 'bg-primary-500' : 'bg-slate-200'}`}
                />
              ))}
            </div>
            
            <button
              onClick={() => {
                if (step < steps.length - 1) {
                  setStep(s => s + 1);
                } else {
                  closeOverlay();
                }
              }}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center gap-2"
            >
              {step < steps.length - 1 ? (
                <>التالي <ArrowRight className="w-4 h-4" /></>
              ) : (
                'ابدأ الآن'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

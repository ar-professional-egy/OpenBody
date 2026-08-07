import { useState, useEffect } from 'react';
import { UploadCloud, Loader2, AlertTriangle, ShieldCheck, Download, Share2, Wrench } from 'lucide-react';

type Step = 'upload' | 'analyzing' | 'results';

export default function Analysis() {
  const [step, setStep] = useState<Step>('upload');
  const [progress, setProgress] = useState(0);

  // Simulated AI analysis progress
  useEffect(() => {
    if (step === 'analyzing') {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setStep('results');
            return 100;
          }
          return p + 5;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleUpload = () => {
    setStep('analyzing');
    setProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">الفحص الذكي للأضرار</h1>
        <p className="text-slate-500">قم برفع صورة السيارة ليقوم الذكاء الاصطناعي بتحليل الأضرار وتقدير التكلفة</p>
      </div>

      {/* Upload State */}
      {step === 'upload' && (
        <div 
          onClick={handleUpload}
          className="mt-8 border-2 border-dashed border-slate-300 rounded-2xl bg-white p-16 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-all group"
        >
          <div className="bg-blue-50 p-6 rounded-full group-hover:scale-110 transition-transform duration-300 mb-6">
            <UploadCloud className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">اضغط هنا أو اسحب الصورة</h3>
          <p className="text-slate-500 text-sm">يدعم JPG, PNG, HEIC (الحد الأقصى 10MB)</p>
        </div>
      )}

      {/* Analyzing State */}
      {step === 'analyzing' && (
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-12 flex flex-col items-center text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-blue-600 p-6 rounded-full">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">جاري تحليل الصورة...</h3>
          <p className="text-slate-500 mb-8 max-w-md">الذكاء الاصطناعي يقوم الآن بكشف المركبة، وتقسيم الأجزاء، وتصنيف الأضرار لتقدير التكلفة.</p>
          
          <div className="w-full max-w-md bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-slate-600">{progress}%</span>
        </div>
      )}

      {/* Results State */}
      {step === 'results' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
            {/* Image with bounding boxes simulation */}
            <div className="w-full md:w-1/2 relative bg-slate-100 min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Car Damage" 
                className="w-full h-full object-cover"
              />
              {/* Simulated Bounding Box */}
              <div className="absolute top-[30%] left-[20%] w-[30%] h-[40%] border-2 border-red-500 bg-red-500/20 rounded-md">
                <span className="absolute -top-6 -left-0.5 bg-red-500 text-white text-xs px-2 py-1 rounded-sm font-medium">
                  انبعاج وخدش (94%)
                </span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium w-max mb-4">
                <ShieldCheck className="w-4 h-4" />
                تحليل مكتمل بنجاح
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">تقرير الضرر</h2>
              
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-slate-500">مستوى الضرر</span>
                  <span className="font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-md text-sm">متوسط</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-slate-500">الأجزاء المتضررة</span>
                  <span className="font-medium text-slate-800">الصدام الأمامي، الرفرف الأيسر</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-slate-500">نوع الضرر</span>
                  <span className="font-medium text-slate-800">انبعاج عميق، تلف دهان</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-500">التكلفة التقديرية</span>
                  <span className="text-2xl font-black text-blue-600">1,200 - 1,500 ريال</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">خطة الإصلاح المقترحة</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">سمكرة الرفرف الأيسر</p>
                    <p className="text-sm text-slate-500">المدة المتوقعة: 4 ساعات عمل</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">دهان الصدام والرفرف (لون مطابق)</p>
                    <p className="text-sm text-slate-500">المدة المتوقعة: 8 ساعات (تجهيز ورش)</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-amber-50 rounded-lg flex items-start gap-3 text-amber-800 text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>التكلفة هي تقدير أولي مبني على الذكاء الاصطناعي، وقد تختلف قليلاً بعد الفحص اليدوي في الورشة.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center gap-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">الإجراءات التالية</h3>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex justify-center items-center gap-2">
                <Download className="w-5 h-5" />
                تحميل التقرير (PDF)
              </button>
              <button className="w-full bg-white text-slate-700 border border-slate-300 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors flex justify-center items-center gap-2">
                <Share2 className="w-5 h-5" />
                مشاركة التقرير
              </button>
              <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors mt-2">
                إرسال إلى ورشة معتمدة
              </button>
            </div>
          </div>
          
          <div className="text-center pt-4">
             <button 
                onClick={() => setStep('upload')}
                className="text-slate-500 hover:text-blue-600 font-medium transition-colors underline"
             >
               إجراء فحص جديد
             </button>
          </div>
        </div>
      )}
    </div>
  );
}

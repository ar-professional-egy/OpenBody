import { Link } from 'react-router-dom';
import { Camera, ShieldCheck, Wrench, ArrowLeft, BrainCircuit } from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex flex-col gap-16 pb-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-12">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
          قدّر أضرار سيارتك بـ <span className="text-primary-500">الذكاء الاصطناعي</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          OpenBody تطبيق مجاني ومفتوح المصدر لتقدير أضرار السيارات باستخدام 5 طبقات من الذكاء الاصطناعي. حمّل الآن ووفّر وقتك ومالك.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/analysis"
            className="bg-primary-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-600 transition-colors flex items-center gap-2 shadow-lg shadow-primary-500/30"
          >
            جرب الفحص مجاناً
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <a
            href="https://github.com/OpenBody/OpenBody"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg"
          >
            📦 GitHub
          </a>
        </div>
      </section>

      {/* Promo Video Placeholder */}
      <section className="max-w-4xl mx-auto w-full px-4">
        <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border-4 border-white">
          <img 
            src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=1200" 
            alt="OpenBody Preview" 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white font-bold text-lg drop-shadow-md">شاهد كيف يعمل OpenBody (فيديو ترويجي)</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="bg-primary-50 p-4 rounded-full text-primary-500">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">5 طبقات ذكاء</h3>
          <p className="text-slate-600 text-sm">
            تحليل متقدم باستخدام 5 طبقات ذكاء اصطناعي متخصصة
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="bg-emerald-50 p-4 rounded-full text-emerald-600">
            <Camera className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">سهل الاستخدام</h3>
          <p className="text-slate-600 text-sm">
            صوّر السيارة واحصل على تقرير كامل خلال ثوانٍ
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="bg-amber-50 p-4 rounded-full text-amber-600">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">خصوصية كاملة</h3>
          <p className="text-slate-600 text-sm">
            بياناتك على جهازك فقط. لا نخزن شيئاً على السيرفرات
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="bg-purple-50 p-4 rounded-full text-purple-600">
            <Wrench className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">مجاني بالكامل</h3>
          <p className="text-slate-600 text-sm">
            لا رسوم، لا اشتراكات. مفتوح المصدر للأبد
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-primary-500 text-white rounded-3xl p-8 md:p-12 text-center mt-8">
        <h2 className="text-3xl font-bold mb-10">مراحل التحليل الذكي</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="space-y-3">
            <div className="text-3xl font-black text-white/50">1</div>
            <h4 className="font-bold text-lg">تحضير</h4>
            <p className="text-primary-50 text-sm">Real-ESRGAN</p>
          </div>
          <div className="space-y-3">
            <div className="text-3xl font-black text-white/50">2</div>
            <h4 className="font-bold text-lg">تقسيم</h4>
            <p className="text-primary-50 text-sm">SAM 2</p>
          </div>
          <div className="space-y-3">
            <div className="text-3xl font-black text-white/50">3</div>
            <h4 className="font-bold text-lg">كشف</h4>
            <p className="text-primary-50 text-sm">YOLOv8s + YOLO11m</p>
          </div>
          <div className="space-y-3">
            <div className="text-3xl font-black text-white/50">4</div>
            <h4 className="font-bold text-lg">تصنيف</h4>
            <p className="text-primary-50 text-sm">Damage Level HF</p>
          </div>
          <div className="space-y-3">
            <div className="text-3xl font-black text-white/50">5</div>
            <h4 className="font-bold text-lg">دمج</h4>
            <p className="text-primary-50 text-sm">Ensemble</p>
          </div>
        </div>
      </section>
    </div>
  );
}

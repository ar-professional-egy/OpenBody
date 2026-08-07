import { Link } from 'react-router-dom';
import { Camera, ShieldCheck, Wrench, ArrowLeft, BrainCircuit } from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex flex-col gap-16 pb-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-12">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
          منصة <span className="text-blue-600">OpenBody</span> الذكية
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          المنصة الأولى مفتوحة المصدر لتحليل أضرار السيارات من الصور وإدارة عمليات الإصلاح باستخدام تقنيات الذكاء الاصطناعي المتقدمة.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/analysis"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            جرب الفحص الآن
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link
            to="/workshop"
            className="bg-white text-slate-700 border border-slate-300 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            دخول الورش
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-4">
          <div className="bg-blue-50 p-4 rounded-full text-blue-600">
            <Camera className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">للمستخدمين</h3>
          <p className="text-slate-600">
            صور سيارتك، واعرف حجم الضرر وتكلفة الإصلاح التقديرية فوراً، وقارن أسعار الورش المتاحة.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-4">
          <div className="bg-emerald-50 p-4 rounded-full text-emerald-600">
            <Wrench className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">للورش</h3>
          <p className="text-slate-600">
            استقبل طلبات الإصلاح، وأصدر عروض أسعار دقيقة، وتابع مراحل إصلاح السيارات في لوحة تحكم واحدة.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-4">
          <div className="bg-purple-50 p-4 rounded-full text-purple-600">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">لشركات التأمين</h3>
          <p className="text-slate-600">
            تحليل المطالبات آلياً، كشف الاحتيال، وتسريع الموافقات بناءً على تقارير الذكاء الاصطناعي.
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center mt-8">
        <BrainCircuit className="w-12 h-12 text-blue-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-10">كيف يعمل النظام؟</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="text-2xl font-black text-blue-500">1</div>
            <h4 className="font-medium text-lg">التقاط الصور</h4>
            <p className="text-slate-400 text-sm">رفع صور السيارة المتضررة من زوايا مختلفة</p>
          </div>
          <div className="space-y-3">
            <div className="text-2xl font-black text-blue-500">2</div>
            <h4 className="font-medium text-lg">التحليل الذكي</h4>
            <p className="text-slate-400 text-sm">كشف الأضرار وتقسيم الأجزاء باستخدام AI</p>
          </div>
          <div className="space-y-3">
            <div className="text-2xl font-black text-blue-500">3</div>
            <h4 className="font-medium text-lg">التقرير والتكلفة</h4>
            <p className="text-slate-400 text-sm">إصدار تقرير مفصل يشمل القطع وساعات العمل</p>
          </div>
          <div className="space-y-3">
            <div className="text-2xl font-black text-blue-500">4</div>
            <h4 className="font-medium text-lg">ربط الورشة</h4>
            <p className="text-slate-400 text-sm">إرسال التقرير للورشة ومتابعة حالة الإصلاح</p>
          </div>
        </div>
      </section>
    </div>
  );
}

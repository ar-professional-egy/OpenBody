import React, { useState } from 'react';
import { Search, HelpCircle, Camera, BrainCircuit, FileText, ShieldCheck, MessageCircle } from 'lucide-react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    {
      title: 'البدء والتصوير',
      icon: <Camera className="w-6 h-6 text-primary-500" />,
      questions: [
        { q: 'كيف أصور السيارة بشكل صحيح؟', a: 'لالتقاط صور جيدة:\n• قف على بعد مترين من السيارة\n• التقط صوراً من جميع الزوايا\n• تأكد من وجود إضاءة كافية\n• صور الأضرار عن قرب' },
        { q: 'كم صورة أحتاج؟', a: 'ننصح بالتقاط 4-8 صور من زوايا مختلفة للحصول على أفضل النتائج في التقدير.' },
        { q: 'ما أنواع الأضرار التي يكتشفها النظام؟', a: 'يكتشف النظام: الخدوش، الانبعاجات، الكسور، الشروخ، الصدأ، الزجاج المهشم، والمصابيح المكسورة.' }
      ]
    },
    {
      title: 'التحليل والذكاء الاصطناعي',
      icon: <BrainCircuit className="w-6 h-6 text-purple-500" />,
      questions: [
        { q: 'كم يستغرق التحليل؟', a: 'يستغرق التحليل عادة 3-5 ثوانٍ بفضل استخدام خوادم سحابية متقدمة.' },
        { q: 'ما معنى نسبة الدقة؟', a: 'نسبة الدقة هي مدى ثقة الذكاء الاصطناعي في نتيجة التحليل. كلما زادت النسبة، زادت دقة التقدير.' },
        { q: 'ماذا أفعل إذا كانت النتائج غير دقيقة؟', a: 'حاول إعادة التصوير من زوايا مختلفة، والتأكد من وضوح الصورة وتجنب الانعكاسات القوية والظلال.' }
      ]
    },
    {
      title: 'التقارير والمشاركة',
      icon: <FileText className="w-6 h-6 text-amber-500" />,
      questions: [
        { q: 'كيف أشارك التقرير مع العميل؟', a: 'يمكنك مشاركة التقرير بسهولة عبر زر "مشاركة عبر واتساب" أو عن طريق تحميله كملف PDF.' },
        { q: 'هل التكلفة التقديرية نهائية؟', a: 'لا، التكلفة هي تقدير أولي مبني على متوسط أسعار السوق، وقد تختلف بعد الفحص اليدوي في الورشة.' }
      ]
    },
    {
      title: 'الحساب والخصوصية',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      questions: [
        { q: 'هل بياناتي وصور سيارتي آمنة؟', a: 'نعم، المنصة لا تقوم بتخزين صور سيارتك على السيرفرات بعد انتهاء التحليل، وتتم المعالجة بسرية تامة.' },
        { q: 'كيف أحذف بياناتي؟', a: 'يمكنك مسح بياناتك المحلية بالكامل من خلال صفحة الإعدادات.' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-800">مركز المساعدة</h1>
        <p className="text-slate-500">كيف يمكننا مساعدتك اليوم؟</p>
        
        <div className="max-w-xl mx-auto relative mt-6">
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="ابحث عن سؤال..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-700 bg-white shadow-sm"
          />
        </div>
      </div>

      <div className="grid gap-8 mt-8">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-50 rounded-xl">
                {section.icon}
              </div>
              <h2 className="text-xl font-bold text-slate-800">{section.title}</h2>
            </div>
            
            <div className="space-y-4">
              {section.questions.filter(q => q.q.includes(searchQuery) || q.a.includes(searchQuery)).map((faq, qIdx) => (
                <details key={qIdx} className="group bg-slate-50 rounded-xl">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-slate-700">
                    <span>{faq.q}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <div className="text-slate-600 mt-3 group-open:animate-fadeIn p-4 pt-0 whitespace-pre-line leading-relaxed border-t border-slate-200">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* تواصل معنا */}
      <div className="bg-primary-50 rounded-2xl p-8 text-center border border-primary-100 mt-8">
        <HelpCircle className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-primary-900 mb-2">لم تجد ما تبحث عنه؟</h3>
        <p className="text-primary-700 mb-6">فريق الدعم الفني جاهز لمساعدتك في أي وقت</p>
        <button className="bg-primary-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-600 transition-colors inline-flex items-center gap-2 shadow-sm">
          <MessageCircle className="w-5 h-5" />
          تواصل معنا عبر واتساب
        </button>
      </div>
    </div>
  );
}

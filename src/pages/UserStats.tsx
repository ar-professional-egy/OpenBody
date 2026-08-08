import React from 'react';
import { Share2, TrendingUp, Wand2, Star, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function UserStats() {
  const referralLink = 'https://openbody.app/download?ref=123';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'OpenBody',
        text: 'جرب منصة OpenBody لتقدير أضرار السيارات بالذكاء الاصطناعي مجاناً!',
        url: referralLink,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(referralLink);
      toast.success('تم نسخ الرابط للحافظة');
    }
  };

  const damageData = [
    { name: 'خدوش', value: 45, color: '#25D366' },
    { name: 'انبعاجات', value: 30, color: '#f59e0b' },
    { name: 'كسور', value: 15, color: '#ef4444' },
    { name: 'صدأ', value: 7, color: '#f97316' },
  ];

  const [activeFilters, setActiveFilters] = React.useState<string[]>(['خدوش', 'انبعاجات', 'كسور', 'صدأ']);
  
  const filteredData = damageData.filter(d => activeFilters.includes(d.name));

  const toggleFilter = (name: string) => {
    setActiveFilters(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">إحصائياتي والأداء</h1>
        <p className="text-slate-500">نظرة عامة على استخدامك لمنصة الذكاء الاصطناعي</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="p-3 bg-blue-50 text-blue-500 rounded-xl w-max mb-4">
            <Wand2 className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">التحليلات</p>
          <h3 className="text-3xl font-black text-slate-800">156</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl w-max mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">التقارير المصدرة</p>
          <h3 className="text-3xl font-black text-slate-800">89</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl w-max mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">المبالغ الموفرة</p>
          <h3 className="text-3xl font-black text-slate-800">2,450<span className="text-sm text-slate-500 font-normal mr-1">د.ك</span></h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="p-3 bg-purple-50 text-purple-500 rounded-xl w-max mb-4">
            <Star className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">متوسط تقييمك</p>
          <h3 className="text-3xl font-black text-slate-800">4.8</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg font-bold text-slate-800">أكثر الأضرار شيوعاً (آخر 30 يوم)</h3>
            <div className="flex flex-wrap gap-2">
              {damageData.map(d => (
                <button
                  key={d.name}
                  onClick={() => toggleFilter(d.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    activeFilters.includes(d.name) 
                      ? 'bg-slate-800 text-white' 
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filteredData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#334155', fontWeight: 'bold' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">أكثر الأجزاء تضرراً</h3>
          <div className="space-y-4">
            <ProgressBar label="صدام أمامي" value={35} total={100} color="bg-blue-500" />
            <ProgressBar label="أبواب" value={28} total={100} color="bg-indigo-500" />
            <ProgressBar label="رفارف" value={20} total={100} color="bg-cyan-500" />
            <ProgressBar label="مصابيح" value={12} total={100} color="bg-sky-500" />
          </div>
        </div>
      </div>

      <div className="bg-primary-50 p-8 rounded-2xl border border-primary-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-primary-900 mb-2">برنامج الإحالة والمكافآت</h3>
          <p className="text-primary-700">شارك التطبيق مع أصدقائك أو الورش الأخرى واحصل على ميزات متقدمة إضافية عند تسجيلهم.</p>
        </div>
        <button 
          onClick={handleShare}
          className="bg-primary-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-600 transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <Share2 className="w-5 h-5" />
          مشاركة الرابط
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ label, value, total, color }: { label: string, value: number, total: number, color: string }) {
  const percentage = Math.round((value / total) * 100);
  return (
    <div className="flex items-center gap-4">
      <span className="w-24 text-sm font-medium text-slate-600">{label}</span>
      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
      <span className="w-8 text-sm font-bold text-slate-800 text-left">{value}</span>
    </div>
  );
}

import React from 'react';
import { 
  BarChart3, 
  Target, 
  Clock, 
  Users, 
  TrendingUp,
  TrendingDown,
  Activity,
  CarFront,
  Image as ImageIcon,
  Brain,
  DollarSign,
  Settings as SettingsIcon,
  CheckCircle2,
  Clock3
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { 
      label: 'إجمالي التحليلات', 
      value: '1,234', 
      change: '↑ 12% عن الأسبوع الماضي', 
      isPositive: true,
      icon: <BarChart3 className="w-6 h-6 text-primary-500" />
    },
    { 
      label: 'متوسط الدقة', 
      value: '92%', 
      change: '↑ 2% عن الأسبوع الماضي', 
      isPositive: true,
      icon: <Target className="w-6 h-6 text-emerald-500" />
    },
    { 
      label: 'متوسط الوقت', 
      value: '3.2s', 
      change: '↓ 0.5s عن الأسبوع الماضي', 
      isPositive: true, // A decrease in time is positive!
      icon: <Clock className="w-6 h-6 text-amber-500" />
    },
    { 
      label: 'المستخدمين النشطين', 
      value: '156', 
      change: '↑ 8% عن الأسبوع الماضي', 
      isPositive: true,
      icon: <Users className="w-6 h-6 text-purple-500" />
    },
  ];

  const recentAnalyses = [
    { id: '#1234', time: 'منذ 5 دقائق', damages: '3 أضرار', cost: '460 د.ك', accuracy: '94%', status: 'مكتمل' },
    { id: '#1233', time: 'منذ 12 دقيقة', damages: '1 ضرر', cost: '120 د.ك', accuracy: '89%', status: 'مكتمل' },
    { id: '#1232', time: 'منذ 25 دقيقة', damages: '5 أضرار', cost: '890 د.ك', accuracy: '96%', status: 'قيد المراجعة' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">لوحة التحكم</h1>
          <p className="text-slate-500">نظرة عامة على أداء نظام OpenBody</p>
        </div>
        <div className="text-sm text-slate-500 flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200">
          <Activity className="w-4 h-4 text-emerald-500" />
          <span>آخر تحديث: الآن</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                {stat.icon}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-800 mb-2">{stat.value}</h3>
            <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
              {stat.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">آخر التحليلات</h2>
          <button className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">
            عرض الكل
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
              <tr>
                <th className="py-4 px-6 font-medium">المعرف</th>
                <th className="py-4 px-6 font-medium">الوقت</th>
                <th className="py-4 px-6 font-medium">الأضرار</th>
                <th className="py-4 px-6 font-medium">التكلفة</th>
                <th className="py-4 px-6 font-medium">الدقة</th>
                <th className="py-4 px-6 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentAnalyses.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-slate-800">{item.id}</td>
                  <td className="py-4 px-6 text-sm text-slate-500">{item.time}</td>
                  <td className="py-4 px-6 text-sm text-slate-700">{item.damages}</td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-700">{item.cost}</td>
                  <td className="py-4 px-6 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: item.accuracy }}
                        ></div>
                      </div>
                      <span>{item.accuracy}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {item.status === 'مكتمل' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
                        <Clock3 className="w-3.5 h-3.5" />
                        {item.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

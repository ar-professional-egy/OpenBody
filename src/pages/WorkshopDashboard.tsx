import { Users, Wrench, CheckCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WorkshopDashboard() {
  const stats = [
    { label: 'طلبات جديدة', value: '12', icon: <Users className="w-6 h-6 text-blue-600" />, bg: 'bg-blue-100' },
    { label: 'قيد الإصلاح', value: '8', icon: <Wrench className="w-6 h-6 text-amber-600" />, bg: 'bg-amber-100' },
    { label: 'مكتمل هذا الشهر', value: '45', icon: <CheckCircle className="w-6 h-6 text-emerald-600" />, bg: 'bg-emerald-100' },
    { label: 'الإيرادات التقديرية', value: '124K', icon: <TrendingUp className="w-6 h-6 text-purple-600" />, bg: 'bg-purple-100' },
  ];

  const chartData = [
    { name: 'الأسبوع 1', value: 12 },
    { name: 'الأسبوع 2', value: 19 },
    { name: 'الأسبوع 3', value: 15 },
    { name: 'الأسبوع 4', value: 22 },
  ];

  const requests = [
    { id: 'REQ-001', car: 'فورد تورس 2021', damage: 'متوسط', status: 'بانتظار التسعير', date: 'اليو' },
    { id: 'REQ-002', car: 'نيسان صني 2019', damage: 'خفيف', status: 'موافقة العميل', date: 'أمس' },
    { id: 'REQ-003', car: 'لكزس ES 2023', damage: 'شديد', status: 'قيد الإصلاح', date: 'منذ يومين' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">لوحة الورشة - مركز الصيانة المتقدم</h1>
        <p className="text-slate-500">متابعة الأداء، وإدارة طلبات الإصلاح، وإصدار عروض الأسعار</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className={`p-4 rounded-full ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">طلبات الإصلاح الأخيرة</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="text-sm text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="pb-3 font-medium">الرقم</th>
                  <th className="pb-3 font-medium">المركبة</th>
                  <th className="pb-3 font-medium">مستوى الضرر</th>
                  <th className="pb-3 font-medium">الحالة</th>
                  <th className="pb-3 font-medium">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td className="py-4 text-sm font-medium text-slate-800">{req.id}</td>
                    <td className="py-4 text-sm text-slate-600">{req.car}</td>
                    <td className="py-4 text-sm">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        req.damage === 'خفيف' ? 'bg-emerald-50 text-emerald-600' :
                        req.damage === 'متوسط' ? 'bg-amber-50 text-amber-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {req.damage}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-slate-600">{req.status}</td>
                    <td className="py-4 text-sm">
                      <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        إدارة
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">السيارات المستلمة (شهرياً)</h2>
          <div className="h-64 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Users, Wrench, CheckCircle, TrendingUp, Search, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

export default function WorkshopDashboard() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('الكل');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  useEffect(() => {
    // Simulate API fetch delay
    const fetchTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(fetchTimer);
  }, []);

  const stats = [
    { label: 'طلبات جديدة', value: '12', icon: <Users className="w-6 h-6 text-primary-500" />, bg: 'bg-primary-50' },
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
    { id: 'REQ-001', car: 'فورد تورس 2021', damage: 'متوسط', status: 'بانتظار التسعير', date: 'اليوم', cost: '2,500' },
    { id: 'REQ-002', car: 'نيسان صني 2019', damage: 'خفيف', status: 'موافقة العميل', date: 'أمس', cost: '800' },
    { id: 'REQ-003', car: 'لكزس ES 2023', damage: 'شديد', status: 'قيد الإصلاح', date: 'منذ يومين', cost: '12,400' },
    { id: 'REQ-004', car: 'هيونداي النترا 2020', damage: 'متوسط', status: 'بانتظار التسعير', date: 'منذ 3 أيام', cost: '1,900' },
  ];

  const filteredRequests = requests.filter(req => 
    (filter === 'الكل' || req.status === filter) &&
    (req.car.includes(searchTerm) || req.id.includes(searchTerm))
  );

  return (
    <div className="space-y-6 relative min-h-[80vh]">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">لوحة الورشة - مركز الصيانة المتقدم</h1>
        <p className="text-slate-500">متابعة الأداء، وإدارة طلبات الإصلاح، وإصدار عروض الأسعار</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 animate-pulse">
              <div className="w-14 h-14 bg-slate-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded w-20 mb-2"></div>
                <div className="h-6 bg-slate-200 rounded w-12"></div>
              </div>
            </div>
          ))
        ) : (
          stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className={`p-4 rounded-full ${stat.bg}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-lg font-semibold text-slate-800">طلبات الإصلاح الأخيرة</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="بحث برقم الطلب أو السيارة..." 
                  className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative w-full sm:w-auto min-w-[140px]">
                <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <select 
                  className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="الكل">جميع الحالات</option>
                  <option value="بانتظار التسعير">بانتظار التسعير</option>
                  <option value="موافقة العميل">موافقة العميل</option>
                  <option value="قيد الإصلاح">قيد الإصلاح</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-right">
              <thead className="text-sm text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="pb-3 font-medium">الرقم</th>
                  <th className="pb-3 font-medium">المركبة</th>
                  <th className="pb-3 font-medium">مستوى الضرر</th>
                  <th className="pb-3 font-medium">الحالة</th>
                  <th className="pb-3 font-medium text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="py-4"><div className="h-4 bg-slate-200 rounded w-16"></div></td>
                      <td className="py-4"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
                      <td className="py-4"><div className="h-5 bg-slate-200 rounded-md w-16"></div></td>
                      <td className="py-4"><div className="h-4 bg-slate-200 rounded w-20"></div></td>
                      <td className="py-4 text-center"><div className="h-4 bg-slate-200 rounded w-10 mx-auto"></div></td>
                    </tr>
                  ))
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">لا توجد طلبات تطابق بحثك</td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 text-sm font-medium text-primary-500">{req.id}</td>
                      <td className="py-4 text-sm text-slate-800">{req.car}</td>
                      <td className="py-4 text-sm">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                          req.damage === 'خفيف' ? 'bg-emerald-50 text-emerald-600' :
                          req.damage === 'متوسط' ? 'bg-amber-50 text-amber-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {req.damage}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-600 font-medium">{req.status}</td>
                      <td className="py-4 text-sm text-center">
                        <button 
                          onClick={() => setSelectedRequest(req)}
                          className="text-primary-500 bg-primary-50 px-3 py-1.5 rounded-md hover:bg-primary-100 hover:text-primary-700 font-medium transition-colors"
                        >
                          إدارة
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">السيارات المستلمة (شهرياً)</h2>
          {loading ? (
            <div className="h-64 w-full animate-pulse flex items-end gap-2 justify-between">
              <div className="w-1/4 bg-slate-200 h-2/5 rounded-t-sm"></div>
              <div className="w-1/4 bg-slate-200 h-4/5 rounded-t-sm"></div>
              <div className="w-1/4 bg-slate-200 h-3/5 rounded-t-sm"></div>
              <div className="w-1/4 bg-slate-200 h-full rounded-t-sm"></div>
            </div>
          ) : (
            <div className="h-64 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
      
      {/* Management Dialog */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">إدارة الطلب: {selectedRequest.id}</h3>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">المركبة</p>
                  <p className="font-bold text-slate-800">{selectedRequest.car}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">التكلفة التقديرية</p>
                  <p className="font-bold text-emerald-600">{selectedRequest.cost} ريال</p>
                </div>
              </div>
              
              <div>
                <p className="font-bold text-slate-800 mb-3">تحديث حالة الطلب</p>
                <div className="space-y-2">
                  {['بانتظار التسعير', 'موافقة العميل', 'قيد الإصلاح', 'مكتمل'].map(status => (
                    <label key={status} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selectedRequest.status === status ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <input 
                        type="radio" 
                        name="status" 
                        className="text-primary-600 focus:ring-primary-500" 
                        checked={selectedRequest.status === status}
                        readOnly
                      />
                      <span className={selectedRequest.status === status ? 'font-bold text-primary-700' : 'text-slate-700'}>{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedRequest(null)}
                className="px-5 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                إغلاق
              </button>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="px-5 py-2 rounded-lg font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


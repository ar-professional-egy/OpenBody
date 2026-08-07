import { Link } from 'react-router-dom';
import { FileText, Plus, Clock, CheckCircle2 } from 'lucide-react';

export default function ClientDashboard() {
  const reports = [
    {
      id: 'REP-2023-1001',
      date: '2023-10-15',
      car: 'تويوتا كامري 2022',
      status: 'بانتظار الإصلاح',
      cost: '1,500 ريال',
    },
    {
      id: 'REP-2023-0842',
      date: '2023-08-22',
      car: 'هيونداي إلنترا 2020',
      status: 'مكتمل',
      cost: '4,200 ريال',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">مرحباً بك، أحمد</h1>
          <p className="text-slate-500">لوحة تحكم العميل - إدارة تقارير الفحص والسيارات</p>
        </div>
        <Link
          to="/analysis"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          فحص جديد
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
          <FileText className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg font-semibold text-slate-800">التقارير السابقة</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">رقم التقرير</th>
                <th className="px-6 py-4 font-medium">السيارة</th>
                <th className="px-6 py-4 font-medium">التاريخ</th>
                <th className="px-6 py-4 font-medium">التكلفة التقديرية</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-blue-600">{report.id}</td>
                  <td className="px-6 py-4 text-slate-700">{report.car}</td>
                  <td className="px-6 py-4 text-slate-500">{report.date}</td>
                  <td className="px-6 py-4 text-slate-700">{report.cost}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      report.status === 'مكتمل' 
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {report.status === 'مكتمل' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-400 hover:text-blue-600 font-medium text-sm transition-colors">
                      عرض
                    </button>
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

import { Link, useNavigate } from 'react-router-dom';
import { FileText, Plus, Clock, CheckCircle2, Camera, CreditCard, ShieldCheck, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { OnboardingOverlay } from '../components/OnboardingOverlay';
import { RequestSystem } from '../components/RequestSystem';

export default function ClientDashboard() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch delay
    const fetchTimer = setTimeout(() => {
      const savedReports = JSON.parse(localStorage.getItem('openbody_reports') || '[]');
      if (savedReports.length > 0) {
        setReports(savedReports);
      } else {
        setReports([
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
        ]);
      }
      setLoading(false);
    }, 1500);
    return () => clearTimeout(fetchTimer);
  }, []);

  return (
    <div className="space-y-6 relative min-h-[80vh]">
      <OnboardingOverlay />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">مرحباً بك، أحمد</h1>
          <p className="text-slate-500">لوحة تحكم العميل - إدارة تقارير الفحص والسيارات</p>
        </div>
        <Link
          to="/analysis"
          className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center gap-2 hidden sm:flex"
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
              {loading ? (
                // Skeleton Loaders
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-200 rounded-full w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-12"></div></td>
                  </tr>
                ))
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">لا توجد تقارير سابقة</td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-primary-500">{report.id}</td>
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
                      <div className="flex items-center gap-3">
                        <button className="text-slate-400 hover:text-primary-500 font-medium text-sm transition-colors">
                          عرض
                        </button>
                        {report.status === 'بانتظار الإصلاح' && (
                          <>
                            <button 
                              onClick={() => {
                                setSelectedReport(report);
                                setRequestModalOpen(true);
                              }}
                              className="text-primary-600 bg-primary-50 hover:bg-primary-100 px-3 py-1 rounded-md font-medium text-sm transition-colors flex items-center gap-1"
                            >
                              <Send className="w-4 h-4" />
                              طلب عرض
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedReport(report);
                                setPaymentModalOpen(true);
                              }}
                              className="text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-md font-medium text-sm transition-colors flex items-center gap-1"
                            >
                              <CreditCard className="w-4 h-4" />
                              دفع
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <button 
        onClick={() => navigate('/analysis')}
        className="fixed bottom-8 left-8 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-all hover:scale-105 z-40 group"
        title="التقاط صورة للتحليل"
      >
        <Camera className="w-7 h-7" />
        <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-sm px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
          بدء فحص جديد بالكاميرا
        </span>
      </button>

      {/* Request System */}
      {requestModalOpen && selectedReport && (
        <RequestSystem 
          report={selectedReport} 
          onClose={() => setRequestModalOpen(false)} 
        />
      )}

      {/* Payment Modal Mockup */}
      {paymentModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 text-center relative bg-emerald-50">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm mb-4 text-emerald-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">تأكيد الدفع الآمن</h3>
              <p className="text-emerald-700 font-medium mt-1">فاتورة رقم: {selectedReport.id}</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500">المركبة</span>
                <span className="font-bold text-slate-800">{selectedReport.car}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500">المبلغ الإجمالي</span>
                <span className="text-2xl font-black text-emerald-600">{selectedReport.cost}</span>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-slate-400" />
                  <div className="text-right">
                    <p className="font-bold text-slate-700">بوابة الدفع (قريباً)</p>
                    <p className="text-xs text-slate-500">سيتم تفعيل الدفع الإلكتروني لاحقاً</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button 
                onClick={() => setPaymentModalOpen(false)}
                className="w-full bg-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-300 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

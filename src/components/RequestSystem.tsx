import { useState } from 'react';
import { Send, CheckCircle2, Wrench, X } from 'lucide-react';
import { apiService } from '../../services/api'; // Or just simulate it
import toast from 'react-hot-toast';

interface RequestSystemProps {
  report: any;
  onClose: () => void;
}

export function RequestSystem({ report, onClose }: RequestSystemProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Dummy workshops
  const workshops = [
    { id: 1, name: 'ورشة العناية الفائقة', rating: 4.8, distance: '5 كم' },
    { id: 2, name: 'المركز السعودي لسمكرة السيارات', rating: 4.5, distance: '8 كم' },
    { id: 3, name: 'ورشة الأمان السريع', rating: 4.9, distance: '12 كم' }
  ];
  
  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null);

  const handleSubmitRequest = async () => {
    if (!selectedWorkshop) {
      toast.error('الرجاء اختيار ورشة أولاً');
      return;
    }
    setLoading(true);
    // Simulate Supabase API Call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('تم إرسال طلب عرض السعر بنجاح');
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 text-center animate-in fade-in zoom-in duration-200">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">تم الإرسال بنجاح</h3>
          <p className="text-slate-600 mb-8">
            تم إرسال تقرير الفحص الخاص بك (رقم {report.id}) إلى الورشة المحددة. سيتم الرد عليك بعرض سعر نهائي قريباً.
          </p>
          <button 
            onClick={onClose}
            className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-primary-600" />
            <h3 className="text-xl font-bold text-slate-800">طلب عرض سعر إصلاح</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
            <h4 className="text-sm font-bold text-primary-800 mb-1">تفاصيل التقرير المرسل</h4>
            <div className="flex justify-between text-sm text-primary-700">
              <span>المركبة: {report.car}</span>
              <span>رقم: {report.id}</span>
            </div>
            <div className="flex justify-between text-sm text-primary-700 mt-1">
              <span>التكلفة المبدئية: {report.cost}</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-800 mb-4">اختر ورشة معتمدة</h4>
            <div className="space-y-3">
              {workshops.map(ws => (
                <label 
                  key={ws.id} 
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${selectedWorkshop === ws.id ? 'border-primary-500 bg-primary-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <div className="flex items-center gap-4">
                    <input 
                      type="radio" 
                      name="workshop" 
                      className="text-primary-600 focus:ring-primary-500"
                      checked={selectedWorkshop === ws.id}
                      onChange={() => setSelectedWorkshop(ws.id)}
                    />
                    <div>
                      <p className="font-bold text-slate-800">{ws.name}</p>
                      <div className="flex gap-3 text-xs text-slate-500 mt-1">
                        <span>⭐ {ws.rating} تقييم</span>
                        <span>📍 {ws.distance}</span>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors"
          >
            إلغاء
          </button>
          <button 
            onClick={handleSubmitRequest}
            disabled={loading || !selectedWorkshop}
            className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? 'جاري الإرسال...' : (
              <>
                <Send className="w-5 h-5" />
                إرسال الطلب
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

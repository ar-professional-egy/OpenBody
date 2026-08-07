import { Save, Cloud, Trash2, Clock, Mic, Info, Terminal, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { signOut } = useAuth();

  const handleBackup = () => {
    alert('جاري النسخ الاحتياطي السحابي...');
  };

  const handleClearData = () => {
    if (confirm('هل أنت متأكد من حذف جميع البيانات المحلية؟')) {
      alert('تم مسح البيانات بنجاح.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">الإعدادات</h1>
        <p className="text-slate-500">إدارة حسابك، النسخ الاحتياطي، والتفضيلات</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col divide-y divide-slate-100">
        
        {/* النسخ الاحتياطي */}
        <div className="p-6">
          <h2 className="text-sm font-bold text-primary-500 mb-4">النسخ الاحتياطي</h2>
          <div className="space-y-2">
            <button onClick={handleBackup} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Cloud className="w-5 h-5 text-slate-400" />
                <div className="text-right">
                  <p className="font-medium text-slate-800">نسخ احتياطي الآن</p>
                  <p className="text-sm text-slate-500">حفظ بياناتك في السحابة</p>
                </div>
              </div>
            </button>
            <button onClick={handleBackup} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Save className="w-5 h-5 text-slate-400" />
                <div className="text-right">
                  <p className="font-medium text-slate-800">استعادة النسخة</p>
                  <p className="text-sm text-slate-500">استرجاع بياناتك من السحابة</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* التخزين */}
        <div className="p-6">
          <h2 className="text-sm font-bold text-primary-500 mb-4">التخزين</h2>
          <div className="space-y-2">
            <button onClick={handleClearData} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-red-400" />
                <div className="text-right">
                  <p className="font-medium text-slate-800">مسح البيانات المحلية</p>
                  <p className="text-sm text-slate-500">حذف جميع الصور والتقارير المؤقتة</p>
                </div>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-400" />
                <div className="text-right">
                  <p className="font-medium text-slate-800">الحذف التلقائي</p>
                  <p className="text-sm text-slate-500">تفريغ المساحة كل 30 يوم</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* المساعد الصوتي */}
        <div className="p-6">
          <h2 className="text-sm font-bold text-primary-500 mb-4">المساعد الصوتي</h2>
          <label className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Mic className="w-5 h-5 text-slate-400" />
              <div className="text-right">
                <p className="font-medium text-slate-800">تفعيل المساعد الصوتي</p>
                <p className="text-sm text-slate-500">التفاعل عبر "يا OpenBody"</p>
              </div>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-primary-500">
              <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white transition-transform transform -translate-x-6"></span>
            </div>
          </label>
        </div>

        {/* حول التطبيق */}
        <div className="p-6">
          <h2 className="text-sm font-bold text-primary-500 mb-4">حول التطبيق</h2>
          <div className="space-y-2">
            <div className="w-full flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-slate-400" />
                <div className="text-right">
                  <p className="font-medium text-slate-800">الإصدار</p>
                  <p className="text-sm text-slate-500">1.0.0 (نسخة الويب)</p>
                </div>
              </div>
            </div>
            <a href="#" className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-slate-400" />
                <div className="text-right">
                  <p className="font-medium text-slate-800">مفتوح المصدر</p>
                  <p className="text-sm text-slate-500">GitHub/OpenBody</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* تسجيل الخروج */}
        <div className="p-6">
          <button 
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 p-4 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>

      </div>
    </div>
  );
}

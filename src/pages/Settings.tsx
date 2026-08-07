import { useState } from 'react';
import { Save, Cloud, Trash2, Clock, Mic, Info, Terminal, LogOut, Moon, Sun, Image as ImageIcon, Globe, Backup } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { signOut } = useAuth();
  
  // State for settings
  const [darkMode, setDarkMode] = useState(false);
  const [photoQuality, setPhotoQuality] = useState('عالية');
  const [voiceAssistant, setVoiceAssistant] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [reportLanguage, setReportLanguage] = useState('العربية');

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
        <h1 className="text-2xl font-bold text-slate-800">إعدادات متقدمة</h1>
        <p className="text-slate-500">إدارة المظهر، النسخ الاحتياطي، والتفضيلات</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col divide-y divide-slate-100">
        
        {/* المظهر */}
        <div className="p-6">
          <h2 className="text-sm font-bold text-primary-500 mb-4">المظهر</h2>
          <label className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-slate-400" /> : <Sun className="w-5 h-5 text-slate-400" />}
              <div className="text-right">
                <p className="font-medium text-slate-800">الوضع المظلم</p>
                <p className="text-sm text-slate-500">تفعيل المظهر الداكن</p>
              </div>
            </div>
            <div className={`relative inline-block w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary-500' : 'bg-slate-300'}`}>
              <input type="checkbox" className="opacity-0 w-0 h-0" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <span className={`absolute right-1 top-1 w-4 h-4 rounded-full bg-white transition-transform transform ${darkMode ? '-translate-x-6' : ''}`}></span>
            </div>
          </label>
        </div>

        {/* الصور */}
        <div className="p-6">
          <h2 className="text-sm font-bold text-primary-500 mb-4">الصور</h2>
          <div className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-slate-400" />
              <div className="text-right">
                <p className="font-medium text-slate-800">جودة الصور</p>
                <p className="text-sm text-slate-500">{photoQuality}</p>
              </div>
            </div>
            <select 
              value={photoQuality} 
              onChange={(e) => setPhotoQuality(e.target.value)}
              className="bg-slate-100 border-none rounded-lg px-4 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="عالية">عالية</option>
              <option value="متوسطة">متوسطة</option>
              <option value="اقتصادية">اقتصادية</option>
            </select>
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
                <p className="text-sm text-slate-500">قل "يا OpenBody" للبدء</p>
              </div>
            </div>
            <div className={`relative inline-block w-12 h-6 rounded-full transition-colors ${voiceAssistant ? 'bg-primary-500' : 'bg-slate-300'}`}>
              <input type="checkbox" className="opacity-0 w-0 h-0" checked={voiceAssistant} onChange={() => setVoiceAssistant(!voiceAssistant)} />
              <span className={`absolute right-1 top-1 w-4 h-4 rounded-full bg-white transition-transform transform ${voiceAssistant ? '-translate-x-6' : ''}`}></span>
            </div>
          </label>
        </div>

        {/* النسخ الاحتياطي */}
        <div className="p-6">
          <h2 className="text-sm font-bold text-primary-500 mb-4">النسخ الاحتياطي</h2>
          <div className="space-y-2">
            <label className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Cloud className="w-5 h-5 text-slate-400" />
                <div className="text-right">
                  <p className="font-medium text-slate-800">نسخ احتياطي تلقائي</p>
                  <p className="text-sm text-slate-500">Google Drive / iCloud</p>
                </div>
              </div>
              <div className={`relative inline-block w-12 h-6 rounded-full transition-colors ${autoBackup ? 'bg-primary-500' : 'bg-slate-300'}`}>
                <input type="checkbox" className="opacity-0 w-0 h-0" checked={autoBackup} onChange={() => setAutoBackup(!autoBackup)} />
                <span className={`absolute right-1 top-1 w-4 h-4 rounded-full bg-white transition-transform transform ${autoBackup ? '-translate-x-6' : ''}`}></span>
              </div>
            </label>
            <button onClick={handleBackup} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors text-right">
              <div className="flex items-center gap-3">
                <Save className="w-5 h-5 text-slate-400" />
                <div className="text-right">
                  <p className="font-medium text-slate-800">نسخ احتياطي الآن</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* اللغة */}
        <div className="p-6">
          <h2 className="text-sm font-bold text-primary-500 mb-4">اللغة</h2>
          <div className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-slate-400" />
              <div className="text-right">
                <p className="font-medium text-slate-800">لغة التقارير</p>
                <p className="text-sm text-slate-500">{reportLanguage}</p>
              </div>
            </div>
            <select 
              value={reportLanguage} 
              onChange={(e) => setReportLanguage(e.target.value)}
              className="bg-slate-100 border-none rounded-lg px-4 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="العربية">العربية</option>
              <option value="English">English</option>
            </select>
          </div>
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

        {/* مسح البيانات وتسجيل الخروج */}
        <div className="p-6 space-y-4">
          <button 
            onClick={handleClearData}
            className="w-full flex items-center justify-center gap-2 p-4 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            <Trash2 className="w-5 h-5" />
            مسح جميع البيانات
          </button>
          
          <button 
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 p-4 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>

      </div>
    </div>
  );
}

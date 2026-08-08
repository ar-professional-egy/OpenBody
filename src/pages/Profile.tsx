import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User as UserIcon, Phone, Save, Loader2, Settings as SettingsIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Profile() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [preferences, setPreferences] = useState({
    costEstimateLevel: 'average', // 'low', 'average', 'high'
    receiveNotifications: true
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName });
      }
      
      // We simulate saving preferences as we don't have a user database collection yet
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('تم حفظ التغييرات بنجاح');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('حدث خطأ أثناء حفظ التغييرات');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">الملف الشخصي</h1>
        <p className="text-slate-500">إدارة معلوماتك الشخصية وتفضيلات النظام</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-primary-500" />
            المعلومات الأساسية
          </h2>
        </div>
        
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">
              رقم الهاتف (مسجل عبر واتساب)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                id="phone"
                dir="ltr"
                value={user?.phoneNumber || 'غير متوفر'}
                disabled
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 focus:outline-none text-left cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">لا يمكن تغيير رقم الهاتف المرتبط بالحساب.</p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">
              الاسم الكامل
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <UserIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="أدخل اسمك الكريم"
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2 mb-4">
              <SettingsIcon className="w-5 h-5 text-primary-500" />
              تفضيلات تقدير التكلفة
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">مستوى التكلفة المفضل للعرض</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPreferences({...preferences, costEstimateLevel: 'low'})}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors border ${
                      preferences.costEstimateLevel === 'low' 
                        ? 'bg-primary-50 border-primary-200 text-primary-700' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    التكلفة الدنيا
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferences({...preferences, costEstimateLevel: 'average'})}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors border ${
                      preferences.costEstimateLevel === 'average' 
                        ? 'bg-primary-50 border-primary-200 text-primary-700' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    متوسط السوق
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferences({...preferences, costEstimateLevel: 'high'})}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors border ${
                      preferences.costEstimateLevel === 'high' 
                        ? 'bg-primary-50 border-primary-200 text-primary-700' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    التكلفة العليا (الوكالة)
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">إشعارات الواتساب</h4>
                  <p className="text-xs text-slate-500">استلام تقارير الفحص مباشرة على رقمك</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={preferences.receiveNotifications}
                    onChange={(e) => setPreferences({...preferences, receiveNotifications: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-primary-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-600 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

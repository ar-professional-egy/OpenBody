import { Outlet, Link, useLocation } from 'react-router-dom';
import { CarFront, User, Wrench, BarChart3, LogIn, LogOut, Settings as SettingsIcon, LayoutDashboard, HelpCircle, TrendingUp, Globe, WifiOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { NotificationCenter } from './NotificationCenter';
import { useState, useEffect } from 'react';
import { getLanguage, setLanguage, Language } from '../lib/i18n';

export default function Layout() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [lang, setLangState] = useState<Language>(getLanguage());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : lang === 'en' ? 'fr' : 'ar';
    setLanguage(nextLang);
    setLangState(nextLang);
    // Force re-render of components using translations (in a real app you'd use a context)
    window.location.reload(); 
  };

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: <CarFront className="w-5 h-5" /> },
    { name: 'لوحة العميل', path: '/client', icon: <User className="w-5 h-5" /> },
    { name: 'لوحة الورشة', path: '/workshop', icon: <Wrench className="w-5 h-5" /> },
    { name: 'لوحة التحكم', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'فحص جديد', path: '/analysis', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'إحصائياتي', path: '/stats', icon: <TrendingUp className="w-5 h-5" /> },
    { name: 'الملف الشخصي', path: '/profile', icon: <User className="w-5 h-5" /> },
    { name: 'المساعدة', path: '/help', icon: <HelpCircle className="w-5 h-5" /> },
    { name: 'الإعدادات', path: '/settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {!isOnline && (
        <div className="bg-amber-100 border-b border-amber-200 px-4 py-2 flex items-center justify-center gap-2 text-amber-800 text-sm font-medium">
          <WifiOff className="w-4 h-4" />
          <span>أنت الآن غير متصل بالإنترنت. بعض الميزات قد لا تعمل بشكل صحيح.</span>
        </div>
      )}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary-500 p-2 rounded-lg">
                <CarFront className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">OpenBody</span>
            </Link>
            
            <nav className="hidden md:flex gap-4 lg:gap-6 items-center flex-wrap justify-end">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  <span className="hidden lg:inline">{item.name}</span>
                </Link>
              ))}
              <div className="h-6 w-px bg-slate-200 mx-2"></div>
              
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                title={lang === 'ar' ? 'Switch to English' : lang === 'en' ? 'Passer en français' : 'التبديل للعربية'}
              >
                <Globe className="w-5 h-5" />
                <span className="uppercase">{lang}</span>
              </button>

              {user ? (
                <div className="flex items-center gap-4">
                  <NotificationCenter />
                  <Link to="/profile" className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors" dir="ltr">
                    {user.displayName || user.email || user.phoneNumber}
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    خروج
                  </button>
                </div>
              ) : (
                <Link
                  to="/analysis"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  تسجيل الدخول
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} OpenBody - منصة ذكية مفتوحة المصدر لتحليل أضرار السيارات
        </div>
      </footer>
    </div>
  );
}

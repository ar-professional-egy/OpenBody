import { Outlet, Link, useLocation } from 'react-router-dom';
import { CarFront, User, Wrench, BarChart3 } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: <CarFront className="w-5 h-5" /> },
    { name: 'لوحة العميل', path: '/client', icon: <User className="w-5 h-5" /> },
    { name: 'لوحة الورشة', path: '/workshop', icon: <Wrench className="w-5 h-5" /> },
    { name: 'فحص جديد', path: '/analysis', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <CarFront className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">OpenBody</span>
            </Link>
            
            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
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

import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle2, AlertTriangle, FileText, Settings, X, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export interface Notification {
  id: string;
  type: 'report_ready' | 'estimate_update' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load from local storage or set dummy data
  const loadNotifications = () => {
    const saved = localStorage.getItem('openbody_notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      const initialNotifications: Notification[] = [
        {
          id: '1',
          type: 'report_ready',
          title: 'تقرير الفحص جاهز',
          message: 'تم الانتهاء من تحليل سيارتك. التكلفة التقديرية: 1,500 ريال.',
          time: 'منذ 5 دقائق',
          read: false,
          link: '/client'
        },
        {
          id: '2',
          type: 'estimate_update',
          title: 'تحديث حالة الإصلاح',
          message: 'تم تحديث حالة سيارتك إلى "مكتمل" من قبل الورشة.',
          time: 'منذ ساعتين',
          read: false,
          link: '/client'
        }
      ];
      setNotifications(initialNotifications);
      localStorage.setItem('openbody_notifications', JSON.stringify(initialNotifications));
    }
  };

  useEffect(() => {
    loadNotifications();

    const handleNewNotification = () => {
      loadNotifications();
      toast.success('إشعار جديد: تقرير الفحص جاهز', {
        icon: '🔔',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    };

    window.addEventListener('openbody_new_notification', handleNewNotification);
    return () => window.removeEventListener('openbody_new_notification', handleNewNotification);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('openbody_notifications', JSON.stringify(updated));
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('openbody_notifications', JSON.stringify(updated));
  };

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('openbody_notifications', JSON.stringify(updated));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'report_ready': return <FileText className="w-5 h-5 text-emerald-500" />;
      case 'estimate_update': return <Settings className="w-5 h-5 text-blue-500" />;
      case 'system': return <Info className="w-5 h-5 text-amber-500" />;
      default: return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 origin-top-left animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800">الإشعارات</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                تحديد الكل كمقروء
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 flex flex-col items-center">
                <Bell className="w-12 h-12 text-slate-200 mb-3" />
                <p>لا توجد إشعارات حالياً</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`relative p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${!notification.read ? 'bg-primary-50/30' : ''}`}
                    onClick={() => {
                      markAsRead(notification.id);
                      if (notification.link) {
                        // Assuming React Router's useNavigate hook is used by the parent, 
                        // but here we just use Link wrapping or manual navigation.
                        // For simplicity in this component, we can let Link handle it if wrapped,
                        // or window.location if not. Let's just handle it normally.
                      }
                    }}
                  >
                    {!notification.read && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                    )}
                    
                    <div className={`p-2 h-max rounded-full shrink-0 ${
                      notification.type === 'report_ready' ? 'bg-emerald-100' :
                      notification.type === 'estimate_update' ? 'bg-blue-100' :
                      'bg-amber-100'
                    }`}>
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex justify-between items-start mb-1">
                        {notification.link ? (
                          <Link 
                            to={notification.link} 
                            className="font-bold text-sm text-slate-800 hover:text-primary-600 truncate"
                            onClick={() => setIsOpen(false)}
                          >
                            {notification.title}
                          </Link>
                        ) : (
                          <h4 className="font-bold text-sm text-slate-800 truncate">{notification.title}</h4>
                        )}
                        <span className="text-[11px] text-slate-400 whitespace-nowrap mr-2">{notification.time}</span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {notification.message}
                      </p>
                    </div>
                    
                    <button 
                      onClick={(e) => removeNotification(notification.id, e)}
                      className="text-slate-300 hover:text-red-500 transition-colors shrink-0 opacity-0 group-hover:opacity-100 lg:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

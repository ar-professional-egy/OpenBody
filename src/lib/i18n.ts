export type Language = 'ar' | 'en';

type Translations = {
  [key in Language]: {
    [key: string]: string | Record<string, string>;
  };
};

const translations: Translations = {
  ar: {
    app_name: 'OpenBody',
    welcome: 'مرحباً بك في OpenBody',
    login_whatsapp: 'تسجيل الدخول عبر واتساب',
    phone_number: 'رقم الهاتف',
    analyze: 'تحليل الأضرار',
    damages_found: 'الأضرار المكتشفة',
    cost_estimate: 'التكلفة التقديرية',
    repair_time: 'مدة الإصلاح',
    settings: 'الإعدادات',
    help: 'المساعدة',
    profile: 'الملف الشخصي',
    damage_types: {
      scratch: 'خدش',
      dent: 'انبعاج',
      crack: 'كسر',
      rust: 'صدأ'
    }
  },
  en: {
    app_name: 'OpenBody',
    welcome: 'Welcome to OpenBody',
    login_whatsapp: 'Login with WhatsApp',
    phone_number: 'Phone Number',
    analyze: 'Analyze Damages',
    damages_found: 'Damages Found',
    cost_estimate: 'Estimated Cost',
    repair_time: 'Repair Time',
    settings: 'Settings',
    help: 'Help Center',
    profile: 'Profile',
    damage_types: {
      scratch: 'Scratch',
      dent: 'Dent',
      crack: 'Crack',
      rust: 'Rust'
    }
  }
};

let currentLanguage: Language = 'ar';

export const setLanguage = (lang: Language) => {
  currentLanguage = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
};

export const getLanguage = () => currentLanguage;

export const t = (key: string): string => {
  const parts = key.split('.');
  let value: any = translations[currentLanguage];

  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      return key; // Fallback to key if not found
    }
  }

  return typeof value === 'string' ? value : key;
};

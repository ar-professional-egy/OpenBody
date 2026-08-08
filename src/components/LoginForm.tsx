import React, { useState, useEffect, useRef } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { LogIn, Loader2, Phone, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState<ConfirmationResult | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const recaptchaContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize RecaptchaVerifier
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  }, []);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      toast.error('الرجاء إدخال رقم الهاتف');
      return;
    }
    
    // Simple validation for international format
    if (!phoneNumber.startsWith('+')) {
      toast.error('الرجاء إدخال رقم الهاتف مع الرمز الدولي (مثال: +966...)');
      return;
    }

    try {
      setIsLoading(true);
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult);
      setIsOtpSent(true);
      toast.success('تم إرسال رمز التحقق بنجاح');
    } catch (err: any) {
      console.error('Send OTP error:', err);
      toast.error(err.message || 'حدث خطأ أثناء إرسال رمز التحقق');
      if (window.recaptchaVerifier) {
          window.recaptchaVerifier.render().then((widgetId: any) => {
              window.recaptchaVerifier.reset(widgetId);
          });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim() || !verificationId) {
      toast.error('الرجاء إدخال رمز التحقق');
      return;
    }

    try {
      setIsLoading(true);
      await verificationId.confirm(otp);
      toast.success('تم تسجيل الدخول بنجاح');
      // AuthProvider will automatically pick up the user state change
    } catch (err: any) {
      console.error('Verify OTP error:', err);
      toast.error('رمز التحقق غير صحيح أو منتهي الصلاحية');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-md w-full mx-auto my-8">
      <div id="recaptcha-container" ref={recaptchaContainer}></div>
      <div className="bg-[#25D366]/10 p-4 rounded-full text-[#25D366] mb-4">
        {isOtpSent ? <KeyRound className="w-8 h-8" /> : <Phone className="w-8 h-8" />}
      </div>
      <h2 className="text-2xl font-black text-slate-800 mb-2">الدخول عبر واتساب</h2>
      <p className="text-slate-600 text-center mb-8">
        {isOtpSent 
          ? 'أدخل رمز التحقق الذي وصلك على واتساب' 
          : 'أدخل رقم هاتفك لتسجيل الدخول بأمان وسرعة.'}
      </p>

      {!isOtpSent ? (
        <form onSubmit={handleSendCode} className="w-full space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">
              رقم الهاتف
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                id="phone"
                dir="ltr"
                placeholder="+9665XXXXXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-left"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#128C7E] transition-colors shadow-lg shadow-[#25D366]/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            )}
            {isLoading ? 'جاري الإرسال...' : 'إرسال رمز التحقق'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="w-full space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-bold text-slate-700 mb-1">
              رمز التحقق
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="otp"
                dir="ltr"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-center tracking-[0.5em] text-lg font-bold"
                maxLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'تأكيد الدخول'
            )}
          </button>
          
          <button
            type="button"
            onClick={() => setIsOtpSent(false)}
            className="w-full text-slate-500 text-sm font-medium hover:text-slate-700 mt-2"
          >
            تغيير رقم الهاتف
          </button>
        </form>
      )}
    </div>
  );
}

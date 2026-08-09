import { useState, useEffect, useRef } from 'react';
import { UploadCloud, Loader2, AlertTriangle, ShieldCheck, Download, Share2, Wrench, Camera, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from '../components/LoginForm';
import { LoadingScreen } from '../components/LoadingScreen';
import { DamageCard } from '../components/DamageCard';
import { CameraCapture } from '../components/CameraCapture';
import { FeedbackModal } from '../components/FeedbackModal';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';

type Step = 'upload' | 'analyzing' | 'results';

export default function Analysis() {
  const [step, setStep] = useState<Step>('upload');
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const reportRef = useRef<HTMLDivElement>(null);

  const [isCompareMode, setIsCompareMode] = useState(false);

  // Simulated AI analysis progress
  useEffect(() => {
    if (step === 'analyzing') {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setIsCameraOpen(false);
            setStep('results');
            
            // Save to database
            const saveReport = async () => {
              try {
                // Try sending to our backend service
                // const apiResponse = await apiService.submitAnalysis({ image_data: capturedImage || '' });
                
                // Direct Supabase storage approach
                const { supabase } = await import('../lib/supabaseClient');
                const newReportData = {
                  car: 'سيارة محددة بالذكاء الاصطناعي',
                  status: 'بانتظار التسعير',
                  cost_estimate: '1,500 ريال',
                  image_url: capturedImage, // In a real app, upload this to a bucket first and store the URL
                  damage_level: 'متوسط'
                };
                
                await supabase.from('analysis_reports').insert([newReportData]);
              } catch (e) {
                console.error('Failed to save to Supabase:', e);
              }
            };
            saveReport();

            // Simulate FCM Real-time alert
            const existingNotifications = JSON.parse(localStorage.getItem('openbody_notifications') || '[]');
            const newNotification = {
              id: Date.now().toString(),
              type: 'report_ready',
              title: 'تقرير الفحص جاهز',
              message: 'تم الانتهاء من تحليل سيارتك للتو. التكلفة التقديرية: 1,100 ريال.',
              time: 'الآن',
              read: false,
              link: '/client'
            };
            localStorage.setItem('openbody_notifications', JSON.stringify([newNotification, ...existingNotifications]));
            window.dispatchEvent(new Event('openbody_new_notification'));
            
            return 100;
          }
          return p + 5;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [step, capturedImage]);

  const handleUpload = () => {
    setStep('analyzing');
    setProgress(0);
  };

  const handleCapture = (imageDataUrl: string) => {
    setCapturedImage(imageDataUrl);
    setStep('analyzing');
    setProgress(0);
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setIsDownloading(true);
    const toastId = toast.loading('جاري تجهيز التقرير...');
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`OpenBody-Report-${new Date().getTime()}.pdf`);
      toast.success('تم تحميل التقرير بنجاح', { id: toastId });
    } catch (error) {
      console.error('Error generating PDF', error);
      toast.error('حدث خطأ أثناء إنشاء التقرير', { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">الفحص الذكي للأضرار</h1>
        <p className="text-slate-500">قم برفع صورة السيارة ليقوم الذكاء الاصطناعي بتحليل الأضرار وتقدير التكلفة</p>
      </div>

      {/* Upload State */}
      {step === 'upload' && (
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div 
            onClick={handleUpload}
            className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-primary-500 transition-all group min-h-[300px]"
          >
            <div className="bg-primary-50 p-6 rounded-full group-hover:scale-110 transition-transform duration-300 mb-6">
              <UploadCloud className="w-12 h-12 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">رفع من المعرض</h3>
            <p className="text-slate-500 text-sm">يدعم JPG, PNG, HEIC</p>
          </div>

          <div 
            onClick={() => setIsCameraOpen(true)}
            className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-primary-500 transition-all group min-h-[300px]"
          >
            <div className="bg-emerald-50 p-6 rounded-full group-hover:scale-110 transition-transform duration-300 mb-6">
              <Camera className="w-12 h-12 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">استخدام الكاميرا</h3>
            <p className="text-slate-500 text-sm">التقط صورة للسيارة مباشرة</p>
          </div>
        </div>
      )}

      {isCameraOpen && (
        <CameraCapture 
          onCapture={handleCapture}
          onClose={() => setIsCameraOpen(false)}
          isProcessing={step === 'analyzing'}
        />
      )}

      {/* Analyzing State */}
      {step === 'analyzing' && !isCameraOpen && (
        <LoadingScreen 
          progress={progress / 100} 
          message="الذكاء الاصطناعي يقوم الآن بكشف المركبة، وتقسيم الأجزاء، وتصنيف الأضرار لتقدير التكلفة."
        />
      )}

      {/* Results State */}
      {step === 'results' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div ref={reportRef} className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex flex-col md:flex-row gap-6 overflow-hidden">
              {/* Image with bounding boxes simulation */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-800">صورة الفحص</h3>
                  <button 
                    onClick={() => setIsCompareMode(!isCompareMode)}
                    className="text-sm font-medium text-primary-500 bg-primary-50 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    {isCompareMode ? 'إلغاء المقارنة' : 'مقارنة مع الأصل'}
                  </button>
                </div>
                
                {isCompareMode ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative bg-slate-100 min-h-[200px] rounded-xl overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Reference Car" 
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        الحالة الأصلية
                      </div>
                    </div>
                    <div className="relative bg-slate-100 min-h-[200px] rounded-xl overflow-hidden">
                      <img 
                        src={capturedImage || "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                        alt="Car Damage" 
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] border-2 border-red-500 bg-red-500/20 rounded-md">
                      </div>
                      <div className="absolute bottom-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        الضرر المكتشف
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative bg-slate-100 min-h-[300px] rounded-xl overflow-hidden">
                    <img 
                      src={capturedImage || "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                      alt="Car Damage" 
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                    {/* Simulated Bounding Box */}
                    <div className="absolute top-[30%] left-[20%] w-[30%] h-[40%] border-2 border-red-500 bg-red-500/20 rounded-md">
                      <span className="absolute -top-6 -left-0.5 bg-red-500 text-white text-xs px-2 py-1 rounded-sm font-medium">
                        انبعاج وخدش (94%)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Summary */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium w-max mb-4">
                  <ShieldCheck className="w-4 h-4" />
                  تحليل مكتمل بنجاح
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">تقرير الضرر</h2>
                
                <div className="space-y-4 mt-6">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-500">مستوى الضرر</span>
                    <span className="font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-md text-sm">متوسط</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-500">الأجزاء المتضررة</span>
                    <span className="font-medium text-slate-800">الصدام الأمامي، الرفرف الأيسر</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-500">نوع الضرر</span>
                    <span className="font-medium text-slate-800">انبعاج عميق، تلف دهان</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-500">التكلفة التقديرية</span>
                    <span className="text-2xl font-black text-primary-500">1,200 - 1,500 ريال</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">تفاصيل الأضرار وتقدير التكلفة (عروض أسعار الإصلاح)</h3>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-right bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
                  <thead className="bg-slate-100 text-slate-600 text-sm">
                    <tr>
                      <th className="px-4 py-3 font-medium">الجزء المتضرر</th>
                      <th className="px-4 py-3 font-medium">نوع الضرر</th>
                      <th className="px-4 py-3 font-medium">الإجراء المقترح</th>
                      <th className="px-4 py-3 font-medium">تكلفة القطع</th>
                      <th className="px-4 py-3 font-medium">أجور العمل</th>
                      <th className="px-4 py-3 font-medium">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-800">الصدام الأمامي</td>
                      <td className="px-4 py-3 text-slate-600">انبعاج وتلف دهان</td>
                      <td className="px-4 py-3 text-slate-600">سمكرة ودهان</td>
                      <td className="px-4 py-3 text-slate-600">0 ريال</td>
                      <td className="px-4 py-3 text-slate-600">800 ريال</td>
                      <td className="px-4 py-3 font-bold text-primary-600">800 ريال</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-800">الرفرف الأيسر</td>
                      <td className="px-4 py-3 text-slate-600">خدش</td>
                      <td className="px-4 py-3 text-slate-600">تلميع</td>
                      <td className="px-4 py-3 text-slate-600">0 ريال</td>
                      <td className="px-4 py-3 text-slate-600">300 ريال</td>
                      <td className="px-4 py-3 font-bold text-primary-600">300 ريال</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-50 border-t border-slate-200">
                    <tr>
                      <td colSpan={5} className="px-4 py-3 font-bold text-left text-slate-700">الإجمالي التقديري:</td>
                      <td className="px-4 py-3 font-black text-lg text-primary-600">1,100 ريال</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="space-y-0 hidden">
                <DamageCard 
                  damage={{
                    id: '1',
                    part: 'الصدام الأمامي',
                    type: 'انبعاج',
                    severity: 'متوسط',
                    decision: 'سمكرة ودهان',
                    confidence: 0.94,
                    cost: 800
                  }} 
                />
                <DamageCard 
                  damage={{
                    id: '2',
                    part: 'الرفرف الأيسر',
                    type: 'خدش',
                    severity: 'خفيف',
                    decision: 'تلميع',
                    confidence: 0.88,
                    cost: 300
                  }} 
                />
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg flex items-start gap-3 text-amber-800 text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>التكلفة هي تقدير أولي مبني على الذكاء الاصطناعي وقاعدة بيانات أسعار السوق المحلية، وقد تختلف قليلاً بعد الفحص اليدوي في الورشة.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center gap-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">الإجراءات التالية</h3>
              <button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full bg-primary-500 text-white py-3 rounded-xl font-bold hover:bg-primary-600 transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                {isDownloading ? 'جاري التحميل...' : 'تحميل التقرير (PDF)'}
              </button>
              <a 
                href={`https://wa.me/?text=${encodeURIComponent('🚗 *تقرير أضرار السيارة*\nالتكلفة: 1500 ريال\nالمدة: 12 ساعة\nرابط التقرير: https://openbody.app/report/123')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold hover:bg-[#128C7E] transition-colors flex justify-center items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                مشاركة عبر واتساب
              </a>
              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors mt-2">
                إرسال إلى ورشة معتمدة
              </button>
              <button 
                onClick={() => setIsFeedbackOpen(true)}
                className="w-full bg-amber-50 text-amber-600 py-3 rounded-xl font-bold hover:bg-amber-100 transition-colors mt-2 flex justify-center items-center gap-2"
              >
                <Star className="w-5 h-5" />
                قيّم دقة التحليل
              </button>
            </div>
          </div>
          
          <div className="text-center pt-4"> 
             <button
                 onClick={() => setStep('upload')}
                className="text-slate-500 hover:text-primary-500 font-medium transition-colors underline"
             >
               إجراء فحص جديد
             </button>
          </div>
        </div>
      )}

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        reportId="123" 
      />
    </div>
  );
}

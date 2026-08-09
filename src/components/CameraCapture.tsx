import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera as CameraIcon, X, Loader2, Grid3X3, Zap, ZapOff, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  onClose: () => void;
  isProcessing?: boolean;
}

export function CameraCapture({ onCapture, onClose, isProcessing = false }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // New States
  const [showGrid, setShowGrid] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [filter, setFilter] = useState<'none' | 'grayscale' | 'contrast'>('none');
  const [hasFlash, setHasFlash] = useState(false);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', advanced: [{ torch: false } as any] },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      // Check for flash capabilities
      const track = mediaStream.getVideoTracks()[0];
      const capabilities = track.getCapabilities() as any;
      if (capabilities && capabilities.torch) {
        setHasFlash(true);
      }
    } catch (err: any) {
      console.error('Error accessing camera:', err);
      setError('تعذر الوصول إلى الكاميرا. يرجى التحقق من الصلاحيات.');
      toast.error('تعذر الوصول إلى الكاميرا');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          if (track.readyState === 'live') {
            track.applyConstraints({ advanced: [{ torch: false } as any] }).catch(() => {});
          }
          track.stop();
        });
      }
    };
  }, [startCamera]);

  const toggleFlash = async () => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    try {
      await track.applyConstraints({
        advanced: [{ torch: !flashOn } as any]
      });
      setFlashOn(!flashOn);
    } catch (err) {
      toast.error('تعذر التحكم في الفلاش');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        if (track.readyState === 'live') {
          track.applyConstraints({ advanced: [{ torch: false } as any] }).catch(() => {});
        }
        track.stop();
      });
      setStream(null);
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        // Apply filter to canvas if needed before sending
        if (filter !== 'none') {
           context.filter = filter === 'grayscale' ? 'grayscale(100%)' : 'contrast(150%) brightness(120%)';
        }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Turn off flash if on
        if (flashOn && stream) {
          const track = stream.getVideoTracks()[0];
          track.applyConstraints({ advanced: [{ torch: false } as any] }).catch(() => {});
        }
        
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        video.pause();
        onCapture(imageDataUrl);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
        {/* Header */}
        <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
          <h3 className="text-white font-bold flex items-center gap-2">
            <CameraIcon className="w-5 h-5" />
            التقاط صورة للضرر
          </h3>
          <button 
            onClick={handleClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side Controls */}
        {!isLoading && !error && !isProcessing && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
            {hasFlash && (
              <button 
                onClick={toggleFlash}
                className={`p-3 rounded-full backdrop-blur-md transition-all ${flashOn ? 'bg-primary-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'}`}
                title="تفعيل الفلاش"
              >
                {flashOn ? <Zap className="w-5 h-5" /> : <ZapOff className="w-5 h-5" />}
              </button>
            )}
            <button 
              onClick={() => setShowGrid(!showGrid)}
              className={`p-3 rounded-full backdrop-blur-md transition-all ${showGrid ? 'bg-primary-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'}`}
              title="شبكة المحاذاة"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setFilter(prev => prev === 'none' ? 'grayscale' : prev === 'grayscale' ? 'contrast' : 'none')}
              className={`p-3 rounded-full backdrop-blur-md transition-all ${filter !== 'none' ? 'bg-primary-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'}`}
              title="تغيير الفلتر"
            >
              <Wand2 className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Camera View */}
        <div className="relative aspect-[3/4] md:aspect-video w-full bg-black flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 gap-3">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-sm font-medium">جاري تشغيل الكاميرا...</p>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 gap-3 p-6 text-center">
              <p className="font-bold">{error}</p>
              <button 
                onClick={startCamera}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={`w-full h-full object-cover ${isLoading || error ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            style={{ 
              filter: filter === 'grayscale' ? 'grayscale(100%)' : filter === 'contrast' ? 'contrast(150%) brightness(120%)' : 'none' 
            }}
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Guide Overlay */}
          {!isLoading && !error && !isProcessing && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full border-[1.5px] border-white/20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 border-2 border-dashed border-white/50 rounded-xl"></div>
              </div>
            </div>
          )}

          {/* 3x3 Grid Overlay */}
          {showGrid && !isLoading && !error && !isProcessing && (
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-10">
              <div className="border-r border-b border-white/30"></div>
              <div className="border-r border-b border-white/30"></div>
              <div className="border-b border-white/30"></div>
              <div className="border-r border-b border-white/30"></div>
              <div className="border-r border-b border-white/30"></div>
              <div className="border-b border-white/30"></div>
              <div className="border-r border-white/30"></div>
              <div className="border-r border-white/30"></div>
              <div></div>
            </div>
          )}

          {/* Scanning Laser Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              <div 
                className="w-full h-1 bg-primary-500 shadow-[0_0_20px_rgba(37,211,102,0.8)] absolute"
                style={{ animation: 'scan 2s ease-in-out infinite' }}
              ></div>
              <style>
                {`
                  @keyframes scan {
                    0% { top: 0%; }
                    50% { top: 100%; }
                    100% { top: 0%; }
                  }
                `}
              </style>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-slate-900 flex justify-center items-center h-32 relative">
          {filter !== 'none' && (
             <div className="absolute top-2 text-white/50 text-xs font-medium">
               {filter === 'grayscale' ? 'فلتر: أبيض وأسود' : 'فلتر: تباين عالي لتوضيح الخدوش'}
             </div>
          )}
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center text-white/80 gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              <span className="text-sm font-bold animate-pulse">جاري التحليل...</span>
            </div>
          ) : (
            <button
              onClick={handleCapture}
              disabled={isLoading || !!error}
              className="group relative flex items-center justify-center w-20 h-20 bg-white/10 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-30"
            >
              <div className="w-16 h-16 bg-white rounded-full group-hover:scale-95 transition-transform duration-200"></div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

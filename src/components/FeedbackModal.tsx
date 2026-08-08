import React, { useState } from 'react';
import { Star, X, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId?: string;
}

export function FeedbackModal({ isOpen, onClose, reportId }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = [
    { text: 'دقة التحليل ممتازة', positive: true },
    { text: 'سرعة التحليل جيدة', positive: true },
    { text: 'التكلفة دقيقة', positive: true },
    { text: 'الدقة تحتاج تحسين', positive: false },
    { text: 'التحليل بطيء', positive: false },
    { text: 'التكلفة غير دقيقة', positive: false },
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the feedback to your backend
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setRating(0);
      setFeedback('');
      setSelectedTags([]);
    }, 2000);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-primary-500" />
            تقييم نتيجة التحليل
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-slate-800 mb-2">شكراً لتقييمك!</h4>
            <p className="text-slate-500">ملاحظاتك تساعدنا في تطوير دقة الذكاء الاصطناعي.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="text-center mb-8">
              <p className="text-slate-600 mb-4 font-medium">ما تقييمك لدقة التحليل وتقدير التكلفة؟</p>
              <div className="flex justify-center gap-2 flex-row-reverse">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-100 text-slate-200'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {rating > 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <p className="text-sm font-bold text-slate-700 mb-3">أخبرنا أكثر (اختياري)</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, idx) => {
                      const isSelected = selectedTags.includes(tag.text);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleTag(tag.text)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                            isSelected
                              ? tag.positive 
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-red-50 border-red-200 text-red-700'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {tag.text}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">ملاحظات إضافية</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="هل هناك أي تفاصيل أخرى تود مشاركتها؟"
                    className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px] resize-none"
                  ></textarea>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={rating === 0}
                className="px-6 py-2.5 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                إرسال التقييم
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

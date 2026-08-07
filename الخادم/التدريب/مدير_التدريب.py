"""
مدير التدريب - إعادة تدريب النماذج ببيانات جديدة
"""

import os
import json
from datetime import datetime
from typing import Dict, List
from ultralytics import YOLO

class مدير_التدريب:
    def __init__(self):
        self.مسار_البيانات = "بيانات/التدريب"
        self.مسار_النماذج = "النماذج/الإصدارات"
        self.سجل_التدريب = []
    
    async def تحضير_البيانات(self, صور_جديدة: List[str], تحديدات: List[Dict]):
        """تحضير بيانات التدريب الجديدة"""
        
        دفعة = datetime.now().strftime("%Y%m%d_%H%M%S")
        مسار_الدفعة = f"{self.مسار_البيانات}/دفعة_{دفعة}"
        
        os.makedirs(f"{مسار_الدفعة}/images", exist_ok=True)
        os.makedirs(f"{مسار_الدفعة}/labels", exist_ok=True)
        
        # نسخ الصور وتحويل التحديدات لصيغة YOLO
        for i, (صورة, تحديد) in enumerate(zip(صور_جديدة, تحديدات)):
            # حفظ الصورة
            اسم_الصورة = f"image_{i}.jpg"
            os.rename(صورة, f"{مسار_الدفعة}/images/{اسم_الصورة}")
            
            # حفظ ملف التحديد
            with open(f"{مسار_الدفعة}/labels/image_{i}.txt", 'w') as f:
                for t in تحديد:
                    class_id = t['class_id']
                    x_center = (t['x1'] + t['x2']) / 2
                    y_center = (t['y1'] + t['y2']) / 2
                    width = t['x2'] - t['x1']
                    height = t['y2'] - t['y1']
                    f.write(f"{class_id} {x_center} {y_center} {width} {height}\n")
        
        # إنشاء ملف data.yaml
        with open(f"{مسار_الدفعة}/data.yaml", 'w') as f:
            yaml_content = f"""
path: {مسار_الدفعة}
train: images
val: images
names:
  0: خدش
  1: انبعاج
  2: كسر
  3: شرخ
  4: صدأ
  5: زجاج_مهشم
  6: مصباح_مكسور
  7: إطار_تالف
"""
            f.write(yaml_content)
        
        return مسار_الدفعة
    
    async def تدريب(self, مسار_البيانات: str, النموذج_الأساسي: str = None):
        """إعادة تدريب النموذج"""
        
        if النموذج_الأساسي is None:
            النموذج_الأساسي = "النماذج/كشف_الأضرار/cardd-yolov8s.pt"
        
        print(f"🏋️ بدء التدريب على: {مسار_البيانات}")
        
        model = YOLO(النموذج_الأساسي)
        
        results = model.train(
            data=f"{مسار_البيانات}/data.yaml",
            epochs=50,
            imgsz=640,
            batch=16,
            device=0,
            patience=10,
            save=True,
            project="النماذج/الإصدارات",
            name=f"تدريب_{datetime.now().strftime('%Y%m%d')}"
        )
        
        # تسجيل نتائج التدريب
        سجل = {
            'التاريخ': datetime.now().isoformat(),
            'مسار_البيانات': مسار_البيانات,
            'النموذج_الأساسي': النموذج_الأساسي,
            'الدقة': float(results.results_dict['metrics/mAP50-95(B)']),
            'الخسارة': float(results.results_dict['train/box_loss']),
            'عدد_الصور': len(os.listdir(f"{مسار_البيانات}/images"))
        }
        
        self.سجل_التدريب.append(سجل)
        self._حفظ_سجل_التدريب()
        
        return results
    
    def _حفظ_سجل_التدريب(self):
        """حفظ سجل التدريب"""
        with open('النماذج/سجل_التدريب.json', 'w') as f:
            json.dump(self.سجل_التدريب, f, indent=2, ensure_ascii=False)
    
    async def تقييم_النموذج(self, مسار_النموذج: str, مسار_الاختبار: str) -> Dict:
        """تقييم أداء النموذج"""
        
        model = YOLO(مسار_النموذج)
        results = model.val(data=f"{مسار_الاختبار}/data.yaml")
        
        return {
            'الدقة': float(results.results_dict['metrics/mAP50-95(B)']),
            'الدقة_عتبة_50': float(results.results_dict['metrics/mAP50(B)']),
            'الاستدعاء': float(results.results_dict['metrics/precision(B)']),
            'F1': 2 * (float(results.results_dict['metrics/precision(B)']) * 
                      float(results.results_dict['metrics/recall(B)'])) /
                      (float(results.results_dict['metrics/precision(B)']) + 
                       float(results.results_dict['metrics/recall(B)']) + 1e-6)
        }

"""
مدير تحميل النماذج - يحمل النموذج مرة واحدة ويعيد استخدامه
"""

import os
import torch
import asyncio
from typing import Dict, Optional
from pathlib import Path

class مدير_النماذج:
    def __init__(self):
        self.النماذج: Dict = {}
        self.الذاكرة_المؤقتة = Path("النماذج/المخزن")
        self.الذاكرة_المؤقتة.mkdir(exist_ok=True)
        
    async def تحميل_نموذج_الكشف(self):
        """تحميل نموذج YOLO لكشف الأضرار"""
        if 'كشف_الاضرار' in self.النماذج:
            return self.النماذج['كشف_الاضرار']
        
        from ultralytics import YOLO
        
        # النموذج الرئيسي
        if not os.path.exists('النماذج/كشف_الأضرار/cardd-yolov8s.pt'):
            print("📥 تحميل cardd-yolov8s من Hugging Face...")
            model_1 = YOLO("abdullahg7/cardd-yolov8s")
            model_1.save('النماذج/كشف_الأضرار/cardd-yolov8s.pt')
        else:
            model_1 = YOLO('النماذج/كشف_الأضرار/cardd-yolov8s.pt')
        
        # النموذج الإضافي
        if not os.path.exists('النماذج/كشف_الأضرار/yolo11m.pt'):
            print("📥 تحميل YOLO11m...")
            model_2 = YOLO("ReverendBayes/YOLO11m-Car-Damage-Detector")
            model_2.save('النماذج/كشف_الأضرار/yolo11m.pt')
        else:
            model_2 = YOLO('النماذج/كشف_الأضرار/yolo11m.pt')
        
        self.النماذج['كشف_الاضرار'] = {
            'yolov8s': model_1,
            'yolo11m': model_2
        }
        
        return self.النماذج['كشف_الاضرار']
    
    async def تحميل_نموذج_التقسيم(self):
        """تحميل نموذج SAM2 للتقسيم"""
        if 'تقسيم' in self.النماذج:
            return self.النماذج['تقسيم']
        
        print("📥 تحميل SAM2...")
        # SAM2 يحتاج تحميل خاص
        self.النماذج['تقسيم'] = {
            'sam2': None,  # سيتم تحميله عند الحاجة
            'mobile_sam': None
        }
        
        return self.النماذج['تقسيم']
    
    async def تحميل_نماذج_التصنيف(self):
        """تحميل نماذج التصنيف"""
        if 'تصنيف' in self.النماذج:
            return self.النماذج['تصنيف']
        
        print("📥 تحميل نماذج التصنيف...")
        
        # نموذج مستوى الضرر
        from ultralytics import YOLO
        if not os.path.exists('النماذج/تصنيف/severity.onnx'):
            severity_model = YOLO("nezahatkorkmaz/car-damage-level-detection-yolov8")
            severity_model.export(format='onnx')
        
        self.النماذج['تصنيف'] = {
            'المستوى': 'النماذج/تصنيف/severity.onnx',
            'القرار': 'النماذج/تصنيف/repair_classifier.onnx'
        }
        
        return self.النماذج['تصنيف']

# نسخة واحدة للمشروع كله
مدير = مدير_النماذج()

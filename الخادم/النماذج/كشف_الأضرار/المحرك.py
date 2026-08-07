"""
محرك كشف الأضرار - دمج YOLOv8s + YOLO11m مع NMS
"""

import cv2
import numpy as np
from typing import List, Dict, Tuple
from dataclasses import dataclass
from ...تحميل.مدير_النماذج import مدير

@dataclass
class كائن_الضرر:
    النوع: str
    الصندوق: Tuple[float, float, float, float]  # x1, y1, x2, y2
    الثقة: float
    المساحة: float
    المركز: Tuple[float, float]
    الزاوية: float
    الصورة_المقصوصة: np.ndarray

class محرك_كشف_الأضرار:
    def __init__(self):
        self.النماذج = None
        self.العتبة = 0.5  # الحد الأدنى للثقة
        self.عتبة_iou = 0.45  # للـ NMS
    
    async def تهيئة(self):
        """تحميل النماذج مرة واحدة"""
        if self.النماذج is None:
            self.النماذج = await مدير.تحميل_نموذج_الكشف()
    
    async def كشف(self, الصورة: np.ndarray) -> List[كائن_الضرر]:
        """كشف الأضرار في الصورة"""
        await self.تهيئة()
        
        # تشغيل النموذجين
        نتائج_1 = self.النماذج['yolov8s'](الصورة, conf=self.العتبة)
        نتائج_2 = self.النماذج['yolo11m'](الصورة, conf=self.العتبة)
        
        # جمع كل الاكتشافات
        جميع_الصناديق = []
        جميع_الثقات = []
        جميع_الانواع = []
        
        for نتائج in [نتائج_1, نتائج_2]:
            for نتيجة in نتائج:
                if نتيجة.boxes is not None:
                    for box in نتيجة.boxes:
                        جميع_الصناديق.append(box.xyxy[0].cpu().numpy())
                        جميع_الثقات.append(float(box.conf[0]))
                        جميع_الانواع.append(نتيجة.names[int(box.cls[0])])
        
        if not جميع_الصناديق:
            return []
        
        # تطبيق NMS لدمج النتائج
        صناديق = np.array(جميع_الصناديق)
        ثقات = np.array(جميع_الثقات)
        
        مؤشرات_محفوظة = self._nms(صناديق, ثقات, self.عتبة_iou)
        
        # بناء كائنات الأضرار
        الاضرار = []
        for i in مؤشرات_محفوظة:
            x1, y1, x2, y2 = صناديق[i]
            
            # حساب الخصائص
            العرض = x2 - x1
            الارتفاع = y2 - y1
            المساحة = العرض * الارتفاع
            المركز_x = (x1 + x2) / 2
            المركز_y = (y1 + y2) / 2
            
            # قص جزء الضرر
            مقصوصة = الصورة[int(y1):int(y2), int(x1):int(x2)]
            
            ضرر = كائن_الضرر(
                النوع=جميع_الانواع[i],
                الصندوق=(float(x1), float(y1), float(x2), float(y2)),
                الثقة=float(ثقات[i]),
                المساحة=float(المساحة),
                المركز=(float(المركز_x), float(المركز_y)),
                الزاوية=0.0,
                الصورة_المقصوصة=مقصوصة
            )
            الاضرار.append(ضرر)
        
        return الاضرار
    
    def _nms(self, صناديق: np.ndarray, ثقات: np.ndarray, عتبة: float) -> List[int]:
        """Non-Maximum Suppression"""
        if len(صناديق) == 0:
            return []
        
        # ترتيب حسب الثقة
        ترتيب = np.argsort(ثقات)[::-1]
        
        محفوظة = []
        while len(ترتيب) > 0:
            الحالي = ترتيب[0]
            محفوظة.append(الحالي)
            
            if len(ترتيب) == 1:
                break
            
            # حساب IoU مع باقي الصناديق
            xx1 = np.maximum(صناديق[الحالي, 0], صناديق[ترتيب[1:], 0])
            yy1 = np.maximum(صناديق[الحالي, 1], صناديق[ترتيب[1:], 1])
            xx2 = np.minimum(صناديق[الحالي, 2], صناديق[ترتيب[1:], 2])
            yy2 = np.minimum(صناديق[الحالي, 3], صناديق[ترتيب[1:], 3])
            
            w = np.maximum(0, xx2 - xx1)
            h = np.maximum(0, yy2 - yy1)
            intersection = w * h
            
            area_current = (صناديق[الحالي, 2] - صناديق[الحالي, 0]) * \
                          (صناديق[الحالي, 3] - صناديق[الحالي, 1])
            area_others = (صناديق[ترتيب[1:], 2] - صناديق[ترتيب[1:], 0]) * \
                         (صناديق[ترتيب[1:], 3] - صناديق[ترتيب[1:], 1])
            
            iou = intersection / (area_current + area_others - intersection + 1e-6)
            
            ترتيب = ترتيب[1:][iou < عتبة]
        
        return [int(i) for i in محفوظة]

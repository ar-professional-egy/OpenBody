"""
مجمع البيانات - استقبال مساهمات المجتمع
"""

import os
import json
from datetime import datetime
from typing import Dict, List

class مجمع_البيانات:
    def __init__(self):
        self.مسار_المساهمات = "بيانات/مساهمات"
        self.مسار_المراجعة = "بيانات/قيد_المراجعة"
        self.مسار_المعتمدة = "بيانات/معتمدة"
        
        os.makedirs(self.مسار_المساهمات, exist_ok=True)
        os.makedirs(self.مسار_المراجعة, exist_ok=True)
        os.makedirs(self.مسار_المعتمدة, exist_ok=True)
    
    async def استقبال_مساهمة(self, 
                             الصور: List[bytes],
                             التحديدات: List[Dict],
                             المساهم: str) -> str:
        """استقبال مساهمة جديدة من المجتمع"""
        
        معرف = f"مساهمة_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{المساهم}"
        مسار = f"{self.مسار_المساهمات}/{معرف}"
        os.makedirs(مسار, exist_ok=True)
        
        # حفظ الصور
        for i, صورة in enumerate(الصور):
            with open(f"{مسار}/image_{i}.jpg", 'wb') as f:
                f.write(صورة)
        
        # حفظ التحديدات
        with open(f"{مسار}/annotations.json", 'w') as f:
            json.dump({
                'المساهم': المساهم,
                'التاريخ': datetime.now().isoformat(),
                'عدد_الصور': len(الصور),
                'التحديدات': التحديدات
            }, f, indent=2, ensure_ascii=False)
        
        return معرف
    
    async def مراجعة_المساهمات(self) -> List[str]:
        """الحصول على المساهمات التي تحتاج مراجعة"""
        return os.listdir(self.مسار_المساهمات)
    
    async def اعتماد_مساهمة(self, معرف: str):
        """اعتماد مساهمة بعد المراجعة"""
        مسار_المساهمة = f"{self.مسار_المساهمات}/{معرف}"
        مسار_المعتمدة = f"{self.مسار_المعتمدة}/{معرف}"
        
        os.rename(مسار_المساهمة, مسار_المعتمدة)
        print(f"✅ تم اعتماد المساهمة: {معرف}")
    
    async def رفض_مساهمة(self, معرف: str, سبب: str):
        """رفض مساهمة مع ذكر السبب"""
        with open(f"{self.مسار_المساهمات}/{معرف}/رفض.txt", 'w') as f:
            f.write(f"سبب الرفض: {سبب}\n")
            f.write(f"تاريخ الرفض: {datetime.now().isoformat()}")
        
        print(f"❌ تم رفض المساهمة: {معرف}")
        print(f"السبب: {سبب}")

"""
مدير إصدارات النماذج - A/B Testing ونشر آمن
"""

import os
import json
import shutil
from datetime import datetime
from typing import Dict, Optional

class مدير_الإصدارات:
    def __init__(self):
        self.مسار_الإصدارات = "النماذج/الإصدارات"
        self.مسار_الإنتاج = "النماذج/الإنتاج"
        self.ملف_الحالة = "النماذج/حالة_النشر.json"
        
        os.makedirs(self.مسار_الإصدارات, exist_ok=True)
        os.makedirs(self.مسار_الإنتاج, exist_ok=True)
    
    def حفظ_إصدار(self, مسار_النموذج: str, مقاييس: Dict) -> str:
        """حفظ إصدار جديد من النموذج"""
        
        إصدار = datetime.now().strftime("%Y%m%d_%H%M%S")
        مسار_الإصدار = f"{self.مسار_الإصدارات}/v{إصدار}.pt"
        
        shutil.copy(مسار_النموذج, مسار_الإصدار)
        
        with open(f"{self.مسار_الإصدارات}/v{إصدار}.json", 'w') as f:
            json.dump({
                'الإصدار': إصدار,
                'التاريخ': datetime.now().isoformat(),
                'المقاييس': مقاييس,
                'الحالة': 'متاح'
            }, f, indent=2, ensure_ascii=False)
        
        return إصدار
    
    def نشر_إصدار(self, إصدار: str, نسبة_الحركة: float = 1.0):
        """نشر إصدار جديد مع إمكانية التوزيع التدريجي"""
        
        مسار_النموذج = f"{self.مسار_الإصدارات}/v{إصدار}.pt"
        
        if نسبة_الحركة >= 1.0:
            # نشر كامل
            shutil.copy(مسار_النموذج, f"{self.مسار_الإنتاج}/current.pt")
            shutil.copy(مسار_النموذج, f"{self.مسار_الإنتاج}/previous.pt")
        else:
            # A/B Testing
            shutil.copy(مسار_النموذج, f"{self.مسار_الإنتاج}/candidate.pt")
        
        # تحديث حالة النشر
        with open(self.ملف_الحالة, 'w') as f:
            json.dump({
                'الإصدار_الحالي': إصدار,
                'نسبة_الحركة': نسبة_الحركة,
                'تاريخ_النشر': datetime.now().isoformat(),
                'الحالة': 'نشط' if نسبة_الحركة >= 1.0 else 'اختبار'
            }, f, indent=2, ensure_ascii=False)
    
    def تراجع(self) -> str:
        """التراجع عن آخر إصدار"""
        
        if os.path.exists(f"{self.مسار_الإنتاج}/previous.pt"):
            shutil.copy(f"{self.مسار_الإنتاج}/previous.pt", 
                       f"{self.مسار_الإنتاج}/current.pt")
            
            with open(self.ملف_الحالة, 'w') as f:
                json.dump({
                    'الإصدار_الحالي': 'previous',
                    'تاريخ_التراجع': datetime.now().isoformat(),
                    'الحالة': 'تم_التراجع'
                }, f, indent=2, ensure_ascii=False)
            
            return 'previous'
        
        return 'لا_يوجد_إصدار_سابق'
    
    def مقارنة_الإصدارات(self, إصدار_1: str, إصدار_2: str) -> Dict:
        """مقارنة بين إصدارين"""
        
        with open(f"{self.مسار_الإصدارات}/v{إصدار_1}.json") as f:
            مقاييس_1 = json.load(f)
        
        with open(f"{self.مسار_الإصدارات}/v{إصدار_2}.json") as f:
            مقاييس_2 = json.load(f)
        
        return {
            'إصدار_1': مقاييس_1,
            'إصدار_2': مقاييس_2,
            'الفرق_في_الدقة': مقاييس_2['المقاييس']['الدقة'] - مقاييس_1['المقاييس']['الدقة']
        }

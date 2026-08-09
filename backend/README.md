# OpenBody Backend (FastAPI)

هذا هو الخادم الخلفي (Backend) لمنصة OpenBody، مبني باستخدام **FastAPI**.
في هذا الإصدار (Commit 02)، تم بناء **عقد الواجهة البرمجية (API Contract)** للإصدار الأول (V1).

## المكونات الحالية
- مسار `/api/v1/analysis/upload`: لاستقبال صور السيارة وبدء التحليل.
- مسار `/api/v1/analysis/{analysis_id}`: لاسترجاع نتيجة التحليل (الآن تُرجع بيانات وهمية كـ Contract).

## كيفية التشغيل
للتشغيل محلياً:

```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## الخطوات القادمة
- ربط الذكاء الاصطناعي (YOLO/SAM) بمسار التحليل.
- ربط قاعدة البيانات (Supabase/PostgreSQL) لحفظ التقارير.
- بناء محرك حساب التكلفة الديناميكي (Cost Engine).

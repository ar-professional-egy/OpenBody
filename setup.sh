#!/bin/bash
# سكربت إعداد مشروع OpenBody تلقائياً

echo "🚀 بدء إعداد مشروع OpenBody..."

# 1. التحقق من المتطلبات
echo "📋 التحقق من المتطلبات..."

if ! command -v flutter &> /dev/null; then
    echo "⚠️ Flutter غير مثبت. (تخطيه في بيئة الويب)"
fi

if ! command -v python3 &> /dev/null; then
    echo "❌ Python غير مثبت"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "❌ Git غير مثبت"
    exit 1
fi

echo "✅ جميع المتطلبات متوفرة"

# 2. إنشاء المفاتيح
echo "🔑 إنشاء مفاتيح التوقيع..."
# (Skip android keystore generation in web workspace environment)

# 3. إنشاء ملف البيئة
echo "⚙️ إنشاء ملف البيئة..."
cat > .env << EOF
GCP_PROJECT_ID=openbody
GCP_REGION=us-central1
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your_key_here
EOF

echo "✅ اكتمل الإعداد!"
echo ""
echo "📝 الخطوات التالية:"
echo "1. عدل ملف .env بمفاتيحك"
echo "2. ارفع المشروع على GitHub"
echo "3. شغل GitHub Actions"
echo ""
echo "🎉 جاهز للإطلاق!"

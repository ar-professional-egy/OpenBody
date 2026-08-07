#!/bin/bash
# سكربت النشر التلقائي

echo "🚀 بدء النشر التلقائي..."

# 1. تحديث رقم الإصدار
VERSION="1.0.0"
BUILD_NUMBER=$(date +%s)

echo "📝 تحديث الإصدار إلى $VERSION+$BUILD_NUMBER"

# 2. بناء التطبيق
echo "🔨 بناء التطبيق..."
cd التطبيق

echo "  - بناء APK..."
flutter build apk --release --split-per-abi

echo "  - بناء AAB..."
flutter build appbundle --release

echo "  - بناء iOS..."
flutter build ios --release --no-codesign

cd ..

# 3. رفع على GitHub
echo "📤 رفع على GitHub..."
git add .
git commit -m "🚀 إصدار $VERSION - بناء تلقائي"
git tag -a "v$VERSION" -m "🚀 الإصدار $VERSION"
git push origin الرئيسي
git push origin "v$VERSION"

# 4. نشر الخادم
echo "☁️ نشر الخادم على Google Cloud..."
cd الخادم
gcloud builds submit --tag gcr.io/openbody/openbody-api
gcloud run deploy openbody-api \
  --image gcr.io/openbody/openbody-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
cd ..

echo "✅ اكتمل النشر!"
echo ""
echo "📱 التطبيق متوفر على:"
echo "  - Google Play: play.google.com/store/apps/details?id=com.openbody.app"
echo "  - Apple Store: apps.apple.com/app/openbody/id1234567890"
echo ""
echo "🌐 الخادم: https://openbody-api-xxx.run.app"
echo "📦 GitHub: github.com/OpenBody/OpenBody"

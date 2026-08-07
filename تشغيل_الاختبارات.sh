#!/bin/bash
echo "تشغيل اختبارات التطبيق..."
cd التطبيق
flutter test
cd ..

echo "تشغيل اختبارات الخادم..."
cd الخادم
pytest
cd ..
echo "اكتملت الاختبارات!"

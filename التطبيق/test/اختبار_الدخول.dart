import 'package:flutter_test/flutter_test.dart';
import 'package:openbody/main.dart';

void main() {
  testWidgets('اختبار شاشة الدخول', (WidgetTester tester) async {
    await tester.pumpWidget(const تطبيقي());
    
    // التحقق من وجود عنوان التطبيق
    expect(find.text('OpenBody'), findsOneWidget);
    
    // التحقق من وجود زر الدخول
    expect(find.text('تسجيل الدخول عبر واتساب'), findsOneWidget);
    
    // التحقق من وجود حقل الهاتف
    expect(find.byType(TextField), findsOneWidget);
  });
}

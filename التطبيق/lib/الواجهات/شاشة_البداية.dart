import 'package:flutter/material.dart';

class شاشة_البداية extends StatelessWidget {
  const شاشة_البداية({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF10B981),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // يمكن استبدال هذا بـ SVG
            const Icon(Icons.car_crash, size: 100, color: Colors.white),
            const SizedBox(height: 20),
            const Text(
              'OpenBody',
              style: TextStyle(
                fontSize: 40,
                fontWeight: FontWeight.w900,
                color: Colors.white,
                fontFamily: 'Cairo',
              ),
            ),
            const SizedBox(height: 10),
            Text(
              'ذكاء اصطناعي لتقدير أضرار السيارات',
              style: TextStyle(
                fontSize: 16,
                color: Colors.white.withOpacity(0.8),
                fontFamily: 'Cairo',
              ),
            ),
          ],
        ),
      ),
    );
  }
}

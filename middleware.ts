// middleware.ts أو src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export default clerkMiddleware(() => {
  return NextResponse.next();
});

// إضافة الإعدادات الخاصة بالمطابقة
export const config = {
  matcher: [
    /*
     * هنا، يمكنك تحديد المسارات التي تحتاج إلى التحقق من المصادقة فيها.
     * المثال التالي يتحقق من المصادقة في جميع المسارات باستثناء مسارات الملفات الثابتة.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

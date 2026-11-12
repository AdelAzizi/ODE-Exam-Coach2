import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'سامانه مرور فشرده و سوالمحور نظریه معادلات دیفرانسیل عادی | دکتر شهروزی',
  description:
    'داشبورد تعاملی آمادگی امتحانی نظریه معادلات دیفرانسیل عادی (دکتر شهروزی) با رویکرد سوالمحور، آموزش از صفر، شابلون حل امتحانی، آزمون‌های ریزتعاملی و چراغ راهنمای تسلط',
  openGraph: {
    title: 'سامانه مرور فشرده و سوالمحور نظریه معادلات دیفرانسیل عادی',
    description:
      'آمادگی امتحانی سریع و تضمینی نظریه معادلات دیفرانسیل با پوشش کامل جزوه ۳۶ صفحه‌ای دکتر شهروزی و نمونه‌سوالات میان‌ترم.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سامانه مرور فشرده و سوالمحور نظریه معادلات دیفرانسیل عادی',
    description:
      'آمادگی امتحانی سریع و تضمینی نظریه معادلات دیفرانسیل با پوشش کامل جزوه ۳۶ صفحه‌ای دکتر شهروزی و نمونه‌سوالات میان‌ترم.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={`scroll-smooth ${vazirmatn.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:text-indigo-200"
      >
        {children}
      </body>
    </html>
  );
}

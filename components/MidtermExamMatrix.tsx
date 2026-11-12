'use client';

import React from 'react';
import { MathText } from './Math';
import { MasteryStatus } from '@/lib/types';
import {
  FileText,
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Award,
  Layers,
} from 'lucide-react';

export interface MidtermQuestionItem {
  id: string;
  questionNumber: number;
  moduleId: string;
  moduleNumber: number;
  title: string;
  summaryLatex: string;
  type: 'اثباتی' | 'تحلیلی' | 'محاسباتی';
  estimatedPoints: string;
  examSheetPage: string;
  lectureNotePage: string;
}

export const MIDTERM_QUESTIONS_MAP: MidtermQuestionItem[] = [
  {
    id: 'midterm-q1',
    questionNumber: 1,
    moduleId: 'module-5',
    moduleNumber: 5,
    title: 'اثبات یکتایی جواب با لم گرونوال',
    summaryLatex: '\\text{Uniqueness via Gronwall}: \\; |y(x) - \\tilde{y}(x)| \\le 0 \\implies y \\equiv \\tilde{y}',
    type: 'اثباتی',
    estimatedPoints: '۳ نمره قطعی',
    examSheetPage: 'صفحه ۱ برگه امتحانی',
    lectureNotePage: 'صفحات ۹ و ۱۰ جزوه',
  },
  {
    id: 'midterm-q2',
    questionNumber: 2,
    moduleId: 'module-5',
    moduleNumber: 5,
    title: 'قضیه وابستگی پیوسته با جابه‌جایی نقطه شروع',
    summaryLatex: '|y(x) - \\tilde{y}(x)| \\le M|x_1 - x_0| e^{L|x - x_1|}',
    type: 'اثباتی',
    estimatedPoints: '۳ نمره قطعی',
    examSheetPage: 'صفحات ۲ و ۳ برگه امتحانی',
    lectureNotePage: 'صفحات ۱۰ و ۱۱ جزوه',
  },
  {
    id: 'midterm-q3',
    questionNumber: 3,
    moduleId: 'module-4',
    moduleNumber: 4,
    title: 'بررسی مثال نقض $y\' = \\sqrt{|y|}$ و نقض شرط لیپشیتز در مبدأ',
    summaryLatex: 'y\' = \\sqrt{|y|}, \\quad y(0)=0 \\implies y_1=0, \\; y_2 = x^2/4',
    type: 'تحلیلی',
    estimatedPoints: '۲.۵ نمره',
    examSheetPage: 'صفحه ۳ برگه امتحانی',
    lectureNotePage: 'صفحات ۲ تا ۴ جزوه',
  },
  {
    id: 'midterm-q4',
    questionNumber: 4,
    moduleId: 'module-2',
    moduleNumber: 2,
    title: 'دستگاه با مقادیر ویژه تکراری و بردار تعمیم‌یافته',
    summaryLatex: '(A-rI)^2 v = 0, \\quad X(t) = e^{rt}[v + t(A-rI)v]',
    type: 'محاسباتی',
    estimatedPoints: '۳ نمره قطعی',
    examSheetPage: 'صفحات ۴ و ۵ برگه امتحانی',
    lectureNotePage: 'صفحات ۲۰ تا ۲۲ جزوه',
  },
  {
    id: 'midterm-q5',
    questionNumber: 5,
    moduleId: 'module-3',
    moduleNumber: 3,
    title: 'محاسبه ماتریس نمایی $e^{At}$ با ماتریس اساسی',
    summaryLatex: 'e^{At} = \\psi(t)\\psi^{-1}(0), \\quad A = \\begin{pmatrix} 3 & 5 \\\\ -5 & -3 \\end{pmatrix}',
    type: 'محاسباتی',
    estimatedPoints: '۳ نمره قطعی',
    examSheetPage: 'صفحات ۵ و ۶ برگه امتحانی',
    lectureNotePage: 'صفحات ۲۴ تا ۲۷ جزوه',
  },
  {
    id: 'midterm-q6',
    questionNumber: 6,
    moduleId: 'module-3',
    moduleNumber: 3,
    title: 'اثبات خاصیت جابه‌جایی ماتریس نمایی $AB = BA \\implies e^{At}B = Be^{At}$',
    summaryLatex: 'AB = BA \\implies A^n B = B A^n \\implies e^{At}B = Be^{At}',
    type: 'اثباتی',
    estimatedPoints: '۲.۵ نمره',
    examSheetPage: 'صفحه ۶ برگه امتحانی',
    lectureNotePage: 'صفحه ۲۶ جزوه',
  },
  {
    id: 'midterm-q7',
    questionNumber: 7,
    moduleId: 'module-6',
    moduleNumber: 6,
    title: 'اثبات نامتناهی بودن صفرهای مثبت معادله $x\'\' + (t+1)x = 0$',
    summaryLatex: 'x\'\' + (t+1)x = 0 \\implies \\text{Infinite positive zeros}',
    type: 'اثباتی',
    estimatedPoints: '۳ نمره قطعی',
    examSheetPage: 'صفحات ۶ و ۷ برگه امتحانی',
    lectureNotePage: 'صفحات ۲۸ تا ۳۱ جزوه',
  },
  {
    id: 'midterm-q8',
    questionNumber: 8,
    moduleId: 'module-7',
    moduleNumber: 7,
    title: 'فرمول آبل و نگاشت یک‌به‌یک نسبت $R(x) = y_2/y_1$ به $\\mathbb{R}$',
    summaryLatex: 'R(x) = \\frac{y_2(x)}{y_1(x)} \\implies R: (x_1, x_2) \\to \\mathbb{R} \\; \\text{is bijection}',
    type: 'اثباتی',
    estimatedPoints: '۳ نمره قطعی',
    examSheetPage: 'صفحه ۷ برگه امتحانی',
    lectureNotePage: 'صفحات ۳۲ تا ۳۵ جزوه',
  },
];

interface MidtermExamMatrixProps {
  masteryMap: Record<string, MasteryStatus>;
  onSelectModule?: (moduleId: string) => void;
}

export function MidtermExamMatrix({
  masteryMap,
  onSelectModule,
}: MidtermExamMatrixProps) {
  const handleScrollToModule = (moduleId: string) => {
    if (onSelectModule) {
      onSelectModule(moduleId);
    }
    const el = document.getElementById(moduleId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getTypeBadgeClass = (type: MidtermQuestionItem['type']) => {
    switch (type) {
      case 'اثباتی':
        return 'bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800';
      case 'تحلیلی':
        return 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case 'محاسباتی':
        return 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    }
  };

  return (
    <div id="midterm-matrix" className="scroll-mt-20 my-8">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <FileText className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                نقشه تطبیقی ۸ سوال امتحان میان‌ترم دکتر شهروزی
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              ارتباط مستقیم برگه‌های دست‌نویس میان‌ترم با ماژول‌های آموزشی جهت اطمینان از پوشش ۱۰۰٪ سوالات
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-800">
              <Award className="w-3.5 h-3.5" />
              <span>مجموع بارم: ۲۰ نمره</span>
            </span>
          </div>
        </div>

        {/* Grid of 8 Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MIDTERM_QUESTIONS_MAP.map((q) => {
            const status = masteryMap[q.moduleId] || 'unattempted';
            return (
              <div
                key={q.id}
                className="group relative bg-slate-50/70 dark:bg-slate-800/40 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 border border-slate-200/70 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                        {q.questionNumber}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        سوال {q.questionNumber} میان‌ترم
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getTypeBadgeClass(
                          q.type
                        )}`}
                      >
                        {q.type}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                        {q.estimatedPoints}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                    <MathText text={q.title} />
                  </h3>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-3">
                    <span>📄 {q.examSheetPage}</span>
                    <span>•</span>
                    <span>📖 {q.lectureNotePage}</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    {status === 'mastered' ? (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        مسلط
                      </span>
                    ) : status === 'review' ? (
                      <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        نیازمند مرور
                      </span>
                    ) : status === 'weak' ? (
                      <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        نیاز به خواندن مجدد
                      </span>
                    ) : (
                      <span className="text-slate-400">شروع نشده</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleScrollToModule(q.moduleId)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    <span>مشاهده در ماژول {q.moduleNumber}</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

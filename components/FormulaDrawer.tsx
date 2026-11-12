'use client';

import React, { useState } from 'react';
import { Math, MathText } from './Math';
import { X, Search, Copy, Check, BookOpen } from 'lucide-react';

interface FormulaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuickFormula {
  title: string;
  topic: string;
  latex: string;
  note: string;
}

const QUICK_FORMULAS: QuickFormula[] = [
  {
    title: 'تکرار متوالی پیکارد',
    topic: 'فصل ۱: وجود و یکتایی',
    latex: 'y_0(x) = y_0, \\quad y_{n+1}(x) = y_0 + \\int_{x_0}^x f(t, y_n(t)) \\, dt',
    note: 'بازه وجود: h = \\min(a, b/M) که M = \\max |f| روی مستطیل R است.',
  },
  {
    title: 'شرط کافی لیپشیتز با مشتق جزئی',
    topic: 'فصل ۱: وجود و یکتایی',
    latex: '\\left| \\frac{\\partial f}{\\partial y} \\right| \\le M \\implies f \\in C_{\\text{Lip}}(D) \\quad (L = M)',
    note: 'طبق قضیه مقدار میانگین، کرانداری مشتق جزئی نسبت به y تضمین‌کننده لیپشیتز است.',
  },
  {
    title: 'لم گرونوال (Gronwall\'s Lemma)',
    topic: 'فصل ۱: گرونوال و یکتایی',
    latex: 'u(x) \\le A + B \\left| \\int_{x_0}^x u(t) \\, dt \\right| \\implies u(x) \\le A e^{B|x - x_0|}',
    note: 'برای اثبات یکتایی A=0 قرار می‌دهیم تا u(x) \\le 0 \\implies u(x) \\equiv 0 شود.',
  },
  {
    title: 'وابستگی پیوسته به شرایط اولیه',
    topic: 'فصل ۱: گرونوال',
    latex: '|\\phi(x) - \\psi(x)| \\le |y_0 - \\hat{y}_0| e^{L|x - x_0|}',
    note: 'نشان می‌دهد جواب‌ها نسبت به تغییرات کوچک در شرط اولیه پایدارند.',
  },
  {
    title: 'تفکیک مقادیر ویژه مختلط',
    topic: 'فصل ۲: دستگاه‌ها',
    latex: 'X^{(1)}(t) = e^{\\alpha t}(\\cos \\beta t \\, v^{(1)} - \\sin \\beta t \\, v^{(2)}), \\quad X^{(2)}(t) = e^{\\alpha t}(\\cos \\beta t \\, v^{(2)} + \\sin \\beta t \\, v^{(1)})',
    note: 'برای مقدار ویژه r = \\alpha + i\\beta با بردار ویژه v = v^{(1)} + i v^{(2)}.',
  },
  {
    title: 'بردار ویژه تعمیم‌یافته (نقص بردار)',
    topic: 'فصل ۲: دستگاه‌ها',
    latex: '(A - rI)^2 v^{(2)} = 0, \\quad (A - rI)v^{(2)} \\ne 0 \\implies X^{(2)}(t) = e^{rt}[I + (A - rI)t]v^{(2)}',
    note: 'برای ماتریس‌های ناقص با ریشه تکراری که بردار ویژه کم دارند.',
  },
  {
    title: 'محاسبه ماتریس نمایی e^{At}',
    topic: 'فصل ۲: ماتریس نمایی',
    latex: 'e^{At} = \\psi(t) \\psi^{-1}(0)',
    note: '\\psi(t) ماتریس اساسی جواب‌های مستقل خطی است. در مبدأ همیشه e^{A \\cdot 0} = I است.',
  },
  {
    title: 'تغییر پارامترها برای دستگاه ناهمگن',
    topic: 'فصل ۲: دستگاه ناهمگن',
    latex: 'X_p(t) = \\psi(t) \\int \\psi^{-1}(t) g(t) \\, dt',
    note: 'برای حل \\dot{X} = AX + g(t) با استفاده از جواب عمومی دستگاه همگن.',
  },
  {
    title: 'شرط خودالحاقی و عامل انتگرال‌ساز',
    topic: 'فصل ۳: اشتورم-لیوویل',
    latex: '\\dot{a}_0(t) = a_1(t) \\iff \\text{Self-Adjoint}, \\quad \\mu(t) = \\frac{1}{a_0(t)} e^{\\int \\frac{a_1}{a_0} dt}',
    note: 'معادله را به فرم اشتورم-لیوویل \\frac{d}{dt}[P(t)\\dot{x}] + Q(t)x = 0 تبدیل می‌کند.',
  },
  {
    title: 'فرمول آبل برای رونسکین',
    topic: 'فصل ۳: فرمول آبل',
    latex: 'P(t) W(f, g)(t) = k \\quad (k = \\text{const.}), \\quad W(f,g) = f\\dot{g} - g\\dot{f}',
    note: 'اگر در یک نقطه صفر شود، رونسکین در تمام بازه صفر است و جواب‌ها وابسته‌اند.',
  },
  {
    title: 'مشتق تابع نسبت در قضیه جداسازی',
    topic: 'فصل ۳: قضیه جداسازی',
    latex: 'R(x) = \\frac{y_2(x)}{y_1(x)} \\implies R\'(x) = \\frac{-W(y_1, y_2)(x)}{y_1(x)^2}',
    note: 'مشتق تغییر علامت نمی‌دهد؛ R(x) اکیداً یکنواست و ریشه‌ها یکی در میان قرار می‌گیرند.',
  },
];

export function FormulaDrawer({ isOpen, onClose }: FormulaDrawerProps) {
  const [search, setSearch] = useState('');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  const filtered = QUICK_FORMULAS.filter(
    (f) =>
      f.title.includes(search) ||
      f.topic.includes(search) ||
      f.note.includes(search)
  );

  const handleCopy = (latex: string, idx: number) => {
    navigator.clipboard.writeText(latex);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white dark:bg-slate-900 shadow-2xl border-r border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <BookOpen className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                جعبه فرمول‌های طلایی امتحان
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجو در فرمول‌ها (پیکارد، گرونوال، آبل...)"
                className="w-full pr-9 pl-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filtered.map((formula, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 rounded-xl p-3.5 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formula.title}
                  </span>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                    {formula.topic}
                  </span>
                </div>

                <div className="relative group">
                  <Math math={formula.latex} block />
                  <button
                    onClick={() => handleCopy(formula.latex, idx)}
                    className="absolute left-2 top-2 p-1 rounded bg-white dark:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="کپی فرمول LaTeX"
                  >
                    {copiedIdx === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                  <MathText text={formula.note} />
                </p>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500">
                هیچ فرمولی با این کلمه یافت نشد.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

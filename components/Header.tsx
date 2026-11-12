'use client';

import React from 'react';
import { BookOpen, Moon, Sun, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenFormulaDrawer: () => void;
  activeFilter: string;
  onSelectFilter: (filter: 'all' | 'urgent') => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({
  onOpenFormulaDrawer,
  activeFilter,
  onSelectFilter,
  isDark,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              نظریه معادلات دیفرانسیل | دکتر شهروزی
            </a>
          </div>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a
              href="#roadmap"
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              نقشه راه امتحانی
            </a>
            <a
              href="#midterm-matrix"
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 font-bold text-amber-600 dark:text-amber-400"
            >
              ۸ سوال میان‌ترم
            </a>
            <a
              href="#phase-1"
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              فاز ۱: دستگاه‌ها
            </a>
            <a
              href="#phase-2"
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              فاز ۲: پیکارد و گرونوال
            </a>
            <a
              href="#phase-3"
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              فاز ۳: اشتورم-لیوویل
            </a>
            <a
              href="#safety-net"
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              پوشش امنیتی
            </a>
          </nav>

          {/* Zone 3: 1 primary action + theme toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => onSelectFilter(activeFilter === 'urgent' ? 'all' : 'urgent')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeFilter === 'urgent'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100'
              }`}
              title="فیلتر مباحث نیاز به مرور برای شب امتحان"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeFilter === 'urgent' ? 'نمایش همه مباحث' : 'مرور شب امتحان'}</span>
            </button>

            <button
              onClick={onOpenFormulaDrawer}
              className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>جعبه فرمول‌ها</span>
            </button>

            <button
              onClick={onToggleTheme}
              aria-label="تغییر حالت شب و روز"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

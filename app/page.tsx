'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CURRICULUM_MODULES, SAFETY_NET_THEOREMS } from '@/lib/curriculum-data';
import { MasteryStatus } from '@/lib/types';
import {
  calculateMasteryStats,
  filterModulesByStatus,
  getNextRecommendedModule,
} from '@/lib/mastery';
import { Header } from '@/components/Header';
import { MasteryStats } from '@/components/MasteryStats';
import { ModuleCard } from '@/components/ModuleCard';
import { MidtermExamMatrix } from '@/components/MidtermExamMatrix';
import { SafetyNetSection } from '@/components/SafetyNetSection';
import { FormulaDrawer } from '@/components/FormulaDrawer';
import {
  Compass,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronLeft,
} from 'lucide-react';

export default function HomePage() {
  const [masteryMap, setMasteryMap] = useState<Record<string, MasteryStatus>>({});
  const [phaseFilter, setPhaseFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'urgent' | 'mastered' | 'review' | 'weak'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormulaDrawerOpen, setIsFormulaDrawerOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  // Initialize theme and load mastery from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('ode_theme');
      const prefersDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(prefersDark);

      const savedMastery = localStorage.getItem('ode_mastery_map');
      if (savedMastery) {
        setMasteryMap(JSON.parse(savedMastery));
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    setHasLoadedStorage(true);
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('ode_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('ode_theme', 'light');
      }
      return next;
    });
  };

  const handleUpdateStatus = (moduleId: string, status: MasteryStatus) => {
    setMasteryMap((prev) => {
      const next = { ...prev, [moduleId]: status };
      try {
        localStorage.setItem('ode_mastery_map', JSON.stringify(next));
      } catch (e) {
        console.warn('Could not save to localStorage', e);
      }
      return next;
    });
  };

  const moduleIds = useMemo(() => CURRICULUM_MODULES.map((m) => m.id), []);
  const stats = useMemo(
    () => calculateMasteryStats(moduleIds, masteryMap),
    [moduleIds, masteryMap]
  );

  const recommendedModule = useMemo(
    () => getNextRecommendedModule(CURRICULUM_MODULES, masteryMap),
    [masteryMap]
  );

  // Filter modules based on search, phase, and status
  const displayedModules = useMemo(() => {
    let result = CURRICULUM_MODULES;

    if (phaseFilter !== null) {
      result = result.filter((m) => m.phaseId === phaseFilter);
    }

    result = filterModulesByStatus(result, masteryMap, statusFilter);

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.subtitle.toLowerCase().includes(q) ||
          m.phaseName.toLowerCase().includes(q) ||
          m.examRef.toLowerCase().includes(q) ||
          m.intuition.summary.toLowerCase().includes(q) ||
          m.examWalkthrough.problemStatement.toLowerCase().includes(q)
      );
    }

    return result;
  }, [phaseFilter, statusFilter, searchQuery, masteryMap]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      {/* Header */}
      <Header
        onOpenFormulaDrawer={() => setIsFormulaDrawerOpen(true)}
        activeFilter={statusFilter}
        onSelectFilter={(filter) => setStatusFilter(filter)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Hero Section */}
        <section id="roadmap" className="mb-10 text-right">
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-indigo-800/60 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/80 border border-indigo-700/60 text-xs font-semibold text-indigo-200">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>برنامه فشرده آمادگی امتحان شنبه · دکتر شهروزی</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
                آموزش از پایه صفر و تسلط سوالمحور بر امتحان نظریه معادلات دیفرانسیل
              </h1>

              <p className="text-sm sm:text-base text-indigo-200 leading-relaxed">
                طراحی‌شده بر پایه تحلیل دقیق جزوه ۳۶ صفحه‌ای و ۷ صفحه نمونه‌سوالات دست‌نویس میان‌ترم.
                بدون اتلاف وقت در تعاریف تئوریک زائد، با استراتژی «نمره‌های خوش‌دست جبری اول» پیش می‌رویم.
              </p>

              {/* High-yield 3-step strategy pill indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-indigo-800/60">
                <div className="bg-indigo-950/60 border border-indigo-800/80 rounded-xl p-3 text-xs space-y-1">
                  <span className="font-bold text-amber-300 block">فاز اول: دستگاه‌های خطی</span>
                  <p className="text-indigo-200 text-[11px]">
                    ۹ نمره قطعی محاسباتی · مقادیر ویژه، بردار تعمیم‌یافته و ماتریس نمایی.
                  </p>
                </div>
                <div className="bg-indigo-950/60 border border-indigo-800/80 rounded-xl p-3 text-xs space-y-1">
                  <span className="font-bold text-emerald-300 block">فاز دوم: پیکارد و گرونوال</span>
                  <p className="text-indigo-200 text-[11px]">
                    ۶ نمره شابلونی · لم گرونوال، اثبات یکتایی و تحلیل مثال نقض کلاسیک.
                  </p>
                </div>
                <div className="bg-indigo-950/60 border border-indigo-800/80 rounded-xl p-3 text-xs space-y-1">
                  <span className="font-bold text-indigo-300 block">فاز سوم: اشتورم-لیوویل</span>
                  <p className="text-indigo-200 text-[11px]">
                    ۵ نمره کیفی · قضیه جداسازی، فرمول آبل و اثبات بی‌نهایت صفر مثبت.
                  </p>
                </div>
              </div>

              {/* Action Jump Button */}
              {recommendedModule && (
                <div className="pt-2">
                  <a
                    href={`#${recommendedModule.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>پیشنهاد بعدی برای مطالعه: ماژول {recommendedModule.number} ({recommendedModule.title})</span>
                    <ArrowLeft className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Real-time Mastery Stats & Filters */}
        <MasteryStats
          stats={stats}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          phaseFilter={phaseFilter}
          onPhaseFilterChange={setPhaseFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {/* 8 Midterm Questions Direct Matrix */}
        <MidtermExamMatrix
          masteryMap={masteryMap}
          onSelectModule={() => {
            setPhaseFilter(null);
            setStatusFilter('all');
          }}
        />

        {/* Phase Jump Anchor Markers */}
        <div className="space-y-12">
          {/* Phase 1 Section */}
          <section id="phase-1" className="scroll-mt-20">
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  فاز اول: بانک نمره تضمینی جبری (دستگاه‌ها - فصل دوم جزوه)
                </h2>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                صفحات ۱۲ تا ۲۸ جزوه
              </span>
            </div>

            {displayedModules
              .filter((m) => m.phaseId === 1)
              .map((m) => (
                <ModuleCard
                  key={m.id}
                  module={m}
                  masteryStatus={masteryMap[m.id] || 'unopened'}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
          </section>

          {/* Phase 2 Section */}
          <section id="phase-2" className="scroll-mt-20">
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  فاز دوم: اثبات‌های اساسی آنالیزی (پیکارد و گرونوال - فصل اول جزوه)
                </h2>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                صفحات ۲ تا ۱۲ جزوه
              </span>
            </div>

            {displayedModules
              .filter((m) => m.phaseId === 2)
              .map((m) => (
                <ModuleCard
                  key={m.id}
                  module={m}
                  masteryStatus={masteryMap[m.id] || 'unopened'}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
          </section>

          {/* Phase 3 Section */}
          <section id="phase-3" className="scroll-mt-20">
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  فاز سوم: قضایای کیفی و اشتورم-لیوویل (فصل سوم جزوه)
                </h2>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                صفحات ۲۸ تا ۳۶ جزوه
              </span>
            </div>

            {displayedModules
              .filter((m) => m.phaseId === 3)
              .map((m) => (
                <ModuleCard
                  key={m.id}
                  module={m}
                  masteryStatus={masteryMap[m.id] || 'unopened'}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
          </section>

          {displayedModules.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                هیچ ماژولی با شرایط فیلتر یا جستجوی فعلی یافت نشد.
              </p>
              <button
                onClick={() => {
                  setPhaseFilter(null);
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                بازنشانی همه فیلترها
              </button>
            </div>
          )}

          {/* Phase 4: Safety Net Section */}
          <SafetyNetSection theorems={SAFETY_NET_THEOREMS} />
        </div>
      </main>

      {/* Formula Cheat Sheet Slide-over Drawer */}
      <FormulaDrawer
        isOpen={isFormulaDrawerOpen}
        onClose={() => setIsFormulaDrawerOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            سامانه مطالعه سوالمحور نظریه معادلات دیفرانسیل عادی · ویژه امتحان دکتر شهروزی
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>۷ ماژول جامع</span>
            <span>·</span>
            <span>۳ قضیه امنیتی</span>
            <span>·</span>
            <span>ذخیره خودکار پیشرفت</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

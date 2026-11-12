'use client';

import React from 'react';
import { MasterySummary } from '@/lib/mastery';
import { CheckCircle2, AlertTriangle, AlertOctagon, HelpCircle, Search, Flame } from 'lucide-react';

interface MasteryStatsProps {
  stats: MasterySummary;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  phaseFilter: number | null;
  onPhaseFilterChange: (phase: number | null) => void;
  statusFilter: 'all' | 'urgent' | 'mastered' | 'review' | 'weak';
  onStatusFilterChange: (status: 'all' | 'urgent' | 'mastered' | 'review' | 'weak') => void;
}

export function MasteryStats({
  stats,
  searchQuery,
  onSearchChange,
  phaseFilter,
  onPhaseFilterChange,
  statusFilter,
  onStatusFilterChange,
}: MasteryStatsProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm mb-8 transition-colors">
      {/* Top summary row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Flame className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              داشبورد آمادگی امتحان شنبه
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            بر اساس جزوه ۳۶ صفحه‌ای دکتر شهروزی و سوالات حل‌شده میان‌ترم · تسلط گام‌به‌گام از صفر
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 shrink-0">
          <div className="text-center">
            <span className="block text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {stats.readinessPercentage}٪
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              شاخص تسلط بر امتحان
            </span>
          </div>

          <div className="w-32 sm:w-44 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(5, stats.readinessPercentage)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Counters Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
        <button
          onClick={() => onStatusFilterChange(statusFilter === 'mastered' ? 'all' : 'mastered')}
          className={`p-3 rounded-xl border text-right transition-all ${
            statusFilter === 'mastered'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700'
              : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-1">
            <span className="text-xs font-semibold">مسلط شدم</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            {stats.mastered} <span className="text-xs font-normal text-slate-500">مبحث</span>
          </span>
        </button>

        <button
          onClick={() => onStatusFilterChange(statusFilter === 'review' ? 'all' : 'review')}
          className={`p-3 rounded-xl border text-right transition-all ${
            statusFilter === 'review'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700'
              : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-1">
            <span className="text-xs font-semibold">نیاز به مرور</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            {stats.review} <span className="text-xs font-normal text-slate-500">مبحث</span>
          </span>
        </button>

        <button
          onClick={() => onStatusFilterChange(statusFilter === 'weak' ? 'all' : 'weak')}
          className={`p-3 rounded-xl border text-right transition-all ${
            statusFilter === 'weak'
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700'
              : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 mb-1">
            <span className="text-xs font-semibold">دوباره بخوان</span>
            <AlertOctagon className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            {stats.weak} <span className="text-xs font-normal text-slate-500">مبحث</span>
          </span>
        </button>

        <button
          onClick={() => onStatusFilterChange('all')}
          className={`p-3 rounded-xl border text-right transition-all ${
            statusFilter === 'all' && phaseFilter === null
              ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700'
              : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800 hover:border-indigo-300'
          }`}
        >
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-1">
            <span className="text-xs font-semibold">کل مباحث</span>
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            {stats.total} <span className="text-xs font-normal text-slate-500">ماژول</span>
          </span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        {/* Phase Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
          <button
            onClick={() => onPhaseFilterChange(null)}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              phaseFilter === null
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            همه فازها
          </button>
          <button
            onClick={() => onPhaseFilterChange(1)}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              phaseFilter === 1
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            فاز ۱: دستگاه‌ها (۹ نمره)
          </button>
          <button
            onClick={() => onPhaseFilterChange(2)}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              phaseFilter === 2
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            فاز ۲: پیکارد و گرونوال (۶ نمره)
          </button>
          <button
            onClick={() => onPhaseFilterChange(3)}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              phaseFilter === 3
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            فاز ۳: اشتورم-لیوویل (۵ نمره)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="جستجو در قضایا، سوالات..."
            className="w-full pr-9 pl-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

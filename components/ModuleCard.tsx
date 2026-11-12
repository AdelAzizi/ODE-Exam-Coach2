'use client';

import React, { useState } from 'react';
import { ModuleData, MasteryStatus } from '@/lib/types';
import { Math, MathText } from './Math';
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  BookOpen,
  HelpCircle,
  FileText,
  AlertCircle,
  Check,
} from 'lucide-react';

interface ModuleCardProps {
  module: ModuleData;
  masteryStatus: MasteryStatus;
  onUpdateStatus: (moduleId: string, status: MasteryStatus) => void;
  defaultExpanded?: boolean;
}

export function ModuleCard({
  module,
  masteryStatus,
  onUpdateStatus,
  defaultExpanded = true,
}: ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showMicroAnswer, setShowMicroAnswer] = useState(false);
  const [showTwinSolution, setShowTwinSolution] = useState(false);

  const getStatusBadge = () => {
    switch (masteryStatus) {
      case 'mastered':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>مسلط</span>
          </span>
        );
      case 'review':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>نیاز به مرور</span>
          </span>
        );
      case 'weak':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-300">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
            <span>نیاز به مطالعه</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>شروع نشده</span>
          </span>
        );
    }
  };

  return (
    <article
      id={module.id}
      className={`bg-white dark:bg-slate-900 border rounded-2xl shadow-xs transition-all overflow-hidden mb-8 ${
        masteryStatus === 'mastered'
          ? 'border-emerald-200 dark:border-emerald-900/60'
          : masteryStatus === 'review'
          ? 'border-amber-200 dark:border-amber-900/60'
          : masteryStatus === 'weak'
          ? 'border-rose-200 dark:border-rose-900/60'
          : 'border-slate-200/80 dark:border-slate-800'
      }`}
    >
      {/* Top Header Banner */}
      <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {module.phaseName}
              </span>
              <span aria-hidden="true">·</span>
              <span>ماژول {module.number} از ۷</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {module.examScoreEstimate}
              </span>
              <span aria-hidden="true">·</span>
              <span>{module.lecturePages}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-sm shrink-0">
                {module.number}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {module.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <MathText text={module.subtitle} />
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            {getStatusBadge()}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? 'بستن ماژول' : 'باز کردن ماژول'}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-8">
          {/* Layer 0: پل پیشنیاز (Prerequisite Bridge) */}
          <section className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>پل پیشنیاز (قبل از شروع این ماژول این چند نکته را به یاد بیاورید):</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pr-2">
              {module.prerequisiteBridge.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold shrink-0">←</span>
                  <span className="leading-relaxed">
                    <MathText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Layer 1: شهود و مفهوم به زبان ساده (Intuition) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">
                ۱
              </span>
              <h4>شهود و مفهوم قضیه به زبان ساده (بدون نمادهای ترسناک)</h4>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-indigo-50/30 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-100/60 dark:border-indigo-900/30">
              <MathText text={module.intuition.summary} />
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 italic">
              <strong>نکته کاربردی استاد:</strong> <MathText text={module.intuition.whyItMatters} />
            </div>

            {/* In-line Micro-Check Flash Card */}
            <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wide">
                    کارت تفکر و پاسخ سریع (تست درک شما همین حالا)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                    <MathText text={module.intuition.microCheck.question} />
                  </p>
                  {module.intuition.microCheck.hint && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      راهنمایی: <MathText text={module.intuition.microCheck.hint} />
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setShowMicroAnswer(!showMicroAnswer)}
                  className="px-3 py-1.5 text-xs font-semibold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-800/60 rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
                >
                  {showMicroAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showMicroAnswer ? 'پنهان‌سازی' : 'نمایش پاسخ و بررسی'}</span>
                </button>
              </div>

              {showMicroAnswer && (
                <div className="pt-3 border-t border-amber-200/60 dark:border-amber-900/60 space-y-2">
                  <div className="text-center py-1">
                    <Math math={module.intuition.microCheck.answerLatex} block />
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    <MathText text={module.intuition.microCheck.answerExplanation} />
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Layer 2: جعبه‌ابزار رسمی (Formal Tools) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">
                ۲
              </span>
              <h4>جعبه‌ابزار رسمی (فرمول و قضیه‌ای که در برگه باید نوشته شود)</h4>
            </div>

            <div className="space-y-3">
              {module.formalTools.map((tool, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/70 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200/60 dark:border-slate-700/60 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">
                      <MathText text={tool.title} />
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">
                      <MathText text={tool.theoremName} />
                    </span>
                  </div>

                  <Math math={tool.latex} block />

                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 pt-1">
                    {tool.conditions.map((cond, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-1.5">
                        <span className="text-slate-400 shrink-0">•</span>
                        <span>
                          <MathText text={cond} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Layer 3: شابلون حل امتحانی گام‌به‌گام (Exam Walkthrough) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">
                  ۳
                </span>
                <h4>شابلون حل امتحانی (دقیقاً نمونه سوال حل‌شده امتحان دکتر شهروزی)</h4>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                <MathText text={module.examRef} />
              </span>
            </div>

            <div className="bg-slate-900/5 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                صورت مسئله امتحانی:
              </div>
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium whitespace-pre-line mb-2">
                <MathText text={module.examWalkthrough.problemStatement} />
              </div>
              <Math math={module.examWalkthrough.problemLatex} block />
            </div>

            {/* Steps Sequence */}
            <div className="space-y-4">
              {module.examWalkthrough.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700/80 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      گام {step.stepNumber}: <MathText text={step.stepTitle} />
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <MathText text={step.explanation} />
                  </div>

                  {step.latex && <Math math={step.latex} block />}

                  {step.scoringTip && (
                    <div className="flex items-start gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-200/50 dark:border-emerald-800/40">
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>
                        <MathText text={step.scoringTip} />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Layer 4: تله‌های نمره کم‌کن استاد (Professor's Gotchas) */}
          <section className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>تله‌های نمره کم‌کن دکتر شهروزی (کجاها نمره می‌اندازد؟):</span>
            </div>

            <div className="space-y-2">
              {module.gotchas.map((gotcha, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-lg border border-rose-100 dark:border-rose-900/40 space-y-1 text-xs"
                >
                  <span className="font-bold text-rose-700 dark:text-rose-300">
                    <MathText text={gotcha.title} />
                  </span>
                  <div className="text-slate-700 dark:text-slate-300">
                    <MathText text={gotcha.warning} />
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 italic">
                    علت کسر نمره: <MathText text={gotcha.deductionReason} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Layer 5: چالش شبیه‌ساز (Twin Challenge) */}
          <section className="bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200/70 dark:border-indigo-900/40 rounded-xl p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">
                  چالش خودآزمایی پایانی (مسئله دوقلو)
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  <MathText text={module.twinChallenge.problemTitle} />
                </h4>
              </div>

              <button
                onClick={() => setShowTwinSolution(!showTwinSolution)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
              >
                {showTwinSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showTwinSolution ? 'پنهان‌سازی حل تشریحی' : 'نمایش راهحل تشریحی برای خودآزمایی'}</span>
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-3 rounded-lg border border-indigo-100 dark:border-slate-800">
              <div className="mb-2 font-medium">
                <MathText text={module.twinChallenge.problemStatement} />
              </div>
              <Math math={module.twinChallenge.problemLatex} block />
            </div>

            {showTwinSolution && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  راهنمای گام‌به‌گام و پاسخ نهایی:
                </div>

                {module.twinChallenge.solutionSteps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-white/90 dark:bg-slate-900/80 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white">
                      <MathText text={step.stepTitle} />
                    </span>
                    <div className="text-slate-700 dark:text-slate-300">
                      <MathText text={step.description} />
                    </div>
                    {step.latex && <Math math={step.latex} block />}
                  </div>
                ))}

                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">جواب نهایی: </span>
                  <Math math={module.twinChallenge.finalAnswer} />
                </div>
              </div>
            )}
          </section>

          {/* Mastery State Selector Bar */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              وضعیت تسلط شما بر این مبحث (ذخیره خودکار در مرورگر):
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateStatus(module.id, 'mastered')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  masteryStatus === 'mastered'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>🟢 مسلط شدم</span>
              </button>

              <button
                onClick={() => onUpdateStatus(module.id, 'review')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  masteryStatus === 'review'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>🟡 نیاز به مرور</span>
              </button>

              <button
                onClick={() => onUpdateStatus(module.id, 'weak')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  masteryStatus === 'weak'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100'
                }`}
              >
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>🔴 دوباره بخوان</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

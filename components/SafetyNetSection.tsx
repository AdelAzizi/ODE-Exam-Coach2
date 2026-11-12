'use client';

import React, { useState } from 'react';
import { SafetyNetTheorem } from '@/lib/types';
import { Math, MathText } from './Math';
import { ShieldCheck, ChevronDown, ChevronUp, AlertCircle, BookOpen } from 'lucide-react';

interface SafetyNetSectionProps {
  theorems: SafetyNetTheorem[];
}

export function SafetyNetSection({ theorems }: SafetyNetSectionProps) {
  const [openTheorems, setOpenTheorems] = useState<Record<string, boolean>>({
    'safety-1': true,
  });

  const toggleTheorem = (id: string) => {
    setOpenTheorems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="safety-net" className="scroll-mt-20 my-12">
      <div className="bg-gradient-to-br from-indigo-900/10 via-slate-900/5 to-slate-900/10 dark:from-indigo-950/40 dark:via-slate-900/40 dark:to-slate-900/60 border border-indigo-200/80 dark:border-indigo-900/60 rounded-3xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-600 text-white">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                فاز ۴: کادر پوشش امنیتی (Safety Net)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              قضایای تئوریک اثباتی تکمیلی جزوه که در میان‌ترم نیامده بودند اما احتمال طرح در امتحان نهایی دارند.
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full shrink-0 border border-indigo-200 dark:border-indigo-800">
            ۳ اثبات راهبردی جزوه
          </span>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {theorems.map((thm) => {
            const isOpen = !!openTheorems[thm.id];
            return (
              <div
                key={thm.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggleTheorem(thm.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-right hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        <MathText text={thm.title} />
                      </h3>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      مرجع در جزوه: {thm.pageRef}
                    </span>
                  </div>

                  <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-5">
                    {/* Statement */}
                    <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-2 mt-4">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        صورت دقیق قضیه:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        <MathText text={thm.statement} />
                      </p>
                      <Math math={thm.statementLatex} block />
                    </div>

                    {/* Proof Steps */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        مراحل اثبات دقیق خط‌به‌خط:
                      </span>

                      {thm.proofSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-slate-50/60 dark:bg-slate-800/20 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1.5 text-xs"
                        >
                          <span className="font-bold text-slate-900 dark:text-white">
                            {sIdx + 1}. <MathText text={step.stepTitle} />
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            <MathText text={step.explanation} />
                          </p>
                          {step.latex && <Math math={step.latex} block />}
                        </div>
                      ))}
                    </div>

                    {/* Exam Tip */}
                    <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
                      <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                      <span>
                        <strong>نکته نمره‌آور در برگه امتحان:</strong> <MathText text={thm.examTip} />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export type MasteryStatus = 'mastered' | 'review' | 'weak' | 'unopened';

export interface MicroCheck {
  question: string;
  hint?: string;
  answerLatex: string;
  answerExplanation: string;
}

export interface TwinChallenge {
  problemTitle: string;
  problemStatement: string;
  problemLatex: string;
  solutionSteps: {
    stepTitle: string;
    description: string;
    latex?: string;
  }[];
  finalAnswer: string;
}

export interface ModuleData {
  id: string;
  number: number;
  phaseId: number;
  phaseName: string;
  title: string;
  subtitle: string;
  examScoreEstimate: string; // e.g. "۴ تا ۵ نمره قطعی"
  lecturePages: string; // e.g. "صفحات ۱۵ تا ۲۲ جزوه"
  examRef: string; // e.g. "سوال ۴ و ۵ میان‌ترم"
  prerequisiteBridge: string[];
  intuition: {
    summary: string;
    whyItMatters: string;
    microCheck: MicroCheck;
  };
  formalTools: {
    title: string;
    theoremName: string;
    latex: string;
    conditions: string[];
  }[];
  examWalkthrough: {
    problemStatement: string;
    problemLatex: string;
    steps: {
      stepNumber: number;
      stepTitle: string;
      explanation: string;
      latex?: string;
      scoringTip?: string;
    }[];
  };
  gotchas: {
    title: string;
    warning: string;
    deductionReason: string;
  }[];
  twinChallenge: TwinChallenge;
}

export interface SafetyNetTheorem {
  id: string;
  title: string;
  pageRef: string;
  statement: string;
  statementLatex: string;
  proofSteps: {
    stepTitle: string;
    explanation: string;
    latex?: string;
  }[];
  examTip: string;
}

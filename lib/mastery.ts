import { MasteryStatus } from './types';

export interface MasterySummary {
  total: number;
  mastered: number;
  review: number;
  weak: number;
  unopened: number;
  readinessPercentage: number;
}

export function calculateMasteryStats(
  moduleIds: string[],
  masteryMap: Record<string, MasteryStatus>
): MasterySummary {
  const total = moduleIds.length;
  if (total === 0) {
    return {
      total: 0,
      mastered: 0,
      review: 0,
      weak: 0,
      unopened: 0,
      readinessPercentage: 0,
    };
  }

  let mastered = 0;
  let review = 0;
  let weak = 0;
  let unopened = 0;

  for (const id of moduleIds) {
    const status = masteryMap[id] || 'unopened';
    if (status === 'mastered') mastered++;
    else if (status === 'review') review++;
    else if (status === 'weak') weak++;
    else unopened++;
  }

  // Weight formula: mastered = 100%, review = 60%, weak = 20%, unopened = 0%
  const weightedScore = mastered * 1.0 + review * 0.6 + weak * 0.2;
  const readinessPercentage = Math.round((weightedScore / total) * 100);

  return {
    total,
    mastered,
    review,
    weak,
    unopened,
    readinessPercentage,
  };
}

export function filterModulesByStatus<T extends { id: string }>(
  items: T[],
  masteryMap: Record<string, MasteryStatus>,
  filter: 'all' | 'mastered' | 'review' | 'weak' | 'unopened' | 'urgent'
): T[] {
  if (filter === 'all') return items;
  if (filter === 'urgent') {
    // Urgent is either 'weak' or 'review' for Friday night sprint
    return items.filter((item) => {
      const s = masteryMap[item.id] || 'unopened';
      return s === 'weak' || s === 'review';
    });
  }
  return items.filter((item) => {
    const s = masteryMap[item.id] || 'unopened';
    return s === filter;
  });
}

export function getNextRecommendedModule<T extends { id: string; phaseId: number }>(
  items: T[],
  masteryMap: Record<string, MasteryStatus>
): T | null {
  // Recommend unmastered module with the lowest phase (highest yield first)
  const sorted = [...items].sort((a, b) => a.phaseId - b.phaseId);
  return (
    sorted.find((item) => {
      const s = masteryMap[item.id];
      return s !== 'mastered';
    }) || null
  );
}

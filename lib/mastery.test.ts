import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMasteryStats,
  filterModulesByStatus,
  getNextRecommendedModule,
} from './mastery';
import { MasteryStatus } from './types';

test('calculateMasteryStats handles empty input gracefully', () => {
  const stats = calculateMasteryStats([], {});
  assert.equal(stats.total, 0);
  assert.equal(stats.readinessPercentage, 0);
});

test('calculateMasteryStats calculates readiness score accurately', () => {
  const moduleIds = ['m1', 'm2', 'm3', 'm4', 'm5'];
  const masteryMap: Record<string, MasteryStatus> = {
    m1: 'mastered', // 1.0
    m2: 'mastered', // 1.0
    m3: 'review',   // 0.6
    m4: 'weak',     // 0.2
    m5: 'unopened', // 0.0
  };

  const stats = calculateMasteryStats(moduleIds, masteryMap);
  assert.equal(stats.total, 5);
  assert.equal(stats.mastered, 2);
  assert.equal(stats.review, 1);
  assert.equal(stats.weak, 1);
  assert.equal(stats.unopened, 1);

  // weighted: (2*1.0 + 1*0.6 + 1*0.2) = 2.8 / 5 = 56%
  assert.equal(stats.readinessPercentage, 56);
});

test('filterModulesByStatus filters correctly for urgent sprint', () => {
  const items = [
    { id: 'm1' },
    { id: 'm2' },
    { id: 'm3' },
    { id: 'm4' },
  ];
  const masteryMap: Record<string, MasteryStatus> = {
    m1: 'mastered',
    m2: 'review',
    m3: 'weak',
    m4: 'unopened',
  };

  const urgent = filterModulesByStatus(items, masteryMap, 'urgent');
  assert.deepEqual(urgent.map((x) => x.id), ['m2', 'm3']);

  const mastered = filterModulesByStatus(items, masteryMap, 'mastered');
  assert.deepEqual(mastered.map((x) => x.id), ['m1']);
});

test('getNextRecommendedModule picks the earliest unmastered module by phase', () => {
  const items = [
    { id: 'm4', phaseId: 2 },
    { id: 'm1', phaseId: 1 },
    { id: 'm2', phaseId: 1 },
    { id: 'm6', phaseId: 3 },
  ];
  const masteryMap: Record<string, MasteryStatus> = {
    m1: 'mastered',
  };

  const next = getNextRecommendedModule(items, masteryMap);
  assert.equal(next?.id, 'm2'); // Lowest phase, not mastered
});

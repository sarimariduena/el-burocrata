import type { GameStatistics, GameIndicators } from '@/types';
import { clamp } from './math';

export function computeIndexes(
  stats: GameStatistics,
  indicators: GameIndicators
): Pick<GameStatistics, 'transparencyIndex' | 'efficiencyIndex' | 'innovationIndex' | 'citizenSatisfactionAvg' | 'corruptionIndex'> {
  const total = stats.totalCasesResolved || 1;
  const correctRatio = stats.correctDecisions / total;
  const corruptRatio = stats.corruptDecisions / total;

  return {
    transparencyIndex: clamp(Math.round(indicators.legality * 0.5 + correctRatio * 50), 0, 100),
    efficiencyIndex: clamp(Math.round(indicators.budget * 0.4 + correctRatio * 60), 0, 100),
    innovationIndex: clamp(Math.round(indicators.institutionalReputation * 0.6 + correctRatio * 40), 0, 100),
    citizenSatisfactionAvg: clamp(
      Math.round((stats.citizenSatisfactionAvg * (total - 1) + indicators.citizenSatisfaction) / total),
      0,
      100
    ),
    corruptionIndex: clamp(Math.round(corruptRatio * 100), 0, 100),
  };
}

export function computeFinalScore(stats: GameStatistics): number {
  return Math.round(
    stats.transparencyIndex * 0.25 +
    stats.efficiencyIndex * 0.2 +
    stats.innovationIndex * 0.15 +
    stats.citizenSatisfactionAvg * 0.3 +
    (100 - stats.corruptionIndex) * 0.1
  );
}

export function getLetterGrade(score: number): string {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

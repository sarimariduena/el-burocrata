import type { RandomEvent, Difficulty } from '@/types';
import randomEventsData from '@/data/events/random-events.json';
import { randomItem, randomInt } from '@/utils/math';

const ALL_EVENTS = randomEventsData as RandomEvent[];

// Probabilidad base de evento por día (0–100)
const BASE_EVENT_CHANCE: Record<Difficulty, number> = {
  easy: 5,
  normal: 12,
  hard: 20,
  expert: 30,
};

export function shouldTriggerEvent(difficulty: Difficulty, dayOfYear: number): boolean {
  const chance = BASE_EVENT_CHANCE[difficulty];
  // Los eventos críticos son más probables en momentos de estrés (fin de año)
  const stressBonus = dayOfYear > 300 ? 5 : 0;
  return randomInt(1, 100) <= chance + stressBonus;
}

export function pickRandomEvent(
  difficulty: Difficulty,
  recentEventIds: string[] = []
): RandomEvent | null {
  const pool = ALL_EVENTS.filter((e) => !recentEventIds.includes(e.id));
  if (pool.length === 0) return randomItem(ALL_EVENTS);

  // En dificultad alta, priorizar eventos severos
  if (difficulty === 'hard' || difficulty === 'expert') {
    const severe = pool.filter((e) => e.severity === 'high' || e.severity === 'critical');
    if (severe.length > 0 && randomInt(1, 100) <= 60) {
      return randomItem(severe);
    }
  }

  return randomItem(pool);
}

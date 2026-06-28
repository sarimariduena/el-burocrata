'use client';

import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { HUD } from '@/components/hud/HUD';
import { CaseCard } from './CaseCard';
import { FeedbackModal } from '@/components/modals/FeedbackModal';
import { EventModal } from '@/components/modals/EventModal';
import { GameOverScreen } from './GameOverScreen';
import { pickNextCase } from '@/services/caseEngine';
import { shouldTriggerEvent, pickRandomEvent } from '@/services/eventEngine';
import type { GameCase } from '@/types';
import npcProfiles from '@/data/npcs/profiles.json';

export function GameBoard() {
  const save = useGameStore((s) => s.save);
  const showFeedback = useGameStore((s) => s.showFeedback);
  const currentEvent = useGameStore((s) => s.currentEvent);
  const triggerRandomEvent = useGameStore((s) => s.triggerRandomEvent);
  const advanceDay = useGameStore((s) => s.advanceDay);

  const [currentCase, setCurrentCase] = useState<GameCase | null>(null);
  const [lastCategory, setLastCategory] = useState<string | undefined>();
  const [recentEventIds, setRecentEventIds] = useState<string[]>([]);
  const [casesSinceLastEvent, setCasesSinceLastEvent] = useState(0);

  const loadNextCase = useCallback(() => {
    if (!save) return;

    // Eventos solo aparecen después de al menos 2 casos resueltos y cada 3 casos mínimo
    const canTriggerEvent = save.statistics.totalCasesResolved >= 2 && casesSinceLastEvent >= 2;

    if (canTriggerEvent && shouldTriggerEvent(save.difficulty, save.currentDay) && !currentEvent) {
      const event = pickRandomEvent(save.difficulty, recentEventIds);
      if (event) {
        triggerRandomEvent(event);
        setRecentEventIds((prev) => [...prev.slice(-4), event.id]);
        setCasesSinceLastEvent(0);
        return;
      }
    }

    const nextCase = pickNextCase(
      save.currentRank,
      save.resolvedCaseIds,
      save.difficulty,
      lastCategory as never
    );

    if (nextCase) {
      setCurrentCase(nextCase);
      setLastCategory(nextCase.category);
      setCasesSinceLastEvent((prev) => prev + 1);
      advanceDay();
    }
  }, [save, currentEvent, recentEventIds, triggerRandomEvent, lastCategory, advanceDay, casesSinceLastEvent]);

  useEffect(() => {
    if (save && !currentCase && !showFeedback && !currentEvent && !save.isGameOver) {
      loadNextCase();
    }
  }, [save, currentCase, showFeedback, currentEvent, loadNextCase]);

  useEffect(() => {
    if (!showFeedback && !currentEvent && save && !save.isGameOver) {
      setCurrentCase(null);
    }
  }, [showFeedback, currentEvent, save]);

  if (!save) return null;
  if (save.isGameOver) return <GameOverScreen />;

  const npc = currentCase
    ? npcProfiles.find((n) => n.id === currentCase.npcId)
    : null;

  return (
    <div className="flex min-h-screen">
      <HUD />

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto">
        {/* Banner de año y día */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl mb-4 flex items-center justify-between"
        >
          <div className="text-xs px-3 py-1 rounded-full" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            📅 AÑO {save.currentYear}/4 — DÍA {save.currentDay}
          </div>
          <div className="text-xs px-3 py-1 rounded-full" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            ✅ {save.statistics.totalCasesResolved} casos resueltos
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {currentCase && !showFeedback && !currentEvent ? (
            <CaseCard
              key={currentCase.id}
              gameCase={currentCase}
              npcName={npc?.name ?? 'Ciudadano'}
              npcAvatar={npc?.avatar ?? '👤'}
              npcPersonality={npc?.personality ?? ''}
            />
          ) : !showFeedback && !currentEvent ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-5xl mb-4"
              >
                📋
              </motion.div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Cargando expediente...
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <FeedbackModal />
      <EventModal />
    </div>
  );
}

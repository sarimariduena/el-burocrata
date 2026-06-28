'use client';

import { useEffect, useRef, useState } from 'react';
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
  const save              = useGameStore((s) => s.save);
  const showFeedback      = useGameStore((s) => s.showFeedback);
  const currentEvent      = useGameStore((s) => s.currentEvent);
  const triggerRandomEvent = useGameStore((s) => s.triggerRandomEvent);
  const advanceDay        = useGameStore((s) => s.advanceDay);

  const [currentCase, setCurrentCase]           = useState<GameCase | null>(null);
  const lastCategoryRef                          = useRef<string | undefined>(undefined);
  const recentEventIdsRef                        = useRef<string[]>([]);
  const casesSinceLastEventRef                   = useRef(0);

  // Track previous values to detect transitions
  const prevShowFeedback = useRef(false);
  const prevEvent        = useRef<unknown>(null);

  useEffect(() => {
    if (!save || save.isGameOver) return;

    const feedbackDismissed = prevShowFeedback.current && !showFeedback;
    const eventResolved     = prevEvent.current && !currentEvent;
    prevShowFeedback.current = showFeedback;
    prevEvent.current        = currentEvent;

    // Clear case when feedback/event is done
    if (feedbackDismissed || eventResolved) {
      setCurrentCase(null);
      return;
    }

    // Load a case when there's nothing showing
    if (!currentCase && !showFeedback && !currentEvent) {
      const canTriggerEvent =
        save.statistics.totalCasesResolved >= 2 &&
        casesSinceLastEventRef.current >= 2;

      if (canTriggerEvent && shouldTriggerEvent(save.difficulty, save.currentDay)) {
        const event = pickRandomEvent(save.difficulty, recentEventIdsRef.current);
        if (event) {
          triggerRandomEvent(event);
          recentEventIdsRef.current = [...recentEventIdsRef.current.slice(-4), event.id];
          casesSinceLastEventRef.current = 0;
          return;
        }
      }

      const nextCase = pickNextCase(
        save.currentRank,
        save.resolvedCaseIds,
        save.difficulty,
        lastCategoryRef.current as never
      );

      if (nextCase) {
        setCurrentCase(nextCase);
        lastCategoryRef.current = nextCase.category;
        casesSinceLastEventRef.current += 1;
        advanceDay();
      }
    }
  }, [save, showFeedback, currentEvent, currentCase, triggerRandomEvent, advanceDay]);

  if (!save) return null;
  if (save.isGameOver) return <GameOverScreen />;

  const npc = currentCase
    ? npcProfiles.find((n) => n.id === currentCase.npcId)
    : null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <HUD />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 32px', overflowY: 'auto' }}>
        {/* Banner año/día */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: 640, marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}
        >
          <div style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: '#1e293b', border: '1px solid #334155', color: '#94a3b8' }}>
            📅 AÑO {save.currentYear}/4 — DÍA {save.currentDay}
          </div>
          <div style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: '#1e293b', border: '1px solid #334155', color: '#94a3b8' }}>
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
              style={{ textAlign: 'center' }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ fontSize: 48, marginBottom: 16 }}
              >
                📋
              </motion.div>
              <div style={{ fontSize: 14, color: '#94a3b8' }}>Cargando expediente...</div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <FeedbackModal />
      <EventModal />
    </div>
  );
}

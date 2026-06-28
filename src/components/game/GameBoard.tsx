'use client';

import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
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

  const loadNextCase = useCallback(() => {
    if (!save) return;

    // Verificar si disparar evento
    if (shouldTriggerEvent(save.difficulty, save.currentDay) && !currentEvent) {
      const event = pickRandomEvent(save.difficulty, recentEventIds);
      if (event) {
        triggerRandomEvent(event);
        setRecentEventIds((prev) => [...prev.slice(-4), event.id]);
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
      advanceDay();
    }
  }, [save, currentEvent, recentEventIds, triggerRandomEvent, lastCategory, advanceDay]);

  // Cargar caso inicial
  useEffect(() => {
    if (save && !currentCase && !showFeedback && !currentEvent && !save.isGameOver) {
      loadNextCase();
    }
  }, [save, currentCase, showFeedback, currentEvent, loadNextCase]);

  // Cargar siguiente caso después del feedback
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
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Panel lateral HUD */}
      <HUD />

      {/* Área central del juego */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentCase && !showFeedback && !currentEvent ? (
            <CaseCard
              key={currentCase.id}
              gameCase={currentCase}
              npcName={npc?.name ?? 'Ciudadano'}
              npcAvatar={npc?.avatar ?? '👤'}
            />
          ) : !showFeedback && !currentEvent ? (
            <div
              key="loading"
              className="text-center"
              style={{ color: 'var(--text-secondary)' }}
            >
              <div className="text-4xl mb-4">📋</div>
              <div className="text-sm blink">Cargando expediente...</div>
            </div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Modales */}
      <FeedbackModal />
      <EventModal />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { IndicatorBar } from '@/components/ui/IndicatorBar';
import { RANKS } from '@/data/levels/ranks';

export function HUD() {
  const save = useGameStore((s) => s.save);
  const resetGame = useGameStore((s) => s.resetGame);
  const [confirmAbandon, setConfirmAbandon] = useState(false);

  if (!save) return null;

  const { indicators, currentRank, xp, currentDay, currentYear, playerName } = save;
  const rankInfo = RANKS.find((r) => r.id === currentRank);
  const nextRank = RANKS[RANKS.findIndex((r) => r.id === currentRank) + 1];
  const xpProgress = nextRank
    ? ((xp - (rankInfo?.minXP ?? 0)) / (nextRank.minXP - (rankInfo?.minXP ?? 0))) * 100
    : 100;

  return (
    <div
      className="w-72 flex-shrink-0 flex flex-col gap-3 p-4"
      style={{
        background: 'var(--bg-secondary)',
        borderRight: '2px solid var(--border)',
        minHeight: '100vh',
      }}
    >
      {/* Perfil del funcionario */}
      <div
        className="p-3 rounded"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          FUNCIONARIO
        </div>
        <div className="font-bold text-sm mt-1" style={{ color: 'var(--text-primary)' }}>
          {playerName}
        </div>
        <div className="text-xs mt-0.5" style={{ color: 'var(--accent-blue)' }}>
          {rankInfo?.label}
        </div>
      </div>

      {/* Año y día */}
      <div className="flex gap-2">
        <div
          className="flex-1 text-center p-2 rounded"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>AÑO</div>
          <div className="font-bold text-lg">{currentYear}/4</div>
        </div>
        <div
          className="flex-1 text-center p-2 rounded"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>DÍA</div>
          <div className="font-bold text-lg">{currentDay}</div>
        </div>
      </div>

      {/* XP */}
      <div>
        <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
          <span>EXP</span>
          <span>{xp} XP</span>
        </div>
        <div className="indicator-bar">
          <div
            className="indicator-fill"
            style={{ width: `${Math.min(xpProgress, 100)}%`, background: 'var(--accent-purple)' }}
          />
        </div>
        {nextRank && (
          <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            → {nextRank.label} ({nextRank.minXP} XP)
          </div>
        )}
      </div>

      {/* Indicadores */}
      <div
        className="p-3 rounded flex flex-col gap-3"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <div className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
          INDICADORES
        </div>
        <IndicatorBar label="Satisfacción" value={indicators.citizenSatisfaction} icon="😊" colorClass="bg-green-500" />
        <IndicatorBar label="Presupuesto" value={indicators.budget} icon="💰" colorClass="bg-blue-500" />
        <IndicatorBar label="Legalidad" value={indicators.legality} icon="⚖️" colorClass="bg-purple-500" />
        <IndicatorBar label="Reputación" value={indicators.institutionalReputation} icon="🏛️" colorClass="bg-yellow-500" />
      </div>

      {/* Estadísticas rápidas */}
      <div
        className="p-3 rounded"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <div className="text-xs font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>
          GESTIÓN
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div style={{ color: 'var(--text-secondary)' }}>Casos</div>
            <div className="font-bold">{save.statistics.totalCasesResolved}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)' }}>Aciertos</div>
            <div className="font-bold" style={{ color: 'var(--accent-green)' }}>
              {save.statistics.correctDecisions}
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)' }}>Transparencia</div>
            <div className="font-bold" style={{ color: 'var(--accent-blue)' }}>
              {save.statistics.transparencyIndex}%
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)' }}>Corrupción</div>
            <div
              className="font-bold"
              style={{ color: save.statistics.corruptionIndex > 10 ? 'var(--accent-red)' : 'var(--accent-green)' }}
            >
              {save.statistics.corruptionIndex}%
            </div>
          </div>
        </div>
      </div>

      {/* Botón abandonar partida */}
      <div className="mt-auto">
        {!confirmAbandon ? (
          <button
            onClick={() => setConfirmAbandon(true)}
            className="w-full py-2 rounded text-xs cursor-pointer"
            style={{
              background: 'transparent',
              border: '1px solid var(--accent-red)',
              color: 'var(--accent-red)',
            }}
          >
            🚪 ABANDONAR PARTIDA
          </button>
        ) : (
          <div
            className="p-3 rounded text-xs"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--accent-red)' }}
          >
            <div className="mb-2" style={{ color: 'var(--text-primary)' }}>
              ¿Segura que quieres abandonar?
            </div>
            <div className="flex gap-2">
              <button
                onClick={resetGame}
                className="flex-1 py-1.5 rounded cursor-pointer font-bold"
                style={{ background: 'var(--accent-red)', color: '#fff' }}
              >
                SÍ, SALIR
              </button>
              <button
                onClick={() => setConfirmAbandon(false)}
                className="flex-1 py-1.5 rounded cursor-pointer"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
              >
                CANCELAR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

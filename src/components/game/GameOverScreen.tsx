'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { computeFinalScore, getLetterGrade } from '@/utils/statistics';

export function GameOverScreen() {
  const save = useGameStore((s) => s.save);
  const resetGame = useGameStore((s) => s.resetGame);

  if (!save || !save.isGameOver) return null;

  const score = computeFinalScore(save.statistics);
  const grade = getLetterGrade(score);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(0,0,0,0.92)' }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        className="max-w-lg w-full mx-4 p-8 rounded text-center"
        style={{
          background: 'var(--bg-card)',
          border: '2px solid var(--accent-red)',
        }}
      >
        <div className="text-5xl mb-4">🏛️</div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--accent-red)' }}>
          FIN DE LA GESTIÓN
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          {save.gameOverReason}
        </p>

        {/* Calificación */}
        <div
          className="p-4 rounded mb-6"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
        >
          <div className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
            EVALUACIÓN FINAL DE GESTIÓN
          </div>
          <div
            className="text-6xl font-bold mb-1"
            style={{ color: grade === 'F' ? 'var(--accent-red)' : grade.startsWith('A') ? 'var(--accent-green)' : 'var(--accent-yellow)' }}
          >
            {grade}
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Puntaje: {score}/100
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
          {[
            { label: 'Casos Resueltos', value: save.statistics.totalCasesResolved },
            { label: 'Decisiones Correctas', value: save.statistics.correctDecisions, color: 'var(--accent-green)' },
            { label: 'Transparencia', value: `${save.statistics.transparencyIndex}%`, color: 'var(--accent-blue)' },
            { label: 'Índice de Corrupción', value: `${save.statistics.corruptionIndex}%`, color: save.statistics.corruptionIndex > 10 ? 'var(--accent-red)' : 'var(--accent-green)' },
            { label: 'Años Completados', value: `${save.currentYear - 1}/4` },
            { label: 'Satisfacción Prom.', value: `${save.statistics.citizenSatisfactionAvg}%` },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="p-3 rounded"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}
            >
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</div>
              <div className="font-bold" style={{ color: color ?? 'var(--text-primary)' }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full py-3 rounded font-bold text-sm cursor-pointer"
          style={{ background: 'var(--accent-blue)', color: '#fff' }}
        >
          NUEVA PARTIDA
        </button>
      </motion.div>
    </motion.div>
  );
}

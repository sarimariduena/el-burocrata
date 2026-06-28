'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { computeFinalScore, getLetterGrade } from '@/utils/statistics';

export function GameOverScreen() {
  const save      = useGameStore((s) => s.save);
  const resetGame = useGameStore((s) => s.resetGame);
  if (!save || !save.isGameOver) return null;

  const victory = save.isVictory === true;
  const score   = computeFinalScore(save.statistics);
  const grade   = getLetterGrade(score);
  const color   = victory ? '#22c55e' : '#ef4444';

  const gradeColor = grade.startsWith('A') ? '#22c55e' : grade === 'B' ? '#3b82f6' : grade === 'C' ? '#eab308' : grade === 'D' ? '#f97316' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16, overflowY: 'auto' }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        style={{ maxWidth: 500, width: '100%', borderRadius: 24, overflow: 'hidden', border: `2px solid ${color}`, boxShadow: `0 0 60px ${color}44` }}
      >
        {/* Header */}
        <div style={{ padding: '32px 24px 24px', background: `linear-gradient(160deg, ${color}22, #1e293b)`, textAlign: 'center', borderBottom: `1px solid ${color}33` }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            {(victory ? ['🏆','🎉','⭐','🥇'] : ['😔','📋','🏛️']).map((e, i) => (
              <motion.span key={i} style={{ fontSize: 36 }} animate={{ y: [0, -10, 0] }} transition={{ delay: i * 0.15, repeat: Infinity, duration: 1.4 }}>
                {e}
              </motion.span>
            ))}
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color, marginBottom: 8 }}>
            {victory ? '¡MANDATO COMPLETADO!' : 'FIN DE LA GESTIÓN'}
          </h1>
          <p style={{ fontSize: 14, color: '#94a3b8' }}>{save.gameOverReason}</p>
        </div>

        <div style={{ padding: 24, background: '#1e293b' }}>
          {/* Calificación */}
          <div style={{ textAlign: 'center', padding: '20px', background: '#0f172a', borderRadius: 16, border: '1px solid #334155', marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: '#64748b', letterSpacing: 2, marginBottom: 8 }}>EVALUACIÓN FINAL</div>
            <div style={{ fontSize: 80, fontWeight: 900, color: gradeColor, lineHeight: 1 }}>{grade}</div>
            <div style={{ fontSize: 14, color: '#64748b', marginTop: 8 }}>Puntaje: {score}/100</div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'Casos Resueltos',      value: save.statistics.totalCasesResolved,        color: '#fff' },
              { label: 'Decisiones Correctas', value: save.statistics.correctDecisions,           color: '#22c55e' },
              { label: 'Transparencia',        value: `${save.statistics.transparencyIndex}%`,    color: '#06b6d4' },
              { label: 'Corrupción',           value: `${save.statistics.corruptionIndex}%`,      color: save.statistics.corruptionIndex > 10 ? '#ef4444' : '#22c55e' },
              { label: 'Años Completados',     value: `${Math.min(save.currentYear - 1, 4)}/4`,   color: '#a855f7' },
              { label: 'Satisfacción Prom.',   value: `${save.statistics.citizenSatisfactionAvg}%`, color: '#f97316' },
            ].map(s => (
              <div key={s.label} style={{ padding: 12, background: '#0f172a', borderRadius: 10, border: '1px solid #334155' }}>
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontWeight: 800, fontSize: 18, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          {victory && (
            <div style={{ padding: 16, background: 'rgba(34,197,94,0.1)', borderRadius: 12, border: '1px solid #22c55e44', textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>👨‍💼👩‍💼👮👩‍🏫👨‍⚕️</div>
              <div style={{ fontSize: 13, color: '#22c55e' }}>Los ciudadanos ecuatorianos agradecen tu gestión honesta y transparente</div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={resetGame}
            style={{ width: '100%', padding: 16, borderRadius: 14, border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 15, background: victory ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #6366f1, #3b82f6)', color: '#fff' }}
          >
            NUEVA PARTIDA
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

function Bar({ value, color, label, emoji }: { value: number; color: string; label: string; emoji: string }) {
  const isLow = value <= 25;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11 }}>
        <span style={{ color: '#94a3b8', fontWeight: 600 }}>{emoji} {label}</span>
        <span style={{ color: isLow ? '#ef4444' : color, fontWeight: 800 }}>{value}%</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: '#334155', overflow: 'hidden' }}>
        <motion.div
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: 4, background: isLow ? '#ef4444' : color, boxShadow: isLow ? '0 0 8px #ef444488' : `0 0 6px ${color}88` }}
        />
      </div>
    </div>
  );
}

export function HUD() {
  const save = useGameStore((s) => s.save);
  const resetGame = useGameStore((s) => s.resetGame);
  const [confirm, setConfirm] = useState(false);
  if (!save) return null;

  const { indicators, statistics, currentYear, currentDay, xp, currentRank, playerName } = save;

  return (
    <div style={{ width: 240, minHeight: '100vh', background: '#1e293b', borderRight: '1px solid #334155', padding: 16, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>

      {/* Jugador */}
      <div style={{ marginBottom: 20, padding: 12, background: '#0f172a', borderRadius: 12, border: '1px solid #334155' }}>
        <div style={{ fontSize: 11, color: '#64748b', marginBottom: 2 }}>FUNCIONARIO/A</div>
        <div style={{ fontWeight: 800, fontSize: 15, color: '#fff', marginBottom: 4 }}>{playerName}</div>
        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: 'rgba(99,102,241,0.2)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)', fontWeight: 700 }}>
          🏅 {currentRank.toUpperCase()}
        </span>
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 10, color: '#64748b', marginBottom: 3 }}>XP: {xp}</div>
          <div style={{ height: 4, borderRadius: 2, background: '#334155' }}>
            <div style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #6366f1, #3b82f6)', width: `${Math.min((xp % 500) / 500 * 100, 100)}%`, transition: 'width 0.6s ease' }} />
          </div>
        </div>
      </div>

      {/* Año y día */}
      <div style={{ marginBottom: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{ padding: 10, background: '#0f172a', borderRadius: 10, border: '1px solid #334155', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#64748b' }}>AÑO</div>
          <div style={{ fontWeight: 900, fontSize: 22, color: '#818cf8' }}>{currentYear}</div>
          <div style={{ fontSize: 10, color: '#64748b' }}>de 4</div>
        </div>
        <div style={{ padding: 10, background: '#0f172a', borderRadius: 10, border: '1px solid #334155', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#64748b' }}>DÍA</div>
          <div style={{ fontWeight: 900, fontSize: 22, color: '#06b6d4' }}>{currentDay}</div>
          <div style={{ fontSize: 10, color: '#64748b' }}>de 365</div>
        </div>
      </div>

      {/* Indicadores */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: 1, marginBottom: 10 }}>INDICADORES</div>
        <Bar value={indicators.citizenSatisfaction}      color="#22c55e"  label="Ciudadanía"   emoji="👥" />
        <Bar value={indicators.budget}                   color="#3b82f6"  label="Presupuesto"  emoji="💰" />
        <Bar value={indicators.legality}                 color="#a855f7"  label="Legalidad"    emoji="⚖️" />
        <Bar value={indicators.institutionalReputation}  color="#f97316"  label="Reputación"   emoji="🏛️" />
      </div>

      {/* Estadísticas */}
      <div style={{ marginBottom: 'auto', padding: 12, background: '#0f172a', borderRadius: 10, border: '1px solid #334155' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: 1, marginBottom: 8 }}>ESTADÍSTICAS</div>
        {[
          { label: 'Casos resueltos',    value: statistics.totalCasesResolved, color: '#fff' },
          { label: 'Decisiones correctas', value: statistics.correctDecisions, color: '#22c55e' },
          { label: 'Transparencia',      value: `${statistics.transparencyIndex}%`,  color: '#06b6d4' },
          { label: 'Corrupción',         value: `${statistics.corruptionIndex}%`,    color: statistics.corruptionIndex > 10 ? '#ef4444' : '#22c55e' },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
            <span style={{ color: '#64748b' }}>{s.label}</span>
            <span style={{ fontWeight: 700, color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Abandonar */}
      <div style={{ marginTop: 16 }}>
        {!confirm ? (
          <button onClick={() => setConfirm(true)} style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #334155', background: 'transparent', color: '#64748b', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            🚪 Abandonar partida
          </button>
        ) : (
          <div style={{ padding: 12, background: '#0f172a', borderRadius: 10, border: '1px solid #ef4444' }}>
            <p style={{ fontSize: 12, color: '#fca5a5', marginBottom: 10, textAlign: 'center' }}>¿Seguro que quieres salir?</p>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={resetGame} style={{ flex: 1, padding: 8, borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>Sí</button>
              <button onClick={() => setConfirm(false)} style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #334155', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

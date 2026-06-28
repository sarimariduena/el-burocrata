'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

const SEV = {
  low:      { color: '#22c55e',  icon: '📌', label: 'AVISO' },
  medium:   { color: '#eab308',  icon: '⚠️',  label: 'ALERTA' },
  high:     { color: '#f97316',  icon: '🚨',  label: 'URGENTE' },
  critical: { color: '#ef4444',  icon: '💥',  label: '¡CRISIS!' },
};

export function EventModal() {
  const currentEvent = useGameStore((s) => s.currentEvent);
  const resolveEvent = useGameStore((s) => s.resolveEvent);

  return (
    <AnimatePresence>
      {currentEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}
        >
          <motion.div
            initial={{ scale: 0.85, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            style={{ maxWidth: 520, width: '100%', borderRadius: 20, overflow: 'hidden', border: `2px solid ${SEV[currentEvent.severity].color}`, boxShadow: `0 0 50px ${SEV[currentEvent.severity].color}55` }}
          >
            {/* Header */}
            <div style={{ padding: '20px 24px', background: `linear-gradient(135deg, ${SEV[currentEvent.severity].color}22, ${SEV[currentEvent.severity].color}05)`, borderBottom: `1px solid ${SEV[currentEvent.severity].color}33`, display: 'flex', alignItems: 'center', gap: 14 }}>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ fontSize: 40 }}>
                {SEV[currentEvent.severity].icon}
              </motion.div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: SEV[currentEvent.severity].color }}>
                  EVENTO ESPECIAL — {SEV[currentEvent.severity].label}
                </div>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#fff', marginTop: 2 }}>{currentEvent.title}</div>
              </div>
            </div>

            <div style={{ padding: 24, background: '#1e293b' }}>
              <p style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.75, marginBottom: 20 }}>{currentEvent.description}</p>

              {currentEvent.options && currentEvent.options.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: 1, marginBottom: 4 }}>⚖️ ¿CÓMO RESPONDES?</div>
                  {currentEvent.options.map((opt, i) => (
                    <motion.button
                      key={opt.id}
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => resolveEvent(currentEvent.id, opt.id)}
                      style={{ textAlign: 'left', padding: '12px 14px', borderRadius: 10, border: `2px solid ${SEV[currentEvent.severity].color}44`, borderLeft: `4px solid ${SEV[currentEvent.severity].color}`, background: '#0f172a', color: '#e2e8f0', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 10 }}
                    >
                      <span style={{ width: 26, height: 26, borderRadius: '50%', background: SEV[currentEvent.severity].color, color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, flexShrink: 0 }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt.text}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => resolveEvent(currentEvent.id)}
                  style={{ width: '100%', padding: 14, borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 14, background: SEV[currentEvent.severity].color, color: '#0f172a' }}
                >
                  ENTENDIDO — CONTINUAR
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

const SEVERITY_COLORS = {
  low: '#4ade80',
  medium: '#fbbf24',
  high: '#f87171',
  critical: '#ff4444',
};

const SEVERITY_ICONS = {
  low: '📌',
  medium: '⚠️',
  high: '🚨',
  critical: '💥',
};

const SEVERITY_LABELS = {
  low: 'AVISO',
  medium: 'ALERTA MEDIA',
  high: 'ALERTA ALTA',
  critical: '¡CRISIS!',
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
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            initial={{ scale: 0.85, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="max-w-lg w-full mx-4 rounded-xl overflow-hidden"
            style={{
              border: `2px solid ${SEVERITY_COLORS[currentEvent.severity]}`,
              boxShadow: `0 0 60px ${SEVERITY_COLORS[currentEvent.severity]}44`,
            }}
          >
            {/* Header dramático */}
            <div
              className="p-5"
              style={{
                background: `linear-gradient(135deg, ${SEVERITY_COLORS[currentEvent.severity]}33, ${SEVERITY_COLORS[currentEvent.severity]}08)`,
                borderBottom: `1px solid ${SEVERITY_COLORS[currentEvent.severity]}33`,
              }}
            >
              <div className="flex items-center gap-3 mb-1">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-3xl"
                >
                  {SEVERITY_ICONS[currentEvent.severity]}
                </motion.div>
                <div>
                  <div
                    className="text-xs font-bold tracking-widest"
                    style={{ color: SEVERITY_COLORS[currentEvent.severity] }}
                  >
                    EVENTO ESPECIAL — {SEVERITY_LABELS[currentEvent.severity]}
                  </div>
                  <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                    {currentEvent.title}
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-5" style={{ background: 'var(--bg-card)' }}>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-primary)', lineHeight: 1.75 }}>
                {currentEvent.description}
              </p>

              {currentEvent.options && currentEvent.options.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-bold mb-1 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <span>⚖️</span> ¿CÓMO RESPONDES?
                  </div>
                  {currentEvent.options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => resolveEvent(currentEvent.id, option.id)}
                      className="text-left p-4 rounded-lg text-sm cursor-pointer"
                      style={{
                        background: 'var(--bg-secondary)',
                        border: `1px solid var(--border)`,
                        borderLeft: `3px solid ${SEVERITY_COLORS[currentEvent.severity]}`,
                        color: 'var(--text-primary)',
                      }}
                    >
                      <span
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3"
                        style={{ background: SEVERITY_COLORS[currentEvent.severity], color: '#0a0c14' }}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option.text}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => resolveEvent(currentEvent.id)}
                  className="w-full py-3 rounded-lg font-bold text-sm cursor-pointer"
                  style={{
                    background: SEVERITY_COLORS[currentEvent.severity],
                    color: '#0a0c14',
                  }}
                >
                  ENTENDIDO — CONTINUAR GESTIÓN
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

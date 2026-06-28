'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

const SEVERITY_COLORS = {
  low: 'var(--accent-green)',
  medium: 'var(--accent-yellow)',
  high: 'var(--accent-red)',
  critical: '#ff4444',
};

const SEVERITY_ICONS = {
  low: '📌',
  medium: '⚠️',
  high: '🚨',
  critical: '🔴',
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
          style={{ background: 'rgba(0,0,0,0.8)' }}
        >
          <motion.div
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="max-w-lg w-full mx-4 p-6 rounded"
            style={{
              background: 'var(--bg-card)',
              border: `2px solid ${SEVERITY_COLORS[currentEvent.severity]}`,
            }}
          >
            {/* Cabecera */}
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">{SEVERITY_ICONS[currentEvent.severity]}</span>
              <div>
                <div className="text-xs font-bold" style={{ color: SEVERITY_COLORS[currentEvent.severity] }}>
                  EVENTO — {currentEvent.severity.toUpperCase()}
                </div>
                <h2 className="font-bold text-base">{currentEvent.title}</h2>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed mb-4 mt-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {currentEvent.description}
            </p>

            {/* Opciones del evento (si las tiene) */}
            {currentEvent.options && currentEvent.options.length > 0 ? (
              <div className="flex flex-col gap-2 mb-4">
                <div className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
                  ¿CÓMO RESPONDES?
                </div>
                {currentEvent.options.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={() => resolveEvent(currentEvent.id, option.id)}
                    className="text-left p-3 rounded text-sm cursor-pointer transition-colors"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = SEVERITY_COLORS[currentEvent.severity];
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                    }}
                  >
                    <span className="font-bold mr-2" style={{ color: 'var(--accent-blue)' }}>
                      {String.fromCharCode(65 + index)})
                    </span>
                    {option.text}
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={() => resolveEvent(currentEvent.id)}
                className="w-full py-3 rounded font-bold text-sm cursor-pointer mb-2"
                style={{
                  background: SEVERITY_COLORS[currentEvent.severity],
                  color: '#0f1117',
                }}
              >
                ENTENDIDO — CONTINUAR
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

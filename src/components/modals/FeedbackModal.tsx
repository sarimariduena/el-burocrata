'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

export function FeedbackModal() {
  const showFeedback = useGameStore((s) => s.showFeedback);
  const lastFeedback = useGameStore((s) => s.lastFeedback);
  const lastChoiceCorrect = useGameStore((s) => s.lastChoiceCorrect);
  const dismissFeedback = useGameStore((s) => s.dismissFeedback);

  return (
    <AnimatePresence>
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={dismissFeedback}
        >
          <motion.div
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="max-w-lg w-full mx-4 p-6 rounded"
            style={{
              background: 'var(--bg-card)',
              border: `2px solid ${lastChoiceCorrect ? 'var(--accent-green)' : 'var(--accent-red)'}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Resultado */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{lastChoiceCorrect ? '✅' : '❌'}</span>
              <div>
                <div
                  className="font-bold text-base"
                  style={{ color: lastChoiceCorrect ? 'var(--accent-green)' : 'var(--accent-red)' }}
                >
                  {lastChoiceCorrect ? 'DECISIÓN CORRECTA' : 'DECISIÓN INCORRECTA'}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  RETROALIMENTACIÓN EDUCATIVA
                </div>
              </div>
            </div>

            {/* Explicación */}
            <div
              className="p-4 rounded text-sm leading-relaxed mb-4"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
            >
              {lastFeedback}
            </div>

            {/* Botón continuar */}
            <button
              onClick={dismissFeedback}
              className="w-full py-3 rounded font-bold text-sm transition-colors cursor-pointer"
              style={{
                background: lastChoiceCorrect ? 'var(--accent-green)' : 'var(--accent-red)',
                color: '#0f1117',
              }}
            >
              CONTINUAR →
            </button>

            <div className="text-xs text-center mt-2" style={{ color: 'var(--text-secondary)' }}>
              También puedes hacer clic fuera para continuar
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

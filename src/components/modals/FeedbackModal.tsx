'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

export function FeedbackModal() {
  const showFeedback = useGameStore((s) => s.showFeedback);
  const lastFeedback = useGameStore((s) => s.lastFeedback);
  const lastChoiceCorrect = useGameStore((s) => s.lastChoiceCorrect);
  const dismissFeedback = useGameStore((s) => s.dismissFeedback);

  const color = lastChoiceCorrect ? 'var(--accent-green)' : 'var(--accent-red)';
  const emoji = lastChoiceCorrect ? '✅' : '❌';
  const title = lastChoiceCorrect ? '¡DECISIÓN CORRECTA!' : 'DECISIÓN INCORRECTA';
  const subtitle = lastChoiceCorrect ? 'Bien hecho, funcionario.' : 'Hay una mejor alternativa.';

  return (
    <AnimatePresence>
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
          onClick={dismissFeedback}
        >
          <motion.div
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="max-w-lg w-full mx-4 rounded-xl overflow-hidden"
            style={{ border: `2px solid ${color}`, boxShadow: `0 0 40px ${color}33` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header con color */}
            <div
              className="p-5 flex items-center gap-4"
              style={{ background: `linear-gradient(135deg, ${color}22, ${color}08)` }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
                className="text-5xl"
              >
                {emoji}
              </motion.div>
              <div>
                <div className="font-bold text-lg" style={{ color }}>
                  {title}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {subtitle}
                </div>
              </div>
            </div>

            {/* Cuerpo */}
            <div className="p-5" style={{ background: 'var(--bg-card)' }}>
              {/* Explicación educativa */}
              <div className="text-xs font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <span>📚</span> LECCIÓN EDUCATIVA
              </div>
              <div
                className="p-4 rounded-lg text-sm leading-relaxed mb-5"
                style={{
                  background: 'var(--bg-secondary)',
                  border: `1px solid ${color}33`,
                  color: 'var(--text-primary)',
                  lineHeight: 1.75,
                }}
              >
                {lastFeedback}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={dismissFeedback}
                className="w-full py-3 rounded-lg font-bold text-sm cursor-pointer"
                style={{ background: color, color: '#0a0c14' }}
              >
                CONTINUAR GESTIÓN →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

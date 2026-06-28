'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import type { GameCase } from '@/types';

const CATEGORY_LABELS: Record<string, string> = {
  'transparency': '🔍 Transparencia',
  'accountability': '📊 Rendición de Cuentas',
  'open-data': '📂 Datos Abiertos',
  'digital-government': '💻 Gobierno Digital',
  'e-government': '🖥️ Gobierno Electrónico',
  'interoperability': '🔗 Interoperabilidad',
  'electronic-signature': '✍️ Firma Electrónica',
  'cybersecurity': '🛡️ Ciberseguridad',
  'data-protection': '🔒 Protección de Datos',
  'corruption': '⚖️ Anticorrupción',
  'public-ethics': '🏛️ Ética Pública',
  'ai-government': '🤖 IA Gubernamental',
  'citizen-participation': '👥 Participación Ciudadana',
  'ethics-corruption': '⚖️ Ética Pública',
};

const CATEGORY_COLORS: Record<string, string> = {
  'transparency': '#22d3ee',
  'accountability': '#a78bfa',
  'open-data': '#4ade80',
  'digital-government': '#5c9cf5',
  'e-government': '#5c9cf5',
  'cybersecurity': '#f87171',
  'data-protection': '#fb923c',
  'corruption': '#fbbf24',
  'public-ethics': '#fbbf24',
  'ethics-corruption': '#fbbf24',
  'ai-government': '#a78bfa',
  'citizen-participation': '#4ade80',
};

const OPTION_COLORS = ['#5c9cf5', '#4ade80', '#fbbf24', '#f87171'];
const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

const DIFFICULTY_BADGES: Record<string, { label: string; color: string }> = {
  easy: { label: '⭐ FÁCIL', color: '#4ade80' },
  normal: { label: '⭐⭐ NORMAL', color: '#fbbf24' },
  hard: { label: '⭐⭐⭐ DIFÍCIL', color: '#f87171' },
  expert: { label: '⭐⭐⭐⭐ EXPERTO', color: '#a78bfa' },
};

interface CaseCardProps {
  gameCase: GameCase;
  npcName: string;
  npcAvatar: string;
  npcPersonality?: string;
}

export function CaseCard({ gameCase, npcName, npcAvatar, npcPersonality }: CaseCardProps) {
  const resolveCase = useGameStore((s) => s.resolveCase);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const catColor = CATEGORY_COLORS[gameCase.category] ?? '#5c9cf5';
  const diff = DIFFICULTY_BADGES[gameCase.difficulty] ?? DIFFICULTY_BADGES.normal;

  function handleSelect(optionId: string) {
    if (selectedOption) return;
    setSelectedOption(optionId);
    setTimeout(() => resolveCase(gameCase.id, optionId), 300);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-2xl mx-auto flex flex-col gap-0"
    >
      {/* ── NPC HABLANDO ── */}
      <div className="flex items-end gap-3 mb-2 px-1">
        {/* Avatar grande */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <div
            className="flex items-center justify-center rounded-full relative"
            style={{
              width: 80,
              height: 80,
              fontSize: 44,
              background: `radial-gradient(circle at 40% 35%, ${catColor}33, var(--bg-secondary) 70%)`,
              border: `3px solid ${catColor}`,
              boxShadow: `0 0 25px ${catColor}55, 0 4px 12px rgba(0,0,0,0.4)`,
            }}
          >
            {npcAvatar}
            {/* Indicador de que habla */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              style={{ background: catColor, color: '#0a0c14', fontSize: 9 }}
            >
              !
            </motion.div>
          </div>
          <div className="text-center mt-1 text-xs font-bold truncate max-w-[80px]" style={{ color: catColor }}>
            {npcName.split(' ')[0]}
          </div>
        </motion.div>

        {/* Burbuja de diálogo */}
        <div className="flex-1 relative">
          {/* Triángulo de la burbuja */}
          <div
            className="absolute left-0 bottom-4 w-0 h-0"
            style={{
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderRight: `10px solid ${catColor}`,
              transform: 'translateX(-10px)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl p-4"
            style={{
              background: `linear-gradient(135deg, ${catColor}18, var(--bg-card))`,
              border: `2px solid ${catColor}55`,
              boxShadow: `0 4px 20px ${catColor}22`,
            }}
          >
            {/* Nombre + categoría + dificultad */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold" style={{ color: catColor }}>
                {CATEGORY_LABELS[gameCase.category] ?? gameCase.category}
              </span>
              <span className="text-xs font-bold" style={{ color: diff.color }}>
                {diff.label}
              </span>
            </div>

            <h2 className="font-bold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
              {gameCase.title}
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', lineHeight: 1.75 }}>
              {gameCase.description}
            </p>

            {npcPersonality && (
              <p className="text-xs mt-2 italic" style={{ color: 'var(--text-secondary)' }}>
                💭 {npcPersonality}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-3">
              {gameCase.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${catColor}22`, color: catColor, border: `1px solid ${catColor}44` }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── PANEL DE DECISIÓN ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
      >
        <div
          className="px-4 py-2 flex items-center gap-2"
          style={{ background: `${catColor}18`, borderBottom: `1px solid ${catColor}33` }}
        >
          <span className="text-base">⚖️</span>
          <span className="text-xs font-bold tracking-widest" style={{ color: catColor }}>
            ¿CUÁL ES TU DECISIÓN?
          </span>
        </div>

        <div className="p-3 flex flex-col gap-2">
          <AnimatePresence>
            {gameCase.options.map((option, index) => {
              const optColor = OPTION_COLORS[index] ?? catColor;
              const isHovered = hoveredOption === index;
              const isSelected = selectedOption === option.id;

              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  whileHover={{ x: 8, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(option.id)}
                  onHoverStart={() => setHoveredOption(index)}
                  onHoverEnd={() => setHoveredOption(null)}
                  disabled={!!selectedOption}
                  className="text-left rounded-lg text-sm cursor-pointer relative overflow-hidden"
                  style={{
                    padding: '12px 16px 12px 12px',
                    background: isSelected
                      ? `${optColor}22`
                      : isHovered
                      ? `${optColor}15`
                      : 'var(--bg-secondary)',
                    border: `2px solid ${isSelected || isHovered ? optColor : 'var(--border)'}`,
                    color: 'var(--text-primary)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {/* Barra izquierda de color */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ background: optColor }}
                  />
                  <div className="flex items-center gap-3 pl-2">
                    <span
                      className="inline-flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0"
                      style={{
                        width: 28,
                        height: 28,
                        background: isSelected || isHovered ? optColor : `${optColor}33`,
                        color: isSelected || isHovered ? '#0a0c14' : optColor,
                        border: `1.5px solid ${optColor}`,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {OPTION_LETTERS[index]}
                    </span>
                    <span style={{ lineHeight: 1.5 }}>{option.text}</span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

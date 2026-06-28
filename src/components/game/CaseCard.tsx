'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import type { GameCase } from '@/types';

const CATEGORY_LABELS: Record<string, string> = {
  'transparency': 'Transparencia',
  'accountability': 'Rendición de Cuentas',
  'open-data': 'Datos Abiertos',
  'digital-government': 'Gobierno Digital',
  'e-government': 'Gobierno Electrónico',
  'interoperability': 'Interoperabilidad',
  'electronic-signature': 'Firma Electrónica',
  'cybersecurity': 'Ciberseguridad',
  'data-protection': 'Protección de Datos',
  'corruption': 'Anticorrupción',
  'public-ethics': 'Ética Pública',
  'ai-government': 'IA Gubernamental',
  'citizen-participation': 'Participación Ciudadana',
  'document-management': 'Gestión Documental',
  'state-modernization': 'Modernización',
  'public-contracting': 'Contratación Pública',
  'budget-management': 'Gestión Presupuestaria',
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
  'ai-government': '#a78bfa',
  'citizen-participation': '#4ade80',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#4ade80',
  normal: '#fbbf24',
  hard: '#f87171',
  expert: '#a78bfa',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: '★ FÁCIL',
  normal: '★★ NORMAL',
  hard: '★★★ DIFÍCIL',
  expert: '★★★★ EXPERTO',
};

interface CaseCardProps {
  gameCase: GameCase;
  npcName: string;
  npcAvatar: string;
}

export function CaseCard({ gameCase, npcName, npcAvatar }: CaseCardProps) {
  const resolveCase = useGameStore((s) => s.resolveCase);
  const catColor = CATEGORY_COLORS[gameCase.category] ?? 'var(--accent-blue)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col gap-4 w-full max-w-2xl mx-auto"
    >
      {/* Cabecera del NPC */}
      <div
        className="p-5 rounded-lg relative overflow-hidden"
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${catColor}44`,
          boxShadow: `0 0 30px ${catColor}11`,
        }}
      >
        {/* Franja de color superior */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, ${catColor}, transparent)` }}
        />

        <div className="flex items-center gap-4 mb-4">
          {/* Avatar NPC mejorado */}
          <div className="relative flex-shrink-0">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 72,
                height: 72,
                fontSize: 38,
                background: `radial-gradient(circle, ${catColor}22, var(--bg-secondary))`,
                border: `2px solid ${catColor}`,
                boxShadow: `0 0 20px ${catColor}44`,
              }}
            >
              {npcAvatar}
            </div>
            {/* Badge de categoría */}
            <div
              className="absolute -bottom-1 -right-1 text-xs px-1.5 py-0.5 rounded font-bold"
              style={{ background: catColor, color: '#0a0c14', fontSize: 9 }}
            >
              {CATEGORY_LABELS[gameCase.category]?.split(' ')[0]?.toUpperCase() ?? 'CASO'}
            </div>
          </div>

          <div className="flex-1">
            <div className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>
              SOLICITUD DE:
            </div>
            <div className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
              {npcName}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: `${catColor}22`, color: catColor, border: `1px solid ${catColor}44` }}
              >
                {CATEGORY_LABELS[gameCase.category] ?? gameCase.category}
              </span>
              <span
                className="text-xs font-bold"
                style={{ color: DIFFICULTY_COLORS[gameCase.difficulty] }}
              >
                {DIFFICULTY_LABELS[gameCase.difficulty]}
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-base font-bold mb-3" style={{ color: catColor }}>
          📋 {gameCase.title}
        </h2>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>
          {gameCase.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {gameCase.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Panel de decisión */}
      <div
        className="p-5 rounded-lg"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
          <div className="text-xs font-bold px-3" style={{ color: 'var(--text-secondary)' }}>
            ⚖️ ¿QUÉ DECIDES?
          </div>
          <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
        </div>

        <div className="flex flex-col gap-2">
          {gameCase.options.map((option, index) => (
            <motion.button
              key={option.id}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => resolveCase(gameCase.id, option.id)}
              className="option-btn text-left p-4 rounded-lg text-sm cursor-pointer"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderLeft: '3px solid transparent',
                color: 'var(--text-primary)',
              }}
            >
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 flex-shrink-0"
                style={{ background: 'var(--accent-blue)', color: '#0a0c14' }}
              >
                {String.fromCharCode(65 + index)}
              </span>
              {option.text}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

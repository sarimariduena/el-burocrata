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

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#4ade80',
  normal: '#fbbf24',
  hard: '#f87171',
  expert: '#a78bfa',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'FÁCIL',
  normal: 'NORMAL',
  hard: 'DIFÍCIL',
  expert: 'EXPERTO',
};

interface CaseCardProps {
  gameCase: GameCase;
  npcName: string;
  npcAvatar: string;
}

export function CaseCard({ gameCase, npcName, npcAvatar }: CaseCardProps) {
  const resolveCase = useGameStore((s) => s.resolveCase);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 max-w-2xl mx-auto"
    >
      {/* Cabecera del caso */}
      <div
        className="p-4 rounded"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Avatar del NPC */}
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width: 56,
                height: 56,
                fontSize: 32,
                background: 'var(--bg-secondary)',
                border: '2px solid var(--accent-blue)',
                boxShadow: '0 0 10px rgba(96,165,250,0.3)',
              }}
            >
              {npcAvatar}
            </div>
            <div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                SOLICITUD DE
              </div>
              <div className="font-bold">{npcName}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
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

        <h2
          className="text-base font-bold mb-2"
          style={{ color: 'var(--accent-blue)' }}
        >
          {gameCase.title}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
          {gameCase.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {gameCase.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded"
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

      {/* Opciones de decisión */}
      <div
        className="p-4 rounded"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <div className="text-xs font-bold mb-3" style={{ color: 'var(--text-secondary)' }}>
          ¿QUÉ DECIDES?
        </div>
        <div className="flex flex-col gap-2">
          {gameCase.options.map((option, index) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => resolveCase(gameCase.id, option.id)}
              className="text-left p-3 rounded text-sm transition-colors cursor-pointer"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-blue)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              }}
            >
              <span
                className="font-bold mr-2"
                style={{ color: 'var(--accent-blue)' }}
              >
                {String.fromCharCode(65 + index)})
              </span>
              {option.text}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import type { Difficulty } from '@/types';

const DIFFICULTIES: { id: Difficulty; label: string; desc: string; color: string }[] = [
  { id: 'easy', label: 'FÁCIL', desc: 'Eventos escasos, casos simples. Ideal para aprender.', color: '#4ade80' },
  { id: 'normal', label: 'NORMAL', desc: 'Equilibrio entre aprendizaje y desafío.', color: '#fbbf24' },
  { id: 'hard', label: 'DIFÍCIL', desc: 'Más eventos, presiones políticas, presupuesto ajustado.', color: '#f87171' },
  { id: 'expert', label: 'EXPERTO', desc: 'Conflictos entre legalidad, eficiencia y política. Sin red.', color: '#a78bfa' },
];

export function MainMenu() {
  const initGame = useGameStore((s) => s.initGame);
  const [step, setStep] = useState<'menu' | 'setup'>('menu');
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [mode, setMode] = useState<'campaign' | 'infinite'>('campaign');

  function handleStart() {
    if (!playerName.trim()) return;
    initGame(playerName.trim(), difficulty, mode);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">

      {step === 'menu' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          {/* Logo / Título */}
          <div className="text-6xl mb-4">🏛️</div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--accent-blue)' }}>
            EL BURÓCRATA
          </h1>
          <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            VIDEOJUEGO EDUCATIVO DE GOBIERNO ELECTRÓNICO
          </p>
          <p className="text-xs mb-8" style={{ color: 'var(--text-secondary)' }}>
            Aprende Administración Pública, Transparencia, IA Gubernamental<br />
            y Ética Pública tomando decisiones reales
          </p>

          {/* Botones */}
          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep('setup')}
              className="py-4 rounded font-bold text-sm cursor-pointer"
              style={{ background: 'var(--accent-blue)', color: '#fff' }}
            >
              ▶ NUEVA PARTIDA
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const store = useGameStore.getState();
                store.loadGame();
                // Si hay partida guardada, el store ya la cargó automáticamente
              }}
              className="py-3 rounded font-bold text-sm cursor-pointer"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            >
              📂 CONTINUAR PARTIDA
            </motion.button>
          </div>

          {/* Info normativa */}
          <div className="mt-12 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <div className="mb-1">Basado en normativa ecuatoriana vigente:</div>
            <div>LOTAIP · LOPDP · COIP · LOSEP · COA · Constitución 2008</div>
          </div>
        </motion.div>
      )}

      {step === 'setup' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-lg"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 24,
          }}
        >
          <button
            onClick={() => setStep('menu')}
            className="text-xs mb-4 cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
          >
            ← VOLVER
          </button>

          <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--accent-blue)' }}>
            CONFIGURAR PARTIDA
          </h2>

          {/* Nombre */}
          <div className="mb-4">
            <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>
              NOMBRE DEL FUNCIONARIO
            </label>
            <input
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Ej: Gabriela Moreno"
              maxLength={40}
              className="w-full p-2 rounded text-sm"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
          </div>

          {/* Modo de juego */}
          <div className="mb-4">
            <label className="text-xs block mb-2" style={{ color: 'var(--text-secondary)' }}>
              MODO DE JUEGO
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'campaign' as const, label: '📅 CAMPAÑA', desc: '4 años de gobierno con evaluación final' },
                { id: 'infinite' as const, label: '♾️ INFINITO', desc: 'Casos generados sin fin' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className="p-3 rounded text-left cursor-pointer text-xs"
                  style={{
                    background: mode === m.id ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                    border: `1px solid ${mode === m.id ? 'var(--accent-blue)' : 'var(--border)'}`,
                    color: mode === m.id ? '#fff' : 'var(--text-primary)',
                  }}
                >
                  <div className="font-bold">{m.label}</div>
                  <div className="mt-0.5" style={{ color: mode === m.id ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)' }}>
                    {m.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dificultad */}
          <div className="mb-6">
            <label className="text-xs block mb-2" style={{ color: 'var(--text-secondary)' }}>
              DIFICULTAD
            </label>
            <div className="flex flex-col gap-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDifficulty(d.id)}
                  className="p-2 rounded text-left cursor-pointer text-xs flex items-center gap-3"
                  style={{
                    background: difficulty === d.id ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                    border: `1px solid ${difficulty === d.id ? d.color : 'var(--border)'}`,
                    color: 'var(--text-primary)',
                  }}
                >
                  <span className="font-bold" style={{ color: d.color, minWidth: 64 }}>
                    {d.label}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{d.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={!playerName.trim()}
            className="w-full py-3 rounded font-bold text-sm cursor-pointer disabled:opacity-40"
            style={{ background: 'var(--accent-green)', color: '#0f1117' }}
          >
            INICIAR GESTIÓN →
          </button>
        </motion.div>
      )}
    </div>
  );
}

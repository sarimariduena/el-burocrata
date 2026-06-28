'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import type { Difficulty } from '@/types';

const DIFFICULTIES: { id: Difficulty; label: string; desc: string; color: string; emoji: string }[] = [
  { id: 'easy', label: 'FÁCIL', desc: 'Ideal para aprender. Eventos escasos.', color: '#4ade80', emoji: '😊' },
  { id: 'normal', label: 'NORMAL', desc: 'Equilibrio entre aprendizaje y desafío.', color: '#fbbf24', emoji: '🎯' },
  { id: 'hard', label: 'DIFÍCIL', desc: 'Más eventos y presiones políticas.', color: '#f87171', emoji: '🔥' },
  { id: 'expert', label: 'EXPERTO', desc: 'Conflictos legales sin red de seguridad.', color: '#a78bfa', emoji: '💀' },
];

const CHARACTERS = [
  { emoji: '👨‍💼', name: 'Carlos', role: 'Ciudadano', color: '#5c9cf5' },
  { emoji: '👩‍⚕️', name: 'Dra. Carmen', role: 'Médica', color: '#4ade80' },
  { emoji: '🕵️', name: 'Dr. Crespo', role: 'Auditor', color: '#fbbf24' },
  { emoji: '👩‍💼', name: 'Ministra', role: 'Autoridad', color: '#a78bfa' },
  { emoji: '📰', name: 'Ana', role: 'Periodista', color: '#f87171' },
];

export function MainMenu() {
  const initGame = useGameStore((s) => s.initGame);
  const save = useGameStore((s) => s.save);
  const [step, setStep] = useState<'menu' | 'setup'>('menu');
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [mode, setMode] = useState<'campaign' | 'infinite'>('campaign');

  function handleStart() {
    if (!playerName.trim()) return;
    initGame(playerName.trim(), difficulty, mode);
  }

  function handleContinue() {
    const store = useGameStore.getState();
    store.loadGame();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Fondo animado con personajes flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {CHARACTERS.map((char, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10 select-none"
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.06, 0.12, 0.06],
            }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeInOut',
            }}
          >
            {char.emoji}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-md w-full relative z-10"
          >
            {/* Logo animado */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-7xl mb-2"
            >
              🏛️
            </motion.div>

            <h1
              className="text-5xl font-bold mb-1 tracking-widest"
              style={{
                color: 'var(--accent-blue)',
                textShadow: '0 0 30px rgba(92,156,245,0.5)',
              }}
            >
              EL BURÓCRATA
            </h1>
            <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>
              VIDEOJUEGO EDUCATIVO DE GOBIERNO ELECTRÓNICO
            </p>
            <p className="text-xs mb-8" style={{ color: 'var(--text-secondary)' }}>
              Aprende normativa ecuatoriana tomando decisiones reales como funcionario público
            </p>

            {/* Personajes del juego */}
            <div className="flex justify-center gap-3 mb-8">
              {CHARACTERS.map((char, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-1"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                >
                  <div
                    className="flex items-center justify-center rounded-full text-2xl"
                    style={{
                      width: 48,
                      height: 48,
                      background: `radial-gradient(circle, ${char.color}33, var(--bg-card))`,
                      border: `2px solid ${char.color}88`,
                      boxShadow: `0 0 12px ${char.color}44`,
                    }}
                  >
                    {char.emoji}
                  </div>
                  <span className="text-xs" style={{ color: char.color }}>
                    {char.role}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(92,156,245,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep('setup')}
                className="py-4 rounded-xl font-bold text-sm cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #5c9cf5, #3b82f6)',
                  color: '#fff',
                  border: '1px solid rgba(92,156,245,0.4)',
                }}
              >
                ▶ NUEVA PARTIDA
              </motion.button>

              {save && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleContinue}
                  className="py-3 rounded-xl font-bold text-sm cursor-pointer"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--accent-green)',
                  }}
                >
                  📂 CONTINUAR PARTIDA — {save.playerName}
                </motion.button>
              )}
            </div>

            {/* Normativa */}
            <div className="mt-10 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <div className="mb-1">📚 Basado en normativa ecuatoriana vigente:</div>
              <div className="flex flex-wrap justify-center gap-2">
                {['LOTAIP', 'LOPDP', 'COIP', 'LOSEP', 'COA', 'Constitución 2008'].map((law) => (
                  <span
                    key={law}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  >
                    {law}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="w-full max-w-md relative z-10"
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
            >
              {/* Header */}
              <div
                className="p-4 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(92,156,245,0.15), transparent)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <button
                  onClick={() => setStep('menu')}
                  className="text-xs cursor-pointer px-2 py-1 rounded"
                  style={{ color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}
                >
                  ← VOLVER
                </button>
                <h2 className="font-bold" style={{ color: 'var(--accent-blue)' }}>
                  🎮 CONFIGURAR PARTIDA
                </h2>
              </div>

              <div className="p-5 flex flex-col gap-5">
                {/* Nombre */}
                <div>
                  <label className="text-xs font-bold block mb-2" style={{ color: 'var(--text-secondary)' }}>
                    👤 NOMBRE DEL FUNCIONARIO
                  </label>
                  <input
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Ej: Gabriela Moreno"
                    maxLength={40}
                    autoFocus
                    className="w-full p-3 rounded-lg text-sm"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: `1px solid ${playerName ? 'var(--accent-blue)' : 'var(--border)'}`,
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Modo */}
                <div>
                  <label className="text-xs font-bold block mb-2" style={{ color: 'var(--text-secondary)' }}>
                    🎯 MODO DE JUEGO
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'campaign' as const, label: '📅 CAMPAÑA', desc: '4 años de mandato con evaluación final' },
                      { id: 'infinite' as const, label: '♾️ INFINITO', desc: 'Sin límite de casos' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMode(m.id)}
                        className="p-3 rounded-lg text-left cursor-pointer text-xs"
                        style={{
                          background: mode === m.id ? 'rgba(92,156,245,0.15)' : 'var(--bg-secondary)',
                          border: `2px solid ${mode === m.id ? 'var(--accent-blue)' : 'var(--border)'}`,
                          color: mode === m.id ? 'var(--accent-blue)' : 'var(--text-primary)',
                        }}
                      >
                        <div className="font-bold mb-0.5">{m.label}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: 10 }}>{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dificultad */}
                <div>
                  <label className="text-xs font-bold block mb-2" style={{ color: 'var(--text-secondary)' }}>
                    ⚡ DIFICULTAD
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {DIFFICULTIES.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setDifficulty(d.id)}
                        className="p-3 rounded-lg text-left cursor-pointer"
                        style={{
                          background: difficulty === d.id ? `${d.color}18` : 'var(--bg-secondary)',
                          border: `2px solid ${difficulty === d.id ? d.color : 'var(--border)'}`,
                          color: 'var(--text-primary)',
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{d.emoji}</span>
                          <span className="text-xs font-bold" style={{ color: d.color }}>{d.label}</span>
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{d.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStart}
                  disabled={!playerName.trim()}
                  className="w-full py-4 rounded-xl font-bold text-sm cursor-pointer"
                  style={{
                    background: playerName.trim()
                      ? 'linear-gradient(135deg, #4ade80, #22c55e)'
                      : 'var(--bg-secondary)',
                    color: playerName.trim() ? '#0f1117' : 'var(--text-secondary)',
                    border: `1px solid ${playerName.trim() ? '#4ade80' : 'var(--border)'}`,
                  }}
                >
                  {playerName.trim() ? `🚀 INICIAR GESTIÓN — ${playerName}` : 'Escribe tu nombre para continuar'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

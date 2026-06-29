'use client';

import { useGameStore } from '@/store/gameStore';
import { MainMenu } from '@/components/game/MainMenu';
import { GameBoard } from '@/components/game/GameBoard';

export default function Home() {
  const isPlaying = useGameStore((s) => s.isPlaying);

  // Siempre se abre en el menú principal. Solo entra al juego cuando
  // la persona elige "Nueva partida" o "Continuar".
  if (!isPlaying) return <MainMenu />;
  return <GameBoard />;
}

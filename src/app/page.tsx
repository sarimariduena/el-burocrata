'use client';

import { useGameStore } from '@/store/gameStore';
import { MainMenu } from '@/components/game/MainMenu';
import { GameBoard } from '@/components/game/GameBoard';

export default function Home() {
  const save = useGameStore((s) => s.save);

  if (!save) return <MainMenu />;
  return <GameBoard />;
}

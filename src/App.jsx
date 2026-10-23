// ATHARVA.EXE — Application Shell & Screen Router

import React, { useState, useEffect } from 'react';
import GameCanvas from './game/GameCanvas';
import BootScreen from './ui/BootScreen';
import MainMenu from './ui/MainMenu';
import HUD from './ui/HUD';
import PauseMenu from './ui/PauseMenu';
import LevelComplete from './ui/LevelComplete';
import { GameState } from './systems/GameState';
import './styles/tokens.css';

export default function App() {
  const [screen, setScreen] = useState(GameState.screen);

  useEffect(() => {
    return GameState.subscribe((state) => {
      setScreen(state.screen);
    });
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'Escape') {
        if (GameState.screen === 'GAME') {
          GameState.setScreen('PAUSE');
        } else if (GameState.screen === 'PAUSE') {
          GameState.setScreen('GAME');
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Scene runs underneath (visible in Menu, Game, Pause, Complete) */}
      {screen !== 'BOOT' && <GameCanvas />}

      {/* Screen Overlays */}
      {screen === 'BOOT' && <BootScreen />}
      {screen === 'MENU' && <MainMenu />}
      {screen === 'GAME' && <HUD />}
      {screen === 'PAUSE' && (
        <>
          <HUD />
          <PauseMenu />
        </>
      )}
      {screen === 'LEVEL_COMPLETE' && <LevelComplete />}
    </div>
  );
}

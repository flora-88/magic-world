import React, { useRef, useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import SortingHat from './components/SortingHat';
import Gameplay from './components/Gameplay';
import { House } from './types';
import { GoldButton, ParchmentContainer } from './components/UI';

const GameOrchestrator: React.FC = () => {
  const { state, loadGame } = useGame();
  const [isCreating, setIsCreating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      loadGame(file);
    }
  };

  // 1. Check if we have a valid save loaded or if the character is fully created
  const isGameReady = state.name && state.house !== House.None;

  if (!isGameReady) {
    return (
      <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1547756536-cde3673fa2e5?q=80&w=2000')] bg-cover bg-center">
         <div className="absolute inset-0 bg-black/60"></div>
         <div className="relative z-10 w-full max-w-md">
            {isCreating ? (
              // User clicked New Game, show the Character Creation Flow
              <SortingHat />
            ) : (
              // Title Screen
              <ParchmentContainer className="text-center space-y-8 animate-fade-in">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-2 font-serif tracking-tighter">Harry Potter</h1>
                  <h2 className="text-xl text-amber-800 uppercase tracking-widest border-t border-b border-amber-700 py-2 inline-block">Wizarding RPG</h2>
                </div>
                
                <div className="space-y-4">
                  <GoldButton onClick={() => setIsCreating(true)} className="w-full py-3 text-lg">
                    New Game (Start Journey)
                  </GoldButton>
                  
                  <div className="relative">
                     <GoldButton onClick={() => fileInputRef.current?.click()} className="w-full py-3 text-lg opacity-90">
                      Load Game
                    </GoldButton>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".json"
                    />
                  </div>
                </div>

                <p className="text-xs text-amber-900/60 mt-8">Powered by Gemini AI • React • Tailwind</p>
              </ParchmentContainer>
            )}
         </div>
      </div>
    );
  }

  // 2. Main Gameplay Loop
  return <Gameplay />;
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <GameOrchestrator />
    </GameProvider>
  );
};

export default App;
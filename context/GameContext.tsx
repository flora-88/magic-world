import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, INITIAL_GAME_STATE, Quest } from '../types';
import { generateNewQuest } from '../services/geminiService';

interface GameContextType {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
  saveGame: () => void;
  loadGame: (file: File) => Promise<void>;
  resetGame: () => void;
  updateLocation: (locId: string) => void;
  addQuest: () => Promise<void>;
  checkQuestTrigger: (type: 'Talk' | 'Find', targetId: string) => void;
  removeQuest: (questId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem('hp_rpg_save');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge or at least top-level merge to ensure all arrays exist
        return { 
          ...INITIAL_GAME_STATE, 
          ...parsed,
          // Ensure arrays are arrays if they are missing in parsed data
          inventory: parsed.inventory || INITIAL_GAME_STATE.inventory,
          quests: parsed.quests || INITIAL_GAME_STATE.quests,
          chatHistory: parsed.chatHistory || INITIAL_GAME_STATE.chatHistory,
          attributes: { ...INITIAL_GAME_STATE.attributes, ...(parsed.attributes || {}) }
        };
      }
    } catch (e) {
      console.error("Failed to load save", e);
    }
    return INITIAL_GAME_STATE;
  });

  // Auto-save to local storage on state change
  useEffect(() => {
    localStorage.setItem('hp_rpg_save', JSON.stringify(state));
  }, [state]);

  const saveGame = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `WizardingSave_${state.name || 'Student'}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const loadGame = async (file: File) => {
    const text = await file.text();
    try {
      const parsed = JSON.parse(text);
      // Merge with initial to ensure safety
      const safeState = {
        ...INITIAL_GAME_STATE,
        ...parsed,
        inventory: parsed.inventory || [],
        quests: parsed.quests || [],
        chatHistory: parsed.chatHistory || {}
      };
      setState(safeState);
    } catch (e) {
      alert("Invalid save file!");
    }
  };

  const resetGame = () => {
    setState(INITIAL_GAME_STATE);
    localStorage.removeItem('hp_rpg_save');
  };

  const updateLocation = (locId: string) => {
    setState(prev => ({ ...prev, location: locId }));
  };

  const addQuest = async () => {
    const completedIds = (state.quests || []).filter(q => q.isCompleted).map(q => q.id);
    const newQuestData = await generateNewQuest(completedIds, state.quests || []);
    if (newQuestData) {
      const newQuest: Quest = {
        id: `q_${Date.now()}`,
        title: newQuestData.title,
        description: newQuestData.description,
        reward: newQuestData.reward,
        type: newQuestData.type,
        requirementType: newQuestData.requirementType,
        targetId: newQuestData.targetId,
        isCompleted: false
      };
      setState(prev => ({ ...prev, quests: [...(prev.quests || []), newQuest] }));
    }
  };

  const removeQuest = (questId: string) => {
    setState(prev => ({
      ...prev,
      quests: (prev.quests || []).filter(q => q.id !== questId)
    }));
  };

  // Logic to handle auto-completion of quests based on triggers
  const checkQuestTrigger = (type: 'Talk' | 'Find', targetId: string) => {
    setState(prev => {
      const quests = prev.quests || [];
      const updatedQuests = quests.map(q => {
        // If quest is active, matches type and matches target (or is generic if targetId is null)
        if (!q.isCompleted && q.requirementType === type && q.targetId === targetId) {
           return { ...q, isCompleted: true };
        }
        return q;
      });

      // Check if any quest just got completed
      let moneyToAdd = 0;
      let completedCount = 0;
      updatedQuests.forEach((q, idx) => {
        const oldQ = quests[idx];
        if (q.isCompleted && !oldQ.isCompleted) {
          moneyToAdd += q.reward;
          completedCount++;
          // We can use a timeout to not block rendering, but alert is fine for now
          setTimeout(() => alert(`任務完成: ${q.title}! 獲得 ${q.reward} 加隆。`), 100);
        }
      });

      if (completedCount === 0) return prev; // No changes

      return {
        ...prev,
        money: prev.money + moneyToAdd,
        quests: updatedQuests
      };
    });
  };

  return (
    <GameContext.Provider value={{ 
      state, setState, saveGame, loadGame, resetGame, updateLocation, 
      addQuest, checkQuestTrigger, removeQuest 
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
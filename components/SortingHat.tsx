import React, { useState, useEffect } from 'react';
import { generateSortingHatQuestions } from '../services/geminiService';
import { House, INITIAL_GAME_STATE } from '../types';
import { ParchmentContainer, GoldButton, Input } from './UI';
import { useGame } from '../context/GameContext';

const SortingHat: React.FC = () => {
  const { setState } = useGame();
  const [name, setName] = useState('');
  const [phase, setPhase] = useState<'name' | 'loading' | 'quiz' | 'result'>('name');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 });
  const [finalHouse, setFinalHouse] = useState<House>(House.None);

  const startQuiz = async () => {
    if (!name.trim()) return;
    setPhase('loading');
    const qs = await generateSortingHatQuestions();
    if (qs && qs.length > 0) {
      setQuestions(qs);
      setPhase('quiz');
    } else {
      // Fallback if AI fails
      setFinalHouse(House.Gryffindor);
      setPhase('result');
    }
  };

  const handleAnswer = (weights: any) => {
    const newScores = { ...scores };
    Object.keys(weights).forEach(k => {
      // @ts-ignore
      newScores[k] = (newScores[k] || 0) + weights[k];
    });
    setScores(newScores);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      determineHouse(newScores);
    }
  };

  const determineHouse = (finalScores: any) => {
    const house = Object.keys(finalScores).reduce((a, b) => finalScores[a] > finalScores[b] ? a : b) as House;
    setFinalHouse(house);
    setPhase('result');
  };

  const confirmCharacter = () => {
    setState({
      ...INITIAL_GAME_STATE,
      name,
      house: finalHouse,
      location: 'GreatHall'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90 p-4">
      <ParchmentContainer className="max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold mb-6 text-amber-900">分院儀式</h2>
        
        {phase === 'name' && (
          <div className="space-y-6">
            <p>歡迎來到霍格華茲。在戴上分院帽之前，請告訴我們你的名字。</p>
            <Input 
              placeholder="輸入你的巫師名字..." 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <GoldButton onClick={startQuiz}>開始儀式</GoldButton>
          </div>
        )}

        {phase === 'loading' && (
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>分院帽正在思考你的命運...</p>
          </div>
        )}

        {phase === 'quiz' && questions[currentQ] && (
          <div className="space-y-6">
            <p className="text-xl italic mb-4">"{questions[currentQ].question}"</p>
            <div className="grid grid-cols-1 gap-3">
              {(questions[currentQ].options || []).map((opt: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.weight)}
                  className="bg-amber-100 hover:bg-amber-200 border border-amber-300 p-3 rounded text-left transition-colors"
                >
                  {opt.text}
                </button>
              ))}
            </div>
            <p className="text-sm text-amber-800/60 mt-4">Question {currentQ + 1} of {questions.length}</p>
          </div>
        )}

        {phase === 'result' && (
          <div className="space-y-6">
            <p className="text-2xl">嗯... 很有趣... 我決定把你分到...</p>
            <h1 className="text-5xl text-amber-700 font-bold animate-bounce my-8">{finalHouse}!</h1>
            <GoldButton onClick={confirmCharacter}>進入魔法世界</GoldButton>
          </div>
        )}
      </ParchmentContainer>
    </div>
  );
};

export default SortingHat;
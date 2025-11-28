import React, { useState, useEffect } from 'react';
import { generateClassQuiz, checkQuizAnswer } from '../services/geminiService';
import { useGame } from '../context/GameContext';
import { ParchmentContainer, GoldButton, Input } from './UI';

interface ClassroomProps {
  subject: string;
  onLeave: () => void;
}

const Classroom: React.FC<ClassroomProps> = ({ subject, onLeave }) => {
  const { setState } = useGame();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [grading, setGrading] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      const qs = await generateClassQuiz(subject);
      setQuestions(qs);
      setLoading(false);
    };
    loadQuiz();
  }, [subject]);

  const handleSubmit = async () => {
    if (!userAnswer.trim()) return;
    setGrading(true);
    
    const currentQ = questions[currentIndex];
    const result = await checkQuizAnswer(currentQ.question, userAnswer, currentQ.answer);
    
    setFeedback(result.feedback);
    if (result.correct) setScore(s => s + 1);

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer('');
      setGrading(false);
      
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        setFinished(true);
      }
    }, 2500); // Allow time to read feedback
  };

  const handleFinish = () => {
    // Reward logic
    const reward = score * 5;
    setState(prev => ({ ...prev, money: prev.money + reward }));
    onLeave();
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-amber-200">
        <h2 className="text-2xl animate-pulse">教授正在準備考題...</h2>
      </div>
    );
  }

  if (finished) {
    return (
      <ParchmentContainer className="max-w-xl mx-auto mt-10 text-center">
        <h2 className="text-3xl mb-4">課程結束</h2>
        <p className="text-xl mb-4">得分: {score} / {questions.length}</p>
        <p className="mb-6">你獲得了 {score * 5} 加隆作為獎勵。</p>
        <GoldButton onClick={handleFinish}>離開教室</GoldButton>
      </ParchmentContainer>
    );
  }

  return (
    <div className="flex justify-center p-4">
      <ParchmentContainer className="max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6 border-b border-amber-700 pb-2">
          <h2 className="text-2xl font-bold">{subject} 隨堂測驗</h2>
          <span className="text-amber-800">Q: {currentIndex + 1}/{questions.length}</span>
        </div>

        <div className="min-h-[200px] flex flex-col justify-center">
          <p className="text-xl mb-6 font-serif leading-relaxed">
            {questions[currentIndex]?.question}
          </p>

          {!feedback ? (
            <div className="space-y-4">
              <Input 
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="寫下你的答案..."
                disabled={grading}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <GoldButton onClick={handleSubmit} disabled={grading || !userAnswer}>
                {grading ? '批改中...' : '提交答案'}
              </GoldButton>
            </div>
          ) : (
            <div className={`p-4 rounded border ${feedback.includes('Correct') || feedback.includes('正確') || score > (currentIndex) ? 'bg-green-100 border-green-500 text-green-900' : 'bg-red-100 border-red-500 text-red-900'}`}>
              <p className="font-bold">{feedback}</p>
            </div>
          )}
        </div>
      </ParchmentContainer>
    </div>
  );
};

export default Classroom;
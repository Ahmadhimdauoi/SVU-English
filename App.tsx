
import React, { useState, useCallback } from 'react';
import { TestState, TestResult, Question } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import Quiz from './components/Quiz';
import Results from './components/Results';

// Individual level data
import { level1Questions } from './data/level1';
import { level2Questions } from './data/level2';
import { level3Questions } from './data/level3';
import { level4Questions } from './data/level4';
import { level5Questions } from './data/level5';

const App: React.FC = () => {
  const [appState, setAppState] = useState<TestState>('WELCOME');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const getQuestionsByLevel = (level: number): Question[] => {
    switch(level) {
      case 1: return level1Questions;
      case 2: return level2Questions;
      case 3: return level3Questions;
      case 4: return level4Questions;
      case 5: return level5Questions;
      default: return level1Questions;
    }
  };

  const startTest = useCallback((level: number) => {
    const rawQuestions = getQuestionsByLevel(level);
    const shuffled = shuffleArray(rawQuestions);
    setActiveQuestions(shuffled);
    setAppState('QUIZ');
  }, []);

  const completeTest = (userAnswers: Record<number, string>) => {
    let score = 0;
    activeQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.answer) {
        score++;
      }
    });

    const percentage = Math.round((score / activeQuestions.length) * 100);
    
    let grade = 'Elementary';
    if (percentage >= 85) grade = 'Advanced';
    else if (percentage >= 70) grade = 'Upper-Intermediate';
    else if (percentage >= 50) grade = 'Intermediate';
    else if (percentage >= 30) grade = 'Pre-Intermediate';

    setTestResult({
      score,
      total: activeQuestions.length,
      percentage,
      grade,
      userAnswers
    });
    setAppState('RESULTS');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900 p-2 rounded-lg text-white font-black text-xl">SVU</div>
          <span className="font-bold text-slate-800 hidden sm:inline">English Placement Simulator</span>
        </div>
        {appState === 'QUIZ' && (
           <button 
             onClick={() => { if(confirm("Are you sure you want to quit? Progress will be lost.")) setAppState('WELCOME') }}
             className="text-sm font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded transition-colors"
           >
             Quit Test
           </button>
        )}
      </header>

      <main className="flex-grow flex items-start justify-center pt-8 pb-12 px-4 md:px-8">
        {appState === 'WELCOME' && <WelcomeScreen onStart={startTest} />}
        {appState === 'QUIZ' && <Quiz questions={activeQuestions} onComplete={completeTest} />}
        {appState === 'RESULTS' && testResult && (
          <Results 
            result={testResult} 
            questions={activeQuestions} 
            onRestart={() => setAppState('WELCOME')} 
          />
        )}
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
        &copy; {new Date().getFullYear()} SVU Placement Test Simulation Platform. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;

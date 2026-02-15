
import React, { useState } from 'react';
import { Question } from '../types';
import Timer from './Timer';

interface QuizProps {
  questions: Question[];
  onComplete: (userAnswers: Record<number, string>) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentIndex];

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option
    }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Header with Timer and Progress */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 py-4 border-b border-slate-100 mb-8 flex flex-col gap-4">
        <div className="flex justify-between items-center px-2">
          <div className="text-slate-500 font-medium">
            Question <span className="text-slate-900 font-bold">{currentIndex + 1}</span> of {questions.length}
          </div>
          <Timer initialSeconds={1800} onTimeUp={() => onComplete(answers)} />
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-blue-900 h-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 transition-all duration-300">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8 leading-snug">
          {currentQuestion.question}
        </h2>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                answers[currentQuestion.id] === option
                  ? 'border-blue-900 bg-blue-50 text-blue-900 shadow-sm'
                  : 'border-slate-100 bg-slate-50/50 text-slate-700 hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                answers[currentQuestion.id] === option ? 'border-blue-900' : 'border-slate-300 group-hover:border-slate-400'
              }`}>
                {answers[currentQuestion.id] === option && <div className="w-2.5 h-2.5 bg-blue-900 rounded-full" />}
              </div>
              <span className="font-medium">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
            currentIndex === 0 
              ? 'text-slate-300 cursor-not-allowed' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          Previous
        </button>

        <button
          onClick={nextQuestion}
          className="px-8 py-3 bg-blue-900 text-white font-bold rounded-lg shadow-lg hover:bg-blue-800 transition-all flex items-center gap-2 active:scale-95"
        >
          {currentIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'}
          {currentIndex !== questions.length - 1 && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Quiz;


import React, { useState } from 'react';
import { TestResult, Question } from '../types';

interface ResultsProps {
  result: TestResult;
  questions: Question[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, questions, onRestart }) => {
  const [reviewMode, setReviewMode] = useState(false);

  const getPerformanceMessage = () => {
    if (result.percentage >= 80) return "Excellent! You have a high level of proficiency.";
    if (result.percentage >= 60) return "Good job! You are at an Intermediate level.";
    if (result.percentage >= 40) return "Fair. You might need some review of the basics.";
    return "Keep practicing. You are at the Beginner level.";
  };

  const getScoreColor = () => {
    if (result.percentage >= 80) return "text-emerald-600";
    if (result.percentage >= 60) return "text-blue-600";
    if (result.percentage >= 40) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-20">
      {!reviewMode ? (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-blue-900 py-12 px-8 text-center text-white">
            <h2 className="text-lg uppercase tracking-widest font-bold opacity-80 mb-2">Test Completed</h2>
            <div className={`text-6xl md:text-8xl font-black mb-4 flex items-center justify-center gap-1`}>
              {result.score}<span className="text-2xl opacity-60">/{result.total}</span>
            </div>
            <p className="text-2xl font-bold mb-6">{result.grade} Level</p>
            <div className="w-full max-w-md mx-auto h-3 bg-white/20 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-400" style={{ width: `${result.percentage}%` }} />
            </div>
          </div>

          <div className="p-10 text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Performance Summary</h3>
            <p className="text-slate-600 mb-10 text-lg">
              {getPerformanceMessage()}
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => setReviewMode(true)}
                className="px-8 py-4 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-95"
              >
                Review Answers
              </button>
              <button
                onClick={onRestart}
                className="px-8 py-4 bg-blue-900 text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transition-all active:scale-95"
              >
                Retake Simulation
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Review Mode</h2>
              <p className="text-slate-500">Analyze your performance question by question</p>
            </div>
            <button
              onClick={() => setReviewMode(false)}
              className="px-4 py-2 text-blue-900 font-bold hover:bg-blue-50 rounded-lg transition-all"
            >
              Back to Summary
            </button>
          </div>

          {questions.map((q, idx) => {
            const userAns = result.userAnswers[q.id];
            const isCorrect = userAns === q.answer;

            return (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-2 h-full ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
                    {idx + 1}
                  </span>
                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">{q.question}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options.map((opt, oIdx) => {
                        const isUserChoice = opt === userAns;
                        const isCorrectAnswer = opt === q.answer;
                        
                        let classes = "p-3 rounded-lg border text-sm font-medium ";
                        if (isCorrectAnswer) classes += "bg-emerald-50 border-emerald-200 text-emerald-700";
                        else if (isUserChoice && !isCorrect) classes += "bg-red-50 border-red-200 text-red-700";
                        else classes += "bg-slate-50 border-slate-100 text-slate-500";

                        return (
                          <div key={oIdx} className={classes}>
                            <div className="flex justify-between items-center">
                              <span>{opt}</span>
                              {isCorrectAnswer && <span className="text-[10px] uppercase font-black px-1.5 py-0.5 bg-emerald-100 rounded">Correct</span>}
                              {isUserChoice && !isCorrect && <span className="text-[10px] uppercase font-black px-1.5 py-0.5 bg-red-100 rounded">Your Answer</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {!userAns && <p className="mt-3 text-sm text-red-500 font-bold">You skipped this question.</p>}
                  </div>
                </div>
              </div>
            );
          })}

          <button
            onClick={onRestart}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl mt-8 hover:bg-slate-800 transition-all shadow-xl"
          >
            Start New Test
          </button>
        </div>
      )}
    </div>
  );
};

export default Results;

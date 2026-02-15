
import React, { useState } from 'react';

interface WelcomeScreenProps {
  onStart: (level: number) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [showLevels, setShowLevels] = useState(false);

  const levels = [
    { id: 1, label: "Level 1", desc: "Elementary" },
    { id: 2, label: "Level 2", desc: "Pre-Intermediate" },
    { id: 3, label: "Level 3", desc: "Intermediate" },
    { id: 4, label: "Level 4", desc: "Upper-Intermediate" },
    { id: 5, label: "Level 5", desc: "Advanced" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 w-full">
      <div className="mb-8 p-6 bg-blue-50 rounded-full">
         <svg className="w-16 h-16 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
         </svg>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
        SVU English Placement Test Simulator
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
        Select a specific level to start your placement test. Each level covers unique grammar and vocabulary tailored to your proficiency.
      </p>

      {!showLevels ? (
        <button
          onClick={() => setShowLevels(true)}
          className="px-10 py-4 bg-blue-900 text-white font-bold rounded-lg shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all transform hover:-translate-y-1 active:scale-95 text-lg"
        >
          Start Test Selection
        </button>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          {levels.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => onStart(lvl.id)}
              className="flex flex-col items-center p-6 bg-white border-2 border-slate-100 rounded-xl hover:border-blue-900 hover:bg-blue-50 transition-all group shadow-sm text-left"
            >
              <span className="text-blue-900 font-black text-xl mb-1 group-hover:scale-110 transition-transform">{lvl.label}</span>
              <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">{lvl.desc}</span>
            </button>
          ))}
          <button
            onClick={() => setShowLevels(false)}
            className="md:col-span-2 lg:col-span-3 mt-4 text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors"
          >
            ← Back to Intro
          </button>
        </div>
      )}
      
      <p className="mt-12 text-sm text-slate-400">
        SVU Academic Standard • Precise Level Evaluation
      </p>
    </div>
  );
};

export default WelcomeScreen;

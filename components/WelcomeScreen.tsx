
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="mb-8 p-6 bg-blue-50 rounded-full">
         <svg className="w-20 h-20 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
         </svg>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
        SVU English Placement Test Simulator
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
        Prepare for the Syrian Virtual University English Placement Test with our official simulation environment. 
        Evaluate your Grammar, Vocabulary, and Comprehension skills in a timed format.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mb-12">
        <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
          <span className="block text-2xl font-bold text-blue-900">30</span>
          <span className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Questions</span>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
          <span className="block text-2xl font-bold text-blue-900">30</span>
          <span className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Minutes</span>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
          <span className="block text-2xl font-bold text-blue-900">100%</span>
          <span className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Accurate</span>
        </div>
      </div>

      <button
        onClick={onStart}
        className="px-10 py-4 bg-blue-900 text-white font-bold rounded-lg shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all transform hover:-translate-y-1 active:scale-95 text-lg"
      >
        Start Placement Test
      </button>
      
      <p className="mt-8 text-sm text-slate-400">
        Strict timing and randomization applied.
      </p>
    </div>
  );
};

export default WelcomeScreen;

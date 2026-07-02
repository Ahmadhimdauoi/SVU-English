import React from "react";
import { TestInfo } from "../types";

interface TestSelectionProps {
  levelTitle: string;
  levelDesc: string;
  tests: TestInfo[];
  onSelectTest: (test: TestInfo) => void;
  onBack: () => void;
}

const TestSelection: React.FC<TestSelectionProps> = ({
  levelTitle,
  levelDesc,
  tests,
  onSelectTest,
  onBack,
}) => {
  // Sort tests so that "الاختبار الشامل" (comprehensive) comes first
  const sortedTests = [...tests].sort((a, b) => {
    if (a.id === "comprehensive") return -1;
    if (b.id === "comprehensive") return 1;
    return 0;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 w-full">
      <div className="mb-6 p-4 bg-blue-50 rounded-full">
        <svg
          className="w-12 h-12 text-blue-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">
        {levelTitle} ({levelDesc})
      </h1>
      <p className="text-lg text-slate-600 max-w-xl mb-10 font-medium">
        اختر الاختبار المناسب لك للبدء بالتدريب. يمكنك اختيار الاختبار الشامل أو التركيز على قاعدة معينة.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        {sortedTests.map((test) => {
          const isComprehensive = test.id === "comprehensive";
          return (
            <button
              key={test.id}
              onClick={() => onSelectTest(test)}
              className={`flex flex-col justify-between p-6 rounded-xl border-2 transition-all group shadow-sm text-right ${
                isComprehensive
                  ? "border-blue-900 bg-blue-900 hover:bg-blue-800 text-white md:col-span-2"
                  : "border-slate-100 bg-white hover:border-blue-900 hover:bg-blue-50 text-slate-800"
              }`}
            >
              <div className="w-full flex justify-between items-start mb-4">
                <span
                  className={`px-3 py-1 text-xs font-black uppercase rounded ${
                    isComprehensive
                      ? "bg-white/20 text-white"
                      : "bg-blue-50 text-blue-900 group-hover:bg-blue-100"
                  }`}
                >
                  {test.questions.length} سؤالاً
                </span>
                {isComprehensive && (
                  <span className="bg-amber-400 text-blue-950 px-2 py-0.5 text-[10px] font-black rounded uppercase tracking-wider animate-pulse">
                    موصى به
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
                  {test.title}
                </h3>
                <p
                  className={`text-sm ${
                    isComprehensive ? "text-blue-100" : "text-slate-400"
                  }`}
                >
                  {isComprehensive
                    ? "اختبار تقييمي كامل يشمل جميع القواعد والمفردات المطلوبة لهذا المستوى."
                    : "اختبار مخصص للتركيز والتدريب المكثف على هذه القاعدة اللغوية."}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onBack}
        className="mt-8 px-6 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2 active:scale-95 text-sm"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        العودة لقائمة المستويات
      </button>
    </div>
  );
};

export default TestSelection;

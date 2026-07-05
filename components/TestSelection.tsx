import React, { useState } from "react";
import { TestInfo } from "../types";

interface TestSelectionProps {
  levelTitle: string;
  levelDesc: string;
  tests: TestInfo[];
  onSelectTest: (test: TestInfo) => void;
  onBack?: () => void;
}

const TestSelection: React.FC<TestSelectionProps> = ({
  levelTitle,
  levelDesc,
  tests,
  onSelectTest,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sort tests so that "الاختبار الشامل" (comprehensive) comes first
  const sortedTests = [...tests].sort((a, b) => {
    if (a.id === "comprehensive") return -1;
    if (b.id === "comprehensive") return 1;
    return 0;
  });

  // Filter tests based on query (ignoring case)
  const filteredTests = sortedTests.filter((test) =>
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-2 sm:px-4 w-full">
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-full">
        <svg
          className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900"
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

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">
        {levelTitle} ({levelDesc})
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mb-6 sm:mb-8 font-medium">
        اختر الاختبار المناسب لك للبدء بالتدريب. يمكنك اختيار الاختبار الشامل أو التركيز على قاعدة معينة.
      </p>

      {/* Search Input Bar */}
      <div className="w-full max-w-md mb-6 relative px-2 sm:px-0">
        <input
          type="text"
          placeholder="ابحث عن قاعدة أو اختبار (مثال: أفعال، الجر)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-5 py-3 pr-11 text-slate-800 bg-white border-2 border-slate-200 focus:border-blue-900 rounded-xl focus:outline-none transition-all text-right shadow-sm placeholder:text-slate-400 font-semibold text-sm sm:text-base"
          dir="rtl"
        />
        <div className="absolute right-5 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute left-5 sm:left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          {filteredTests.map((test) => {
            const isComprehensive = test.id === "comprehensive";
            return (
              <button
                key={test.id}
                onClick={() => onSelectTest(test)}
                className={`flex flex-col justify-between p-5 sm:p-6 rounded-xl border-2 transition-all group shadow-sm text-right ${
                  isComprehensive
                    ? "border-blue-900 bg-blue-900 hover:bg-blue-800 text-white md:col-span-2"
                    : "border-slate-100 bg-white hover:border-blue-900 hover:bg-blue-50 text-slate-800"
                }`}
              >
                <div className="w-full flex justify-between items-start mb-3 sm:mb-4">
                  <span
                    className={`px-2 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-black uppercase rounded ${
                      isComprehensive
                        ? "bg-white/20 text-white"
                        : "bg-blue-50 text-blue-900 group-hover:bg-blue-100"
                    }`}
                  >
                    {test.questions.length} سؤالاً
                  </span>
                  {isComprehensive && (
                    <span className="bg-amber-400 text-blue-950 px-2 py-0.5 text-[9px] sm:text-[10px] font-black rounded uppercase tracking-wider animate-pulse">
                      موصى به
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 group-hover:translate-x-1 transition-transform">
                    {test.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm ${
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
      ) : (
        <div className="text-center py-10 animate-in fade-in duration-300">
          <div className="text-slate-300 mb-3 flex justify-center">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-700 mb-1">لم يتم العثور على أي نتائج</h3>
          <p className="text-xs sm:text-sm text-slate-400">حاول البحث باستخدام كلمات أخرى.</p>
        </div>
      )}
    </div>
  );
};

export default TestSelection;

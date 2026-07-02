import React, { useState, useCallback, useMemo, useEffect } from "react";
import { TestState, TestResult, Question, TestInfo, LevelInfo } from "./types";
import WelcomeScreen from "./components/WelcomeScreen";
import TestSelection from "./components/TestSelection";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

// Level configurations and tests
import { level1Tests } from "./data/level1/level1";
import { level2Tests } from "./data/level2/level2";
import { level3Tests } from "./data/level3/level3";
import { level4Tests } from "./data/level4/level4";
import { level5Tests } from "./data/level5/level5";

const App: React.FC = () => {
  const [appState, setAppState] = useState<TestState>("WELCOME");
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [selectedTest, setSelectedTest] = useState<TestInfo | null>(null);

  const levelsData: Record<number, LevelInfo> = useMemo(() => ({
    1: { id: 1, title: "Level 1", desc: "Elementary", tests: level1Tests },
    2: { id: 2, title: "Level 2", desc: "Pre-Intermediate", tests: level2Tests },
    3: { id: 3, title: "Level 3", desc: "Intermediate", tests: level3Tests },
    4: { id: 4, title: "Level 4", desc: "Upper-Intermediate", tests: level4Tests },
    5: { id: 5, title: "Level 5", desc: "Advanced", tests: level5Tests },
  }), []);

  const levelCounts: Record<number, number> = useMemo(() => {
    return {
      1: level1Tests.length,
      2: level2Tests.length,
      3: level3Tests.length,
      4: level4Tests.length,
      5: level5Tests.length,
    };
  }, []);

  // Helper to update search params without reloading
  const updateUrl = useCallback((levelId: number | null, testId: string | null) => {
    const url = new URL(window.location.href);
    if (levelId) {
      url.searchParams.set("level", levelId.toString());
      if (testId) {
        url.searchParams.set("test", testId);
      } else {
        url.searchParams.delete("test");
      }
    } else {
      url.searchParams.delete("level");
      url.searchParams.delete("test");
    }
    if (window.location.search !== url.search) {
      window.history.pushState({}, "", url.pathname + url.search);
    }
  }, []);

  const selectLevel = useCallback((levelId: number) => {
    setSelectedLevelId(levelId);
    setAppState("TEST_SELECTION");
    updateUrl(levelId, null);
  }, [updateUrl]);

  const startTest = useCallback((test: TestInfo) => {
    setSelectedTest(test);
    setActiveQuestions(test.questions);
    setAppState("QUIZ");
    if (selectedLevelId) {
      updateUrl(selectedLevelId, test.id);
    }
  }, [selectedLevelId, updateUrl]);

  const resetToWelcome = useCallback(() => {
    setSelectedLevelId(null);
    setSelectedTest(null);
    setActiveQuestions([]);
    setAppState("WELCOME");
    updateUrl(null, null);
  }, [updateUrl]);

  const resetToTestSelection = useCallback(() => {
    setSelectedTest(null);
    setActiveQuestions([]);
    setAppState("TEST_SELECTION");
    if (selectedLevelId) {
      updateUrl(selectedLevelId, null);
    }
  }, [selectedLevelId, updateUrl]);

  // Read URL params and apply to state
  useEffect(() => {
    const handleUrlNavigation = () => {
      const params = new URLSearchParams(window.location.search);
      const levelStr = params.get("level");
      const testId = params.get("test");

      if (levelStr) {
        const levelId = parseInt(levelStr, 10);
        if (levelId >= 1 && levelId <= 5) {
          setSelectedLevelId(levelId);
          const levelData = levelsData[levelId];
          
          if (testId) {
            const test = levelData.tests.find((t) => t.id === testId);
            if (test) {
              setSelectedTest(test);
              setActiveQuestions(test.questions);
              setAppState("QUIZ");
              return;
            }
          }
          
          setSelectedTest(null);
          setActiveQuestions([]);
          setAppState("TEST_SELECTION");
          return;
        }
      }

      setSelectedLevelId(null);
      setSelectedTest(null);
      setActiveQuestions([]);
      setAppState("WELCOME");
    };

    handleUrlNavigation();

    window.addEventListener("popstate", handleUrlNavigation);
    return () => window.removeEventListener("popstate", handleUrlNavigation);
  }, [levelsData]);

  const completeTest = (userAnswers: Record<number, string>) => {
    let score = 0;
    activeQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.answer) {
        score++;
      }
    });

    const percentage = Math.round((score / activeQuestions.length) * 100);

    let grade = "Elementary";
    if (percentage >= 85) grade = "Advanced";
    else if (percentage >= 70) grade = "Upper-Intermediate";
    else if (percentage >= 50) grade = "Intermediate";
    else if (percentage >= 30) grade = "Pre-Intermediate";

    setTestResult({
      score,
      total: activeQuestions.length,
      percentage,
      grade,
      userAnswers,
    });
    setAppState("RESULTS");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900 p-2 rounded-lg text-white font-black text-xl">
            SVU
          </div>
          <span className="font-bold text-slate-800 hidden sm:inline">
            English Placement Simulator
          </span>
        </div>
        {appState === "QUIZ" && (
          <button
            onClick={() => {
              if (
                confirm("Are you sure you want to quit? Progress will be lost.")
              )
                resetToTestSelection();
            }}
            className="text-sm font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded transition-colors">
            Quit Test
          </button>
        )}
      </header>

      <main className="flex-grow flex items-start justify-center pt-8 pb-12 px-4 md:px-8 w-full max-w-7xl mx-auto">
        {appState === "WELCOME" && (
          <WelcomeScreen onStart={selectLevel} levelCounts={levelCounts} />
        )}
        {appState === "TEST_SELECTION" && selectedLevelId && (
          <TestSelection
            levelTitle={levelsData[selectedLevelId].title}
            levelDesc={levelsData[selectedLevelId].desc}
            tests={levelsData[selectedLevelId].tests}
            onSelectTest={startTest}
            onBack={resetToWelcome}
          />
        )}
        {appState === "QUIZ" && (
          <Quiz questions={activeQuestions} onComplete={completeTest} />
        )}
        {appState === "RESULTS" && testResult && (
          <Results
            result={testResult}
            questions={activeQuestions}
            onRestart={resetToWelcome}
          />
        )}
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
        &copy; {new Date().getFullYear()} SVU Placement Test Simulation
        Platform. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;

import { TestInfo } from "../../types";
import { level5Questions as comprehensiveQuestions } from "./level5 اختبار شامل";

export const level5Tests: TestInfo[] = [
  {
    id: "comprehensive",
    title: "الاختبار الشامل",
    questions: comprehensiveQuestions,
  },
];

// For backwards compatibility
export const level5Questions = comprehensiveQuestions;

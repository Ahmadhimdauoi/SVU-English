import { TestInfo } from "../../types";
import { level4Questions as comprehensiveQuestions } from "./level4 اختبار شامل";

export const level4Tests: TestInfo[] = [
  {
    id: "comprehensive",
    title: "الاختبار الشامل",
    questions: comprehensiveQuestions,
  },
];

// For backwards compatibility
export const level4Questions = comprehensiveQuestions;

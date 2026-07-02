import { TestInfo } from "../../types";
import { convertJSONQuestions } from "../helpers";
import { level3Questions as comprehensiveQuestions } from "./level3 اختبار شامل";

import mustHaveToJson from "./Must و Have to.json";
import relativePronounsJson from "./أدوات الوصل.json";
import necessityIntensityJson from "./الضرورة والشدة.json";
import gerundInfinitiveJson from "./المصدر والمسند.json";
import advancedComparisonsJson from "./المقارنات المتقدمة.json";

export const level3Tests: TestInfo[] = [
  {
    id: "comprehensive",
    title: "الاختبار الشامل",
    questions: comprehensiveQuestions,
  },
  {
    id: "must_have_to",
    title: "Must و Have to",
    questions: convertJSONQuestions(mustHaveToJson, "Intermediate"),
  },
  {
    id: "relative_pronouns",
    title: "أدوات الوصل (Relative Pronouns)",
    questions: convertJSONQuestions(relativePronounsJson, "Intermediate"),
  },
  {
    id: "necessity_intensity",
    title: "الضرورة والشدة (Necessity & Intensity)",
    questions: convertJSONQuestions(necessityIntensityJson, "Intermediate"),
  },
  {
    id: "gerund_infinitive",
    title: "المصدر والمسند (Gerund & Infinitive)",
    questions: convertJSONQuestions(gerundInfinitiveJson, "Intermediate"),
  },
  {
    id: "advanced_comparisons",
    title: "المقارنات المتقدمة (Advanced Comparisons)",
    questions: convertJSONQuestions(advancedComparisonsJson, "Intermediate"),
  },
];

// For backwards compatibility
export const level3Questions = comprehensiveQuestions;

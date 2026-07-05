import { TestInfo } from "../../types";
import { convertJSONQuestions } from "../helpers";
import { level4Questions as comprehensiveQuestions } from "./level4 اختبار شامل";

import prepositionsJson from "./احرف الجر.json";
import modalVerbs2Json from "./الافعال الناقصة (2).json";
import conditionalsJson from "./الجمل الشرطية.json";
import sentenceTypesJson from "./انواع الجمل.json";

export const level4Tests: TestInfo[] = [
  {
    id: "comprehensive",
    title: "الاختبار الشامل",
    questions: comprehensiveQuestions,
  },
  {
    id: "prepositions",
    title: "حروف الجر (Prepositions)",
    questions: convertJSONQuestions(prepositionsJson, "Upper-Intermediate"),
  },
  {
    id: "modal_verbs_2",
    title: "الأفعال الناقصة II (Modal Verbs II)",
    questions: convertJSONQuestions(modalVerbs2Json, "Upper-Intermediate"),
  },
  {
    id: "conditionals",
    title: "الجمل الشرطية (Conditionals)",
    questions: convertJSONQuestions(conditionalsJson, "Upper-Intermediate"),
  },
  {
    id: "sentence_types",
    title: "أنواع الجمل (Sentence Types)",
    questions: convertJSONQuestions(sentenceTypesJson, "Upper-Intermediate"),
  },
];

// For backwards compatibility
export const level4Questions = comprehensiveQuestions;

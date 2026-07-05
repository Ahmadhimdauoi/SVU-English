import { TestInfo } from "../../types";
import { convertJSONQuestions } from "../helpers";
import { level1Questions as comprehensiveQuestions } from "./level1 اختبار شامل";

import toBeJson from "./To be افعال.json";
import prepositionsJson from "./The Preposition Blueprint احرف الجر.json";
import comparisonsJson from "./The_Comparison_Blueprint المقارنات.json";
import questionWordsJson from "./The_Questioning_Blueprint احرف اسؤال.json";
import irregularVerbsJson from "./(الأفعال الشاذة).json";
import modalVerbsJson from "./(الأفعال الناقصة).json";
import passiveVoiceJson from "./pasive voice المبني للمجهول.json";
import tensesJson from "./الأزمنة.json";

export const level1Tests: TestInfo[] = [
  {
    id: "comprehensive",
    title: "الاختبار الشامل",
    questions: comprehensiveQuestions,
  },
  {
    id: "to_be",
    title: "أفعال To Be",
    questions: convertJSONQuestions(toBeJson, "Elementary"),
  },
  {
    id: "prepositions",
    title: "حروف الجر (Prepositions)",
    questions: convertJSONQuestions(prepositionsJson, "Elementary"),
  },
  {
    id: "comparisons",
    title: "المقارنات (Comparisons)",
    questions: convertJSONQuestions(comparisonsJson, "Elementary"),
  },
  {
    id: "questions",
    title: "أدوات السؤال (Question Words)",
    questions: convertJSONQuestions(questionWordsJson, "Elementary"),
  },
  {
    id: "irregular_verbs",
    title: "الأفعال الشاذة (Irregular Verbs)",
    questions: convertJSONQuestions(irregularVerbsJson, "Elementary"),
  },
  {
    id: "modal_verbs",
    title: "الأفعال الناقصة (Modal Verbs)",
    questions: convertJSONQuestions(modalVerbsJson, "Elementary"),
  },
  {
    id: "passive_voice",
    title: "المبني للمجهول (Passive Voice)",
    questions: convertJSONQuestions(passiveVoiceJson, "Elementary"),
  },
  {
    id: "tenses",
    title: "الأزمنة (Tenses)",
    questions: convertJSONQuestions(tensesJson, "Elementary"),
  },
];

// For backwards compatibility
export const level1Questions = comprehensiveQuestions;

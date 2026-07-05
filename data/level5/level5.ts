import { TestInfo } from "../../types";
import { convertJSONQuestions } from "../helpers";
import { level5Questions as comprehensiveQuestions } from "./level5 اختبار شامل";

import transitiveIntransitiveJson from "./اللازم والمتعدي.json";
import gerundInfinitive2Json from "./المصدر والمسند (2).json";
import comparisonSuperlativeJson from "./المقارنة والتفضيل.json";
import passiveVoiceJson from "./مبني للمجهول.json";

export const level5Tests: TestInfo[] = [
  {
    id: "comprehensive",
    title: "الاختبار الشامل",
    questions: comprehensiveQuestions,
  },
  {
    id: "transitive_intransitive",
    title: "اللازم والمتعدي (Transitive & Intransitive)",
    questions: convertJSONQuestions(transitiveIntransitiveJson, "Advanced"),
  },
  {
    id: "gerund_infinitive_2",
    title: "المصدر والمسند II (Gerund & Infinitive II)",
    questions: convertJSONQuestions(gerundInfinitive2Json, "Advanced"),
  },
  {
    id: "comparison_superlative",
    title: "المقارنة والتفضيل (Comparison & Superlative)",
    questions: convertJSONQuestions(comparisonSuperlativeJson, "Advanced"),
  },
  {
    id: "passive_voice",
    title: "المبني للمجهول (Passive Voice)",
    questions: convertJSONQuestions(passiveVoiceJson, "Advanced"),
  },
];

// For backwards compatibility
export const level5Questions = comprehensiveQuestions;

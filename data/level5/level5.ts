import { TestInfo } from "../../types";
import { convertJSONQuestions } from "../helpers";
import { level5Questions as comprehensiveQuestions } from "./level5 اختبار شامل";

import transitiveIntransitiveJson from "./اللازم والمتعدي.json";
import gerundInfinitive2Json from "./المصدر والمسند (2).json";
import comparisonSuperlativeJson from "./المقارنة والتفضيل.json";
import passiveVoiceJson from "./مبني للمجهول.json";
import tensesJson from "./الأزمنة.json";
import mustHaveToJson from "./Must و Have to.json";
import necessityIntensityJson from "./الضرورة والشدة.json";
import advancedComparisonsJson from "./المقارنات المتقدمة.json";

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
  {
    id: "must_have_to",
    title: "Must و Have to",
    questions: convertJSONQuestions(mustHaveToJson, "Advanced"),
  },
  {
    id: "necessity_intensity",
    title: "الضرورة والشدة (Necessity & Intensity)",
    questions: convertJSONQuestions(necessityIntensityJson, "Advanced"),
  },
  {
    id: "advanced_comparisons",
    title: "المقارنات المتقدمة (Advanced Comparisons)",
    questions: convertJSONQuestions(advancedComparisonsJson, "Advanced"),
  },
  {
    id: "tenses",
    title: "الأزمنة (Tenses)",
    questions: convertJSONQuestions(tensesJson, "Advanced"),
  },
];

// For backwards compatibility
export const level5Questions = comprehensiveQuestions;

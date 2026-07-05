import { Question } from '../types';

export interface JSONQuestion {
  question: string;
  options: string[];
  correctIndex?: number;
  correct_index?: number;
  answer?: string;
  explanation?: string;
}

export function convertJSONQuestions(
  json: JSONQuestion[],
  difficultyLabel: string,
  startId: number = 1
): Question[] {
  return json.map((q, idx) => {
    let answer = "";
    if (typeof q.answer === "string") {
      answer = q.answer;
    } else {
      const correctIdx = q.correctIndex !== undefined ? q.correctIndex : q.correct_index;
      if (correctIdx !== undefined && q.options && q.options[correctIdx] !== undefined) {
        answer = q.options[correctIdx];
      }
    }
    return {
      id: startId + idx,
      difficulty_label: difficultyLabel,
      question: q.question,
      options: q.options,
      answer: answer,
      explanation: q.explanation
    };
  });
}

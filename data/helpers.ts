import { Question } from '../types';

export interface JSONQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export function convertJSONQuestions(
  json: JSONQuestion[],
  difficultyLabel: string,
  startId: number = 1
): Question[] {
  return json.map((q, idx) => ({
    id: startId + idx,
    difficulty_label: difficultyLabel,
    question: q.question,
    options: q.options,
    answer: q.options[q.correctIndex],
    explanation: q.explanation
  }));
}

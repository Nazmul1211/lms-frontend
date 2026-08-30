export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  explanation?: string;
}

export interface Quiz {
  id: number | string;
  courseId: number | string;
  courseTitle?: string;
  title: string;
  description: string;
  passingScorePercentage: number;
  totalQuestions: number;
  timeLimitMinutes?: number;
  timeframeHours?: number;
  deadline?: string;
  createdAt?: string;
  isClosed?: boolean;
  score?: number;
  passed?: boolean;
  questions: QuizQuestion[];
}

export interface QuizSubmission {
  answers: Record<number, number>; // questionId -> selectedOptionIndex (0-indexed)
}

export interface QuestionResult {
  questionId: number;
  question: string;
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
  explanation?: string;
  options: string[];
}

export interface QuizResult {
  quizId: number;
  courseId: number;
  scorePercentage: number;
  totalQuestions: number;
  correctCount: number;
  passed: boolean;
  passingScorePercentage: number;
  submittedAt: string;
  results: QuestionResult[];
}

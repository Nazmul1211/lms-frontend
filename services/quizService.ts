import { Quiz, QuizQuestion, QuizSubmission, QuizResult, QuestionResult } from "@/types/quiz";
import { getAuthToken } from "@/services/authService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Master quiz records with server-side answer keys (simulating database records)
interface ServerQuizRecord {
  id: number;
  courseId: number;
  title: string;
  description: string;
  passingScorePercentage: number;
  timeLimitMinutes: number;
  questions: {
    id: number;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  }[];
}

const mockQuizMaster: Record<number, ServerQuizRecord> = {
  1: {
    id: 501,
    courseId: 1,
    title: "Next.js 16 & Full-Stack Certification Assessment",
    description: "Validate your knowledge of React Server Components, Server Actions, RBAC policies, and streaming SSR.",
    passingScorePercentage: 70,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 1,
        question: "In Next.js 16 App Router, what is the default rendering model for components inside the app directory?",
        options: [
          "Client Components ('use client' is implied)",
          "React Server Components (RSC)",
          "Static HTML without hydration capabilities",
          "Edge Middleware Functions",
        ],
        correctAnswerIndex: 1,
        explanation: "All components in the app directory are React Server Components by default unless explicitly decorated with the 'use client' directive.",
      },
      {
        id: 2,
        question: "Why should Server Actions be used instead of traditional API routes for form mutations in Next.js?",
        options: [
          "They automatically eliminate the need for any database validation",
          "They allow seamless async server mutations directly without manual API boilerplate and can trigger revalidation",
          "They convert all backend queries into client-side JavaScript bundles",
          "They run in the user's browser without contacting the server",
        ],
        correctAnswerIndex: 1,
        explanation: "Server Actions allow direct async mutations with automatic endpoint generation and revalidation via revalidatePath / revalidateTag.",
      },
      {
        id: 3,
        question: "Where should Role-Based Access Control (RBAC) primarily be enforced to prevent security vulnerabilities?",
        options: [
          "Only in client-side React useEffect redirects",
          "By hiding buttons in CSS with display: none",
          "At the backend API and server middleware layer via token validation and policy checks",
          "In the browser localStorage",
        ],
        correctAnswerIndex: 2,
        explanation: "Client UI guards are strictly visual. True RBAC security must be enforced by verifying verified JWT tokens and policies at the server API layer.",
      },
      {
        id: 4,
        question: "How does the Strapi backend prevent answer leakage in the interactive quiz feature?",
        options: [
          "By encrypting the client JavaScript bundle",
          "By exposing correct answer keys only in HTML comments",
          "By sanitizing the quiz payload at /api/quizzes/:id/student-view to strip all answer keys before sending JSON to the student",
          "By running client-side hash checks",
        ],
        correctAnswerIndex: 2,
        explanation: "The student-view endpoint strips out correct answer properties from the database response before serialization, preventing client inspection.",
      },
      {
        id: 5,
        question: "Which directive marks a component and its children as an interactive client boundary?",
        options: [
          "'use server'",
          "'use client'",
          "'use state'",
          "'use interactive'",
        ],
        correctAnswerIndex: 1,
        explanation: "The 'use client' directive declares a boundary between server and client component modules.",
      },
    ],
  },
};

/**
 * Fetch sanitized quiz questions (answers stripped out)
 * Matches GET /api/quizzes/:id/student-view
 */
export async function getQuizStudentView(
  courseId: number | string,
  token?: string
): Promise<Quiz | null> {
  const numericCourseId = Number(courseId);
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/quizzes/${numericCourseId}/student-view`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // fallback
  }

  const record = mockQuizMaster[numericCourseId] || mockQuizMaster[1];
  if (!record) return null;

  // Strip out correctAnswerIndex to simulate server sanitization
  const sanitizedQuestions: QuizQuestion[] = record.questions.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
  }));

  return {
    id: record.id,
    courseId: numericCourseId,
    title: record.title,
    description: record.description,
    passingScorePercentage: record.passingScorePercentage,
    totalQuestions: sanitizedQuestions.length,
    timeLimitMinutes: record.timeLimitMinutes,
    questions: sanitizedQuestions,
  };
}

/**
 * Submit answers -> Server auto-grades & returns score report
 * Matches POST /api/quizzes/:id/submit
 */
export async function submitQuiz(
  quizId: number | string,
  courseId: number | string,
  submission: QuizSubmission,
  token?: string
): Promise<QuizResult> {
  const numericQuizId = Number(quizId);
  const numericCourseId = Number(courseId);
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/quizzes/${numericQuizId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify(submission),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // fallback
  }

  // Server-side auto grading simulation
  const record = mockQuizMaster[numericCourseId] || mockQuizMaster[1];
  const questionResults: QuestionResult[] = record.questions.map((q) => {
    const userSelected = submission.answers[q.id];
    const isCorrect = userSelected === q.correctAnswerIndex;

    return {
      questionId: q.id,
      question: q.question,
      options: q.options,
      selectedOption: userSelected !== undefined ? userSelected : -1,
      correctOption: q.correctAnswerIndex,
      isCorrect,
      explanation: q.explanation,
    };
  });

  const correctCount = questionResults.filter((r) => r.isCorrect).length;
  const totalQuestions = record.questions.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercentage >= record.passingScorePercentage;

  const result: QuizResult = {
    quizId: numericQuizId,
    courseId: numericCourseId,
    scorePercentage,
    totalQuestions,
    correctCount,
    passed,
    passingScorePercentage: record.passingScorePercentage,
    submittedAt: new Date().toISOString(),
    results: questionResults,
  };

  // Save score to local storage for test persistence
  if (typeof window !== "undefined") {
    localStorage.setItem(`lms_quiz_score_${numericCourseId}`, JSON.stringify(result));
  }

  return result;
}

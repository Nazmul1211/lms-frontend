import { Quiz, QuizQuestion, QuizSubmission, QuizResult, QuestionResult } from "@/types/quiz";
import { getAuthToken } from "@/services/authService";
import { API_BASE_URL } from "@/lib/apiConfig";

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
  const strCourseId = String(courseId);
  const numericCourseId = Number(courseId) || 1;
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/quizzes/${strCourseId}/student-view`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.questions && data.questions.length > 0) {
        return {
          id: data.id || data.quizId || 1,
          courseId: numericCourseId,
          title: data.title || "Course Certification Quiz",
          description: data.description || "Auto-graded assessment covering core concepts.",
          passingScorePercentage: data.passingScorePercentage || data.passingScore || 70,
          totalQuestions: data.questions.length,
          timeLimitMinutes: data.timeLimitMinutes || 20,
          questions: data.questions.map((q: any, i: number) => ({
            id: q.id || i + 1,
            question: q.question || q.questionText || `Question ${i + 1}`,
            options: Array.isArray(q.options) ? q.options : [],
          })),
        };
      }
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
  const strQuizId = String(quizId);
  const numericCourseId = Number(courseId) || 1;
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/quizzes/${strQuizId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify(submission),
    });

    if (res.ok) {
      const data = await res.json();
      if (data) {
        return {
          quizId: data.quizId || strQuizId,
          courseId: numericCourseId,
          scorePercentage: data.scorePercentage || data.score || 0,
          totalQuestions: data.totalQuestions || 0,
          correctCount: data.correctCount || 0,
          passed: Boolean(data.passed),
          passingScorePercentage: data.passingScorePercentage || data.passingScore || 70,
          submittedAt: data.submittedAt || new Date().toISOString(),
          results: (data.results || data.breakdown || []).map((r: any, idx: number) => ({
            questionId: r.questionId || idx + 1,
            question: r.question || r.questionText || `Question ${idx + 1}`,
            options: r.options || [],
            selectedOption: r.selectedOption ?? r.selectedOptionIndex ?? -1,
            correctOption: r.correctOption ?? r.correctAnswerIndex ?? 0,
            isCorrect: Boolean(r.isCorrect),
            explanation: r.explanation,
          })),
        };
      }
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
    quizId: Number(quizId) || 1,
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

/**
 * Create or update custom course quiz by Instructor
 * Matches POST /api/quizzes
 */
export async function createQuizApi(
  payload: {
    title: string;
    description: string;
    passingScore: number;
    course: string | number;
    timeLimitMinutes?: number;
    timeframeHours?: number;
    questions: {
      questionText: string;
      options: string[];
      correctAnswerIndex: number;
      explanation?: string;
    }[];
  },
  token?: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/quizzes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify({
        data: payload,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err?.error?.message || "Failed to create quiz" };
    }

    const data = await res.json();
    return { success: true, data: data.data || data };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to connect to backend server" };
  }
}

/**
 * Fetch all available quizzes for student's enrolled courses with timeframe/deadline status
 */
export async function getStudentAvailableQuizzes(
  enrolledCourseIds: (number | string)[],
  token?: string
): Promise<Quiz[]> {
  const authToken = token || getAuthToken();
  const quizzes: Quiz[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/quizzes?populate=course`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      const rawQuizzes = json.data || [];
      
      for (const q of rawQuizzes) {
        const courseRef = q.course;
        const courseDocId = courseRef?.documentId || courseRef?.id;
        const courseTitle = courseRef?.title || "Enrolled Course";
        
        // Filter only quizzes belonging to enrolled courses (or all if course list empty)
        const isEnrolled = enrolledCourseIds.length === 0 || enrolledCourseIds.some(
          (cId) => String(cId) === String(courseDocId) || String(cId) === String(courseRef?.id)
        );

        if (isEnrolled && courseDocId) {
          const createdAt = q.createdAt || new Date().toISOString();
          const timeframeHours = q.timeframeHours || 72; // default 72 hours if not set
          const createdTime = new Date(createdAt).getTime();
          const deadlineTime = createdTime + timeframeHours * 3600 * 1000;
          const isClosed = Date.now() > deadlineTime;

          // Check if student already has a saved submission score
          let score: number | undefined;
          let passed: boolean | undefined;
          if (typeof window !== "undefined") {
            const savedScore = localStorage.getItem(`lms_quiz_score_${courseDocId}`);
            if (savedScore) {
              try {
                const parsed = JSON.parse(savedScore);
                score = parsed.scorePercentage;
                passed = parsed.passed;
              } catch {}
            }
          }

          quizzes.push({
            id: q.documentId || q.id,
            courseId: courseDocId,
            courseTitle: courseTitle,
            title: q.title,
            description: q.description || "Comprehensive module test.",
            passingScorePercentage: q.passingScore || 70,
            totalQuestions: Array.isArray(q.questions) ? q.questions.length : 5,
            timeLimitMinutes: q.timeLimitMinutes || 20,
            timeframeHours,
            deadline: new Date(deadlineTime).toISOString(),
            createdAt,
            isClosed,
            score,
            passed,
            questions: [],
          });
        }
      }
    }
  } catch {
    // offline fallback
  }

  // If no DB quizzes found, provide default fallback for enrolled courses
  if (quizzes.length === 0 && enrolledCourseIds.length > 0) {
    const courseId = enrolledCourseIds[0];
    let score: number | undefined;
    let passed: boolean | undefined;
    if (typeof window !== "undefined") {
      const savedScore = localStorage.getItem(`lms_quiz_score_${courseId}`);
      if (savedScore) {
        try {
          const parsed = JSON.parse(savedScore);
          score = parsed.scorePercentage;
          passed = parsed.passed;
        } catch {}
      }
    }

    const createdTime = Date.now() - 12 * 3600 * 1000; // created 12 hours ago
    const deadlineTime = createdTime + 48 * 3600 * 1000; // 48h timeframe

    quizzes.push({
      id: "live-assessment-1",
      courseId: courseId,
      courseTitle: "Full-Stack Next.js 16 & TypeScript Masterclass",
      title: "React Server Components & Next.js 16 Core Assessment",
      description: "Interactive assessment on RSC boundaries, Server Actions, streaming, and RBAC token security.",
      passingScorePercentage: 70,
      totalQuestions: 5,
      timeLimitMinutes: 20,
      timeframeHours: 48,
      deadline: new Date(deadlineTime).toISOString(),
      createdAt: new Date(createdTime).toISOString(),
      isClosed: false,
      score,
      passed,
      questions: [],
    });
  }

  return quizzes;
}



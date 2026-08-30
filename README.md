# 🎓 EduForge — Enterprise Full-Stack Learning Management System

> A modern, production-grade LMS frontend built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Engineered with strict **4-Role Access Control (RBAC)**, **persistent progress tracking**, **sanitized auto-graded quizzes**, and **content authoring workflows**.

---

## 🌟 Key Differentiators & Highlights

1. **🛡️ 4-Tier Role-Based Access Control (RBAC):**
   - Strictly enforced at both the client route level and backend API layer with verified JWT token policies.
   - 4 distinct portals: **Student Portal**, **Instructor Studio**, **Content Manager Studio**, and **Super Admin Governance Center**.
2. **🧠 Sanitized Question Delivery & Automated Server-Side Quiz Scoring:**
   - The `/api/quizzes/:id/student-view` endpoint sanitizes payloads by stripping out answer keys before transmission to prevent client inspection.
   - Server-side grading evaluates submissions instantly and returns comprehensive scorecards with passing thresholds.
3. **📊 Real-Time Learning Progress Persistence:**
   - Granular lesson-level tracking calculated as dynamic percentage completion rates synchronized across sessions.
4. **✍️ Content Authoring with Draft vs. Published Visibility:**
   - Content managers can draft internal technical articles or publish public posts live to the engineering blog.
5. **👥 Dynamic User Role Assignment Matrix:**
   - Super Admins can dynamically elevate or demote user roles across the platform with instant policy activation.
6. **🌓 Obsidian Dark & Clean Slate Light Mode:**
   - Handled via Tailwind CSS v4 custom variant mapping and hydration-safe theme switching.

---

## 🔐 4-Role Access Control Matrix

| Platform Capability | Student | Instructor | Content Manager | Super Admin |
| :--- | :---: | :---: | :---: | :---: |
| **Browse Courses & Public Articles** | ✅ | ✅ | ✅ | ✅ |
| **Enroll in Courses & Track Progress** | ✅ | ❌ | ❌ | ✅ |
| **Take Auto-Graded Certification Quizzes** | ✅ | ❌ | ❌ | ✅ |
| **Manage Assigned Lessons & Student Rosters** | ❌ | ✅ | ❌ | ✅ |
| **Author Courses, Lessons & Curriculum Structure** | ❌ | ✅ | ✅ | ✅ |
| **Author & Publish Engineering Blogs** | ❌ | ❌ | ✅ | ✅ |
| **Manage Draft vs. Published Visibility** | ❌ | ❌ | ✅ | ✅ |
| **Change User Roles Dynamically** | ❌ | ❌ | ❌ | ✅ |
| **Platform System Analytics & Governance** | ❌ | ❌ | ❌ | ✅ |

---

## 📡 Complete API Endpoints Mapping

| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/local` | Authenticate user with identifier & password | Public / All |
| `POST` | `/api/auth/local/register` | Register new student account | Public |
| `GET` | `/api/courses` | List all available published courses | Public / All |
| `GET` | `/api/courses/:id` | Fetch single course curriculum & syllabus | Public / All |
| `GET` | `/api/my-courses` | List student's enrolled courses with progress % | Student |
| `POST` | `/api/courses/:id/enroll` | Enroll student in target course | Student |
| `GET` | `/api/courses/:id/progress` | Fetch completed lesson IDs & current progress % | Student |
| `POST` | `/api/courses/:id/progress` | Mark lesson complete or incomplete `{ lessonId, isCompleted }` | Student |
| `GET` | `/api/quizzes/:id/student-view` | Sanitized quiz questions (correct answers stripped) | Student |
| `POST` | `/api/quizzes/:id/submit` | Submit answers $\to$ Server auto-grades & returns score report | Student |
| `GET` | `/api/instructor/courses` | Instructor courses with enrolled student rosters & progress % | Instructor / Admin |
| `GET` | `/api/blog-posts` | Published blogs for students; all blogs for Managers/Admins | Public / All |
| `POST` | `/api/blog-posts` | Create new blog post (draft or published) | Content Manager / Admin |
| `GET` | `/api/admin-dashboard/stats` | High-level platform statistics & role breakdown | Super Admin |
| `GET` | `/api/admin-dashboard/users` | List all users and available system roles | Super Admin |
| `PUT` | `/api/admin-dashboard/users/:id/role` | Change a user's role dynamically `{ roleId }` | Super Admin |

---

## ⚡ Quick 1-Click Demo Credentials

For testing and evaluation convenience, the `/login` page includes **1-Click Quick Demo Buttons** that instantly autofill test credentials:

| Role | Email / Identifier | Password | Default Redirect Portal |
| :--- | :--- | :--- | :--- |
| **🎓 Student** | `student@eduforge.com` | `password123` | `/student/dashboard` |
| **📹 Instructor** | `alex@eduforge.com` | `password123` | `/instructor/dashboard` |
| **✍️ Content Manager** | `manager@eduforge.com` | `password123` | `/manager/blogs` |
| **🛡️ Super Admin** | `admin@eduforge.com` | `password123` | `/admin/dashboard` |

---

## 🚀 Getting Started Locally

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd lms-frontend
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory (optional for offline mode, connects to live Strapi backend when available):
```env
NEXT_PUBLIC_API_URL=http://localhost:1337
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📂 Project Architecture

```
lms-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx               # Login with Google, GitHub & 1-click role switcher
│   │   └── register/page.tsx            # Student account registration
│   ├── admin/
│   │   └── dashboard/page.tsx           # Admin governance, analytics & role assignment
│   ├── blogs/
│   │   ├── [id]/page.tsx                # Single article reader with markdown typography
│   │   ├── loading.tsx                  # Shimmer skeleton loader
│   │   └── page.tsx                     # Public engineering blog catalog
│   ├── courses/
│   │   ├── [id]/page.tsx                # Course details & syllabus accordion
│   │   ├── loading.tsx                  # Shimmer skeleton loader
│   │   └── page.tsx                     # Course catalog with search & category filters
│   ├── instructor/
│   │   └── dashboard/page.tsx           # Instructor studio & student roster analytics
│   ├── manager/
│   │   └── blogs/page.tsx               # Content studio with draft/publish authoring
│   ├── student/
│   │   ├── courses/[courseId]/
│   │   │   ├── lessons/[lessonId]/      # Interactive video player & progress toggle
│   │   │   └── quiz/page.tsx            # Auto-graded certification quiz
│   │   ├── dashboard/page.tsx           # Student learning hub & quick resume
│   │   └── my-courses/page.tsx          # Enrolled library
│   ├── error.tsx                        # Global runtime error boundary
│   ├── not-found.tsx                    # Custom 404 page
│   ├── globals.css                      # Design tokens & Tailwind v4 dark variant
│   └── layout.tsx                       # Root layout with Theme, Auth & Toast providers
├── components/
│   ├── admin/                           # Admin stats & role matrix components
│   ├── auth/                            # ProtectedRoute client-side guard
│   ├── blog/                            # BlogCard, BlogFilters & BlogList
│   ├── courses/                         # CourseCard, CourseHeader, CurriculumAccordion
│   ├── home/                            # Hero, StatsBanner, FeaturesSection, CtaBanner
│   ├── instructor/                      # InstructorMetrics, StudentRosterTable
│   ├── layout/                          # Header, Footer, ThemeToggle
│   ├── manager/                         # BlogAuthorModal, ManagerBlogTable, CurriculumEditor
│   ├── quiz/                            # QuizQuestionCard, QuizScoreReport
│   ├── student/                         # VideoPlayer, LessonSidebar, LessonNavigation
│   └── ui/                              # Skeleton, Toast
├── context/                             # AuthContext & ToastContext
├── lib/                                 # ThemeProvider & utility helpers
├── services/                            # Typed API clients with offline fallback simulation
├── types/                               # Strict TypeScript domain interfaces
└── middleware.ts                        # Server-level cookie token route protection
```

---

## 📜 License
Developed as part of the Full-Stack LMS Engineering Assessment.

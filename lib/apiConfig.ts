/**
 * Centralized API configuration.
 * Defaults to the live Railway backend so that Vercel deployments and preview URLs
 * always connect out-of-the-box even without manually configured env variables.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://lms-backend-production-68cb.up.railway.app";

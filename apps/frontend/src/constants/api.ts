export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  reports: {
    list: '/api/v1/reports',
    generate: '/api/v1/reports/generate',
    detail: (id: number) => `/api/v1/reports/${id}`,
  },
} as const;
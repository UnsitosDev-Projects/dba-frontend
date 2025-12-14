export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api',
  ENDPOINTS: {
    PROFESSORS: '/professors',
    STUDENTS: '/students',
    COURSES: '/courses'
  },
  TIMEOUT: 30000
};

export const getEndpoint = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api',
  AWS_COURSES_URL: 'https://39z0iefc77.execute-api.us-east-1.amazonaws.com/prod/courses',
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

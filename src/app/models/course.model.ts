export interface Course {
  courseId: string;
  name: string;
  department?: string;
  credits?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CoursesResponse {
  count: number;
  courses: Course[];
}

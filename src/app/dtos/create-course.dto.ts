export interface CreateCourseDto {
  courseId: string;
  name: string;
  department?: string;
  credits?: number;
}

export interface CreateStudentDto {
  enrollmentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  enrollmentDate: Date;
}

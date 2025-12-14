export interface Student {
  id?: number;
  enrollmentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  enrollmentDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

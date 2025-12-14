export interface Course {
  id?: number;
  code: string;
  name: string;
  description?: string;
  credits: number;
  createdAt?: Date;
  updatedAt?: Date;
}

import { Professor } from '../models/professor.model';

export interface ProfessorResponseDto {
  data: Professor | Professor[];
  message?: string;
  success: boolean;
}

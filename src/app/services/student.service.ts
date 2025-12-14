import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { StudentRepository } from '../repositories/student.repository';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private repository = inject(StudentRepository);

  getAll(): Observable<Student[]> {
    return this.repository.getAll();
  }

  getById(id: number): Observable<Student> {
    return this.repository.getById(id);
  }

  create(dto: CreateStudentDto): Observable<Student> {
    return this.repository.create(dto);
  }

  update(id: number, dto: Partial<CreateStudentDto>): Observable<Student> {
    return this.repository.update(id, dto);
  }

  delete(id: number): Observable<void> {
    return this.repository.delete(id);
  }
}

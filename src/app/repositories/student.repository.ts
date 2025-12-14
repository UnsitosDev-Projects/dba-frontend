import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { getEndpoint, API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class StudentRepository {
  private http = inject(HttpClient);
  private baseUrl = getEndpoint(API_CONFIG.ENDPOINTS.STUDENTS);

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateStudentDto): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, dto);
  }

  update(id: number, dto: Partial<CreateStudentDto>): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

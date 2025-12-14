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
    const url = `${this.baseUrl}/`;
    console.log('GET students:', url);
    return this.http.get<Student[]>(url);
  }

  getById(id: string): Observable<Student> {
    const url = `${this.baseUrl}/${id}`;
    console.log('GET student:', url);
    return this.http.get<Student>(url);
  }

  create(dto: CreateStudentDto): Observable<Student> {
    const url = `${this.baseUrl}/`;
    console.log('POST student:', url, dto);
    return this.http.post<Student>(url, dto);
  }

  update(id: string, dto: Partial<CreateStudentDto>): Observable<Student> {
    const url = `${this.baseUrl}/${id}`;
    console.log('PUT student:', url, dto);
    return this.http.put<Student>(url, dto);
  }

  delete(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    console.log('DELETE student:', url);
    return this.http.delete<void>(url);
  }
}

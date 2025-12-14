import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { getEndpoint, API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CourseRepository {
  private http = inject(HttpClient);
  private baseUrl = getEndpoint(API_CONFIG.ENDPOINTS.COURSES);

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateCourseDto): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, dto);
  }

  update(id: number, dto: Partial<CreateCourseDto>): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

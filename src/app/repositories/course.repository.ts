import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, CoursesResponse } from '../models/course.model';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { getEndpoint, API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CourseRepository {
  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.AWS_COURSES_URL;

  getAll(): Observable<CoursesResponse> {
    return this.http.get<CoursesResponse>(this.baseUrl);
  }

  getById(id: string): Observable<Course> {
    const url = `${this.baseUrl}/${encodeURIComponent(id)}`;
    console.log('GET course:', url);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get<Course>(url, { headers });
  }

  create(dto: CreateCourseDto): Observable<Course> {
    console.log('POST course:', this.baseUrl, dto);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Course>(this.baseUrl, dto, { headers });
  }

  update(id: string, dto: Partial<CreateCourseDto>): Observable<Course> {
    const url = `${this.baseUrl}/${encodeURIComponent(id)}`;
    console.log('PUT course:', url, dto);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<Course>(url, dto, { headers });
  }

  delete(id: string): Observable<void> {
    const url = `${this.baseUrl}/${encodeURIComponent(id)}`;
    console.log('DELETE course:', url);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.delete<void>(url, { headers });
  }
}

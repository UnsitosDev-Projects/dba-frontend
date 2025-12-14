import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CoursesResponse } from '../models/course.model';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { CourseRepository } from '../repositories/course.repository';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private repository = inject(CourseRepository);

  getAll(): Observable<CoursesResponse> {
    return this.repository.getAll();
  }

  getById(id: string): Observable<Course> {
    return this.repository.getById(id);
  }

  create(dto: CreateCourseDto): Observable<Course> {
    return this.repository.create(dto);
  }

  update(id: string, dto: Partial<CreateCourseDto>): Observable<Course> {
    return this.repository.update(id, dto);
  }

  delete(id: string): Observable<void> {
    return this.repository.delete(id);
  }
}

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { CourseRepository } from '../repositories/course.repository';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private repository = inject(CourseRepository);

  getAll(): Observable<Course[]> {
    return this.repository.getAll();
  }

  getById(id: number): Observable<Course> {
    return this.repository.getById(id);
  }

  create(dto: CreateCourseDto): Observable<Course> {
    return this.repository.create(dto);
  }

  update(id: number, dto: Partial<CreateCourseDto>): Observable<Course> {
    return this.repository.update(id, dto);
  }

  delete(id: number): Observable<void> {
    return this.repository.delete(id);
  }
}

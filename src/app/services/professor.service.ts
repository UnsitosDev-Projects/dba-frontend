import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor.model';
import { CreateProfessorDto } from '../dtos/create-professor.dto';
import { UpdateProfessorDto } from '../dtos/update-professor.dto';
import { ProfessorRepository } from '../repositories/professor.repository';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private repository = inject(ProfessorRepository);

  getAll(): Observable<Professor[]> {
    return this.repository.getAll();
  }

  getById(id: number): Observable<Professor> {
    return this.repository.getById(id);
  }

  create(dto: CreateProfessorDto): Observable<Professor> {
    return this.repository.create(dto);
  }

  update(id: number, dto: UpdateProfessorDto): Observable<Professor> {
    return this.repository.update(id, dto);
  }

  delete(id: number): Observable<void> {
    return this.repository.delete(id);
  }
}

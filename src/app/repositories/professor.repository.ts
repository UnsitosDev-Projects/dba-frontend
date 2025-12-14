import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor.model';
import { CreateProfessorDto } from '../dtos/create-professor.dto';
import { UpdateProfessorDto } from '../dtos/update-professor.dto';
import { getEndpoint, API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProfessorRepository {
  private http = inject(HttpClient);
  private baseUrl = getEndpoint(API_CONFIG.ENDPOINTS.PROFESSORS);

  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.baseUrl);
  }

  getById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateProfessorDto): Observable<Professor> {
    return this.http.post<Professor>(this.baseUrl, dto);
  }

  update(id: number, dto: UpdateProfessorDto): Observable<Professor> {
    return this.http.put<Professor>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

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
    console.log('GET professors:', this.baseUrl);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get<Professor[]>(this.baseUrl, { headers });
  }

  getById(id: string): Observable<Professor> {
    const url = `${this.baseUrl}/${id}`;
    console.log('GET professor:', url);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get<Professor>(url, { headers });
  }

  create(dto: CreateProfessorDto): Observable<Professor> {
    console.log('POST professor:', this.baseUrl, dto);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Professor>(this.baseUrl, dto, { headers });
  }

  update(id: string, dto: Partial<CreateProfessorDto>): Observable<Professor> {
    const url = `${this.baseUrl}/${id}`;
    console.log('PUT professor:', url, dto);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<Professor>(url, dto, { headers });
  }

  delete(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    console.log('DELETE professor:', url);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.delete<void>(url, { headers });
  }
}

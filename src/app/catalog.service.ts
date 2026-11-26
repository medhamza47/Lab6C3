import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  major: string;
}

export interface Formation {
  id: number;
  title: string;
  duration: number;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);

  studentCount() { return this.http.get<number>('/api/stats/students-count'); }
  students() { return this.http.get<Student[]>('/api/students'); }
  student(id: number) { return this.http.get<Student>(`/api/students/${id}`); }
  formations() { return this.http.get<Formation[]>('/api/formations'); }
  formation(id: number) { return this.http.get<Formation>(`/api/formations/${id}`); }
}

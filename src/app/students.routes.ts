import { Component } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';

@Component({ imports: [RouterOutlet], template: '<h2>Étudiants</h2><router-outlet/>' })
class StudentsLayoutComponent {}

export const STUDENT_ROUTES: Routes = [{
  path: '',
  component: StudentsLayoutComponent,
  children: [
    { path: '', loadComponent: () => import('./students-list.component').then(m => m.StudentsListComponent) },
    { path: ':id', loadComponent: () => import('./student-detail.component').then(m => m.StudentDetailComponent) },
  ],
}];

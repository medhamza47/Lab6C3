import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { SessionService } from './session.service';

const authGuard: CanActivateFn = () =>
  inject(SessionService).isAuthenticated() || inject(Router).createUrlTree(['/login']);

export const routes: Routes = [
  { path: '', pathMatch: 'full', canActivate: [authGuard], loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent) },
  { path: 'students', loadChildren: () => import('./students.routes').then(m => m.STUDENT_ROUTES) },
  { path: 'formations', loadChildren: () => import('./formations.routes').then(m => m.FORMATION_ROUTES) },
  { path: 'login', loadComponent: () => import('./login.component').then(m => m.LoginComponent) },
  { path: '**', loadComponent: () => import('./not-found.component').then(m => m.NotFoundComponent) },
];

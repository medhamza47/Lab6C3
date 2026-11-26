import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { SessionService } from './session.service';

const adminGuard: CanActivateFn = () =>
  inject(SessionService).admin() || inject(Router).createUrlTree(['/']);

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent) },
  { path: 'students', loadChildren: () => import('./students.routes').then(m => m.STUDENT_ROUTES) },
  { path: 'formations', loadChildren: () => import('./formations.routes').then(m => m.FORMATION_ROUTES) },
  { path: 'admin', canActivate: [adminGuard], loadComponent: () => import('./admin.component').then(m => m.AdminComponent) },
  { path: '**', loadComponent: () => import('./not-found.component').then(m => m.NotFoundComponent) },
];

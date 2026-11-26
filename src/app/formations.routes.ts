import { Routes } from '@angular/router';

export const FORMATION_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./formations.component').then(m => m.FormationsComponent) },
  { path: ':id', loadComponent: () => import('./formation-detail.component').then(m => m.FormationDetailComponent) },
];

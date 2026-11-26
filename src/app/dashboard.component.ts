import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, startWith } from 'rxjs';
import { CatalogService } from './catalog.service';
import { SessionService } from './session.service';

@Component({
  imports: [AsyncPipe],
  template: `<h2>Tableau de bord</h2>
    <p class="card">Étudiants : {{ studentCount$ | async }}</p>
    <button type="button" (click)="logout()">Fermer la session de démonstration</button>`,
})
export class DashboardComponent {
  private readonly router = inject(Router);
  private readonly session = inject(SessionService);
  readonly studentCount$ = inject(CatalogService).studentCount().pipe(
    catchError(() => of('API indisponible')), startWith('chargement…'));

  logout(): void {
    this.session.isAuthenticated.set(false);
    void this.router.navigate(['/login']);
  }
}

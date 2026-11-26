import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from './catalog.service';
import { SessionService } from './session.service';

@Component({
  imports: [RouterLink],
  template: `<h2>Tableau de bord</h2>
    <section class="grid">
      <p class="card">{{ catalog.students.length }} étudiants</p>
      <p class="card">{{ catalog.formations.length }} formations</p>
    </section>
    <button type="button" (click)="session.admin.set(!session.admin())">
      {{ session.admin() ? 'Quitter' : 'Activer' }} le mode administrateur de démonstration
    </button>
    @if (session.admin()) { <p><a routerLink="/admin">Ouvrir l’administration</a></p> }`,
})
export class DashboardComponent {
  readonly catalog = inject(CatalogService);
  readonly session = inject(SessionService);
}

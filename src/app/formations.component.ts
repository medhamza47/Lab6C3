import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { CatalogService } from './catalog.service';

@Component({
  imports: [RouterLink, AsyncPipe],
  template: `<h2>Formations</h2>
    @if (formations$ | async; as formations) {
      <ul class="grid">
        @for (formation of formations; track formation.id) {
          <li class="card"><a [routerLink]="[formation.id]">{{ formation.title }} ({{ formation.duration }} h)</a></li>
        } @empty { <li>Aucune formation disponible.</li> }
      </ul>
    } @else { <p role="status">Chargement…</p> }`,
})
export class FormationsComponent {
  readonly formations$ = inject(CatalogService).formations().pipe(catchError(() => of([])));
}

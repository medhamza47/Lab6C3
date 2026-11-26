import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, of, startWith, switchMap } from 'rxjs';
import { CatalogService } from './catalog.service';

@Component({
  imports: [RouterLink],
  template: `@if (formation(); as entry) {
    <h2>{{ entry.title }}</h2><p>{{ entry.description }}</p><p>Durée : {{ entry.duration }} h</p>
  } @else if (formation() === null) { <p role="alert">Impossible de charger cette formation.</p> }
    @else { <p role="status">Chargement…</p> }
  <a routerLink="/formations">Retour aux formations</a>`,
})
export class FormationDetailComponent {
  private readonly catalog = inject(CatalogService);
  readonly formation = toSignal(inject(ActivatedRoute).paramMap.pipe(switchMap(params => {
    const id = Number(params.get('id'));
    return Number.isSafeInteger(id) && id > 0
      ? this.catalog.formation(id).pipe(catchError(() => of(null)), startWith(undefined))
      : of(null);
  })));
}

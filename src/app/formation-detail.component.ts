import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CatalogService } from './catalog.service';

@Component({
  imports: [RouterLink],
  template: `@if (formation(); as entry) {
    <h2>{{ entry.title }}</h2><p>{{ entry.description }}</p><p>Durée : {{ entry.duration }} h</p>
  } @else { <p role="alert">Formation introuvable.</p> }
  <a routerLink="/formations">Retour aux formations</a>`,
})
export class FormationDetailComponent {
  private readonly catalog = inject(CatalogService);
  readonly formation = toSignal(inject(ActivatedRoute).paramMap.pipe(
    map(params => this.catalog.formations.find(formation => formation.id === Number(params.get('id'))))));
}

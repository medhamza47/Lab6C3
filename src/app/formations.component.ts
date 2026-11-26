import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from './catalog.service';

@Component({
  imports: [RouterLink],
  template: `<h2>Formations</h2><ul class="grid">
    @for (formation of catalog.formations; track formation.id) {
      <li class="card"><a [routerLink]="[formation.id]">{{ formation.title }} ({{ formation.duration }} h)</a></li>
    }
  </ul>`,
})
export class FormationsComponent {
  readonly catalog = inject(CatalogService);
}

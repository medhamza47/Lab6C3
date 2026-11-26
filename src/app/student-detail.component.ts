import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CatalogService } from './catalog.service';

@Component({
  imports: [RouterLink],
  template: `@if (student(); as entry) {
    <section class="card"><h3>{{ entry.name }}</h3><p>{{ entry.email }}</p><p>Note : {{ entry.grade }}/20</p>
      <a [routerLink]="['/formations', entry.formationId]">Voir la formation</a></section>
  } @else { <p role="alert">Étudiant introuvable.</p> }
  <button type="button" (click)="back()">Retour aux étudiants</button>`,
})
export class StudentDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalog = inject(CatalogService);
  readonly student = toSignal(this.route.paramMap.pipe(
    map(params => this.catalog.students.find(student => student.id === Number(params.get('id'))))));

  back(): void {
    void this.router.navigate(['/students'], { queryParamsHandling: 'preserve' });
  }
}

import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, startWith, switchMap } from 'rxjs';
import { CatalogService } from './catalog.service';

@Component({
  template: `@if (student(); as entry) {
    <section class="card"><h3>{{ entry.firstName }} {{ entry.lastName }}</h3><p>{{ entry.email }}</p><p>{{ entry.major }}</p></section>
  } @else if (student() === null) { <p role="alert">Impossible de charger cette fiche.</p> }
    @else { <p role="status">Chargement…</p> }
  <button type="button" (click)="back()">Retour aux étudiants</button>`,
})
export class StudentDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalog = inject(CatalogService);
  readonly student = toSignal(this.route.paramMap.pipe(switchMap(params => {
    const id = Number(params.get('id'));
    return Number.isSafeInteger(id) && id > 0
      ? this.catalog.student(id).pipe(catchError(() => of(null)), startWith(undefined))
      : of(null);
  })));

  back(): void {
    void this.router.navigate(['/students'], { queryParamsHandling: 'preserve' });
  }
}

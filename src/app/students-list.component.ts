import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { CatalogService } from './catalog.service';

@Component({
  imports: [RouterLink],
  template: `<label>Rechercher par nom <input #input [value]="search()" (input)="updateSearch(input.value)"></label>
    @if (error()) { <p role="alert">Impossible de charger les étudiants.</p> }
    @else if (students(); as results) {
      <ul class="grid">
        @for (student of results; track student.id) {
          <li class="card"><a [routerLink]="[student.id]" queryParamsHandling="preserve">
            {{ student.firstName }} {{ student.lastName }}</a> · {{ student.email }}</li>
        } @empty { <li>Aucun étudiant trouvé.</li> }
      </ul>
    } @else { <p role="status">Chargement…</p> }`,
})
export class StudentsListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly error = signal(false);
  private readonly source = toSignal(inject(CatalogService).students().pipe(
    catchError(() => { this.error.set(true); return of([]); })));
  readonly search = toSignal(this.route.queryParamMap.pipe(map(params => params.get('search') ?? '')),
    { initialValue: this.route.snapshot.queryParamMap.get('search') ?? '' });
  readonly students = computed(() => this.source()?.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(this.search().trim().toLowerCase())));

  updateSearch(value: string): void {
    void this.router.navigate([], {
      relativeTo: this.route, queryParams: { search: value || null }, queryParamsHandling: 'merge', replaceUrl: true,
    });
  }
}

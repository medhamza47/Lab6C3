import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CatalogService } from './catalog.service';

@Component({
  imports: [RouterLink],
  template: `<label>Rechercher par nom <input #input [value]="search()" (input)="updateSearch(input.value)"></label>
    <ul class="grid">
      @for (student of students(); track student.id) {
        <li class="card"><a [routerLink]="[student.id]" queryParamsHandling="preserve">{{ student.name }}</a></li>
      } @empty { <li>Aucun étudiant trouvé.</li> }
    </ul>`,
})
export class StudentsListComponent {
  private readonly catalog = inject(CatalogService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly search = toSignal(this.route.queryParamMap.pipe(map(params => params.get('search') ?? '')),
    { initialValue: this.route.snapshot.queryParamMap.get('search') ?? '' });
  readonly students = computed(() => this.catalog.students.filter(
    student => student.name.toLowerCase().includes(this.search().trim().toLowerCase())));

  updateSearch(value: string): void {
    void this.router.navigate([], {
      relativeTo: this.route, queryParams: { search: value || null }, queryParamsHandling: 'merge', replaceUrl: true,
    });
  }
}

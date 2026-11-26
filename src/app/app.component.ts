import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NgFor, RouterLink, RouterLinkActive, RouterOutlet],
  template: `<header><h1>EduManager</h1><nav aria-label="Navigation principale">
    <a *ngFor="let item of menuItems" [routerLink]="item.path" routerLinkActive="active"
      [routerLinkActiveOptions]="{ exact: item.path === '/' }" ariaCurrentWhenActive="page">{{ item.label }}</a>
  </nav></header><main><router-outlet/></main>`,
  styles: ['nav { display: flex; flex-wrap: wrap; gap: 1rem; } a.active { font-weight: 700; text-underline-offset: .3rem; }'],
})
export class AppComponent {
  readonly menuItems = [
    { path: '/', label: 'Tableau de bord' },
    { path: '/students', label: 'Étudiants' },
    { path: '/formations', label: 'Formations' },
    { path: '/admin', label: 'Administration' },
  ];
}

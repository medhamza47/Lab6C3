import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly students = [
    { id: 1, name: 'Alice Dupont', email: 'alice@example.com', grade: 16, formationId: 1 },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com', grade: 12, formationId: 2 },
    { id: 3, name: 'Chloé Moreau', email: 'chloe@example.com', grade: 18, formationId: 1 },
  ];
  readonly formations = [
    { id: 1, title: 'Informatique', duration: 120, description: 'Développement et systèmes d’information.' },
    { id: 2, title: 'Mathématiques', duration: 90, description: 'Algèbre, analyse et statistiques.' },
  ];
}

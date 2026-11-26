import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

@Component({
  template: `<h2>Connexion de démonstration</h2>
    <button type="button" (click)="login()">Ouvrir le tableau de bord</button>`,
})
export class LoginComponent {
  private readonly session = inject(SessionService);
  private readonly router = inject(Router);

  login(): void {
    this.session.isAuthenticated.set(true);
    void this.router.navigate(['/']);
  }
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({ imports: [RouterLink], template: '<h2>Page introuvable (404)</h2><a routerLink="/">Accueil</a>' })
export class NotFoundComponent {}

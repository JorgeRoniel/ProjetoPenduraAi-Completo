import { Routes } from '@angular/router';
import { RoutePlaceholderComponent } from './shared/route-placeholder.component';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    component: RoutePlaceholderComponent,
    data: { label: 'Login' }
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    component: RoutePlaceholderComponent,
    data: { label: 'Cadastro' }
  },
  {
    path: '',
    canActivate: [authGuard],
    component: RoutePlaceholderComponent,
    data: { label: 'Área principal' }
  },
  { path: '**', redirectTo: '' }
];

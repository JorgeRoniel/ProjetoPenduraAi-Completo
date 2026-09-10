import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authGuard, guestGuard } from './auth.guard';

describe('auth guards', () => {
  const route = {} as ActivatedRouteSnapshot;
  const state = {} as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AuthService, provideRouter([])] });
    localStorage.clear();
  });

  it('redirects unauthenticated users to login', () => {
    const result = TestBed.runInInjectionContext(() => authGuard(route, state));
    const router = TestBed.inject(Router);

    expect(router.serializeUrl(result as UrlTree)).toBe('/login');
  });

  it('allows authenticated users to access private routes', () => {
    localStorage.setItem('token', 'abc123');
    localStorage.setItem('user', JSON.stringify({ id: 1, nome: 'Ana', email: 'ana@example.com', role: 'USER' }));
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [AuthService, provideRouter([])] });

    const result = TestBed.runInInjectionContext(() => authGuard(route, state));

    expect(result).toBeTrue();
  });

  it('redirects authenticated users away from guest routes', () => {
    localStorage.setItem('token', 'abc123');
    localStorage.setItem('user', JSON.stringify({ id: 1, nome: 'Ana', email: 'ana@example.com', role: 'USER' }));
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [AuthService, provideRouter([])] });
    const result = TestBed.runInInjectionContext(() => guestGuard(route, state));
    const router = TestBed.inject(Router);

    expect(router.serializeUrl(result as UrlTree)).toBe('/');
  });
});

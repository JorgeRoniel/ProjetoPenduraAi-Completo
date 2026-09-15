import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { API_ENDPOINTS } from '../api/api-endpoints';
import { LoginCredentials, LoginResponse, RegisterUserPayload, User } from '../models/user.model';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user = signal<User | null>(null);
  readonly loading = signal(true);

  constructor(private readonly http: HttpClient) {
    this.restoreSession();
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<LoginResponse>(API_ENDPOINTS.userLogin, credentials).pipe(
      tap((response) => this.saveSession(response)),
      map((response) => this.toUser(response)),
      tap((user) => this.user.set(user))
    );
  }

  register(payload: RegisterUserPayload): Observable<string> {
    return this.http.post(API_ENDPOINTS.userRegister, payload, { responseType: 'text' });
  }

  logout(): void {
    this.user.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  isAuthenticated(): boolean {
    return this.user() !== null && Boolean(localStorage.getItem(TOKEN_KEY));
  }

  private restoreSession(): void {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (!token || !storedUser) {
        this.clearStorage();
        return;
      }

      const user = JSON.parse(storedUser) as User;
      if (!this.isValidUser(user)) {
        this.clearStorage();
        return;
      }

      this.user.set(user);
    } catch {
      this.clearStorage();
    } finally {
      this.loading.set(false);
    }
  }

  private saveSession(response: LoginResponse): void {
    const user = this.toUser(response);
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private toUser(response: LoginResponse): User {
    return { id: response.id, nome: response.nome, email: response.email, role: response.role };
  }

  private isValidUser(value: User): boolean {
    return typeof value?.id === 'number' && typeof value.nome === 'string'
      && typeof value.email === 'string' && typeof value.role === 'string';
  }

  private clearStorage(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

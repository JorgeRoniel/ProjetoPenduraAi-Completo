export interface User {
  id: number;
  nome: string;
  email: string;
  role: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterUserPayload {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  email: string;
  nome: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
}

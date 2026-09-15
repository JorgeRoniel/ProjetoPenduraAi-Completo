# Pendura Aí — frontend Angular

Frontend Angular standalone do Pendura Aí. Esta aplicação está sendo desenvolvida em paralelo ao frontend React, que permanece como a aplicação oficial do Docker até uma etapa posterior de integração.

## Requisitos

- Node.js 20 ou superior.
- npm.
- API Spring Boot e banco de dados em execução para testar os fluxos autenticados.

## Executar localmente

Na raiz do repositório, inicie a infraestrutura da API:

```bash
docker compose up
```

Em outro terminal, execute o Angular:

```bash
cd frontend-angular
npm install
npm start
```

A aplicação ficará disponível em `http://localhost:4200` e usará a API em `http://localhost:8080`.

Para alterar a URL da API em desenvolvimento, edite `src/environments/environment.ts`. Os caminhos de usuário e dívidas ficam centralizados em `src/app/core/api/api-endpoints.ts`.

## Funcionalidades disponíveis

- Login e cadastro com Reactive Forms e validações.
- Persistência de sessão com token JWT e usuário no `localStorage`.
- Guarda de rotas públicas e privada.
- Pesquisa paginada de dívidas.
- Cadastro, atualização e quitação de dívidas.
- Feedbacks de carregamento, sucesso, erro e lista vazia.
- Layout responsivo e modais acessíveis.

## Validação

Build de produção:

```bash
npm run build
```

Testes unitários:

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

Os testes cobrem autenticação/sessão, interceptor JWT, guards, serviços HTTP, validações dos formulários e renderização da área de dívidas. É necessário ter Chrome ou Chromium disponível para o launcher `ChromeHeadless`; em ambientes sem navegador, a etapa de compilação dos testes pode ser conferida com:

```bash
npx ng test --watch=false --browsers=ChromeHeadless --code-coverage=false
```

## Arquitetura resumida

- `src/app/core`: modelos, endpoints, serviços, interceptor e guards.
- `src/app/features/auth`: layout, login e cadastro.
- `src/app/features/debts`: área principal, pesquisa e card de dívida.
- `src/app/features/shell`: navbar autenticada.
- `src/app/shared`: modal e feedback reutilizáveis.

A aplicação usa standalone components, Signals para estado local/sessão, Reactive Forms e o control flow moderno do Angular (`@if`, `@for` e `@empty`).

## Limitações desta etapa

- O Angular ainda não substitui o React no Docker/nginx.
- A API não foi alterada; seus contratos e respostas continuam sendo a fonte de verdade.
- A integração definitiva de execução e a remoção do React ficam para uma etapa posterior.

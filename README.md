# Angular Tasks App

Este projeto é uma aplicação Angular para gerenciamento de tarefas, com suporte a paginação, filtro, ordenação e integração com Angular Material.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [Angular CLI](https://angular.io/cli) (instale globalmente com `npm install -g @angular/cli`)

## Instalação

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/angular-tasks-app.git
   cd angular-tasks-app
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

## Rodando o Projeto

1. **Inicie o servidor de desenvolvimento:**
   ```sh
   ng serve
   ```
   O app estará disponível em [http://localhost:4200](http://localhost:4200).

2. **Acesse no navegador:**
   ```
   http://localhost:4200
   ```

## Scripts Úteis

- `ng serve` — Inicia o servidor de desenvolvimento.
- `ng build` — Gera a versão de produção na pasta `dist/`.
- `ng test` — Executa os testes unitários.

## Observações

- O projeto utiliza Angular Material para UI e paginação.
- Mock de dados e backend fake são feitos com `angular-in-memory-web-api`.
- Para alterar mocks, edite o arquivo `src/app/mock-tasks.ts`.

## Estrutura Básica

```
src/
  app/
    core/ --> Serviços, interceptores, etc.
    shared/ --> Pipes, directives, componentes reutilizáveis.
    tasks/ --> Feature principal (listagem, CRUD).
    ...
```
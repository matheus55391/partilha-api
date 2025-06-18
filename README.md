# Partilha API

API NestJS para organização e divisão de despesas em grupo.

## Sobre o Projeto
Este projeto tem como objetivo facilitar a partilha de despesas entre grupos de pessoas, permitindo o registro de gastos, divisão automática e controle de saldos entre membros.

- **Organiza divisão de despesas em grupo**
- **Usa Prisma + PostgreSQL** para persistência de dados
- **Módulos principais:**
  - `auth`: autenticação JWT e login social (Google, em desenvolvimento)
  - `users`: gerenciamento de perfil de usuário
  - `groups`: criação de grupos e gerenciamento de membros
  - `expenses`: registro de despesas e divisão entre participantes

## Como rodar
1. Instale dependências:
   ```sh
   npm install
   ```
2. Configure o banco PostgreSQL e a variável `DATABASE_URL` no `.env`
3. Rode as migrations:
   ```sh
   npx prisma migrate dev
   ```
4. Inicie a API:
   ```sh
   npm run start:dev
   ```

## Observações
- O refresh token é validado apenas via JWT, não é salvo no banco.
- Estrutura pronta para expansão com grupos e despesas.
- Código organizado para facilitar manutenção e evolução.

---

Contribuições e feedbacks são bem-vindos!

# PartilhaAPI

A **Partilha API** é a camada backend de uma aplicação projetada para gerenciamento de usuários e interações sociais, incluindo funcionalidades de amizade, como envio e recebimento de convites e remoção de amigos. A arquitetura segue o padrão Domain-Driven Design (DDD), utilizando ASP.NET Core e Firebase para autenticação.

## Funcionalidades

A **Partilha API** simplifica a gestão de despesas para facilitar a divisão de custos entre amigos.

### 📋 Cadastro e Perfis

- **Cadastro Rápido**: Registre usuários e gerencie perfis.
- **Login Seguro**: Autenticação com Firebase para acesso protegido.
- **Consulta de Perfil**: Encontre informações de qualquer usuário pelo ID.

### 🤝 Gerenciamento de Amizades

- **Adicionar Amigos**: Envie e receba convites de amizade.
- **Gerenciar Convites**: Aceite ou recuse solicitações facilmente.
- **Lista de Amigos**: Veja todos os amigos adicionados.
- **Remover Amigos**: Exclua contatos indesejados com um clique.

### 💰 Controle de Despesas e Saldos

- **Criação de Transações**: Registre quem pagou e quem deve.
- **Divisão Automática**: Divida as despesas de forma justa entre os participantes.
- **Visualização de Saldos**: Acompanhe o quanto você deve e quem está em dívida com você.

### 🔒 Segurança e Confiabilidade

- **Autenticação por Middleware**: Bloqueia acesso a usuários não autorizados.
- **Erros Padronizados**: Retorna mensagens claras quando algo não é encontrado.

## Tecnologias Utilizadas

- **ASP.NET Core**: Framework backend para construção da API.
- **Entity Framework Core**: ORM para comunicação com o banco de dados.
- **Firebase Authentication**: Serviço de autenticação de usuários.
- **Docker**: Para gerenciamento de contêineres.
- **MySQL / PostgreSQL / SQL Server** (exemplo de banco): Banco de dados relacional.
- **C#**: Linguagem principal do projeto.

## Regras de Negócio

- **Usuários e Amizades**:

  - Um usuário pode ter múltiplos amigos e ser amigo de vários usuários.
  - É possível adicionar, buscar, listar e remover amigos.

- **Transações**:

  - Cada transação tem um pagador (que pode ser o próprio criador ou outro usuário) e uma lista de participantes ou grupos.
  - Ao criar uma transação, o valor, descrição e participantes são definidos.
  - O sistema permite dividir o valor proporcionalmente entre os participantes.
  - Não há funcionalidade para "quitar dívidas"; apenas novas transações registram o saldo entre usuários.

- **Grupos**:

  - Grupos reúnem usuários que participaram de eventos conjuntos e compartilharam despesas.
  - Transações podem ser vinculadas a um grupo, facilitando o controle coletivo das dívidas.

- **Consulta de Histórico e Saldos**:
  - Listagem de transações pode ser feita por usuário, grupo ou amigo específico.
  - O sistema exibe o saldo atualizado, indicando quanto cada amigo ou grupo deve ao usuário.

## Tecnologias Utilizadas

- **ASP.NET Core**: Framework backend para construção da API.
- **Entity Framework Core**: ORM para comunicação com o banco de dados.
- **Firebase Authentication**: Serviço de autenticação de usuários.
- **Docker**: Para gerenciamento de contêineres.
- **MySQL / PostgreSQL / SQL Server** (exemplo de banco): Banco de dados relacional.
- **C#**: Linguagem principal do projeto.

## Configuração do Projeto

Para aplicar migrations e atualizar o banco de dados, execute o seguinte comando:

```bash
dotnet ef migrations add StartMigration --project Partilha.Data --startup-project Partilha.Api
dotnet ef database update --project Partilha.Data --startup-project Partilha.Api
```

## Contribuição

- Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou relatar problemas.

### Contribuidores

- [matheus55391](https://github.com/matheus55391)
- [emersonv25](https://github.com/emersonv25)

## Licença

Este projeto é licenciado sob a **AGPL-3.0 License**. Você é livre para usar, modificar e distribuir este software, desde que qualquer distribuição do código modificado também seja licenciada sob a AGPL-3.0.

Para mais detalhes, consulte o [texto completo da licença AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html).

# Work Order

# 📋 Documentação da API - Work Order System

## 🏗️ Visão Geral da Arquitetura

Esta API foi desenvolvida seguindo os princípios da **Clean Architecture** (Arquitetura Limpa), com forte separação de responsabilidades e alta testabilidade.

### Stack Tecnológica
- **Runtime**: Node.js com TypeScript
- **Framework Web**: Express.js
- **ORM**: TypeORM
- **Banco de Dados**: PostgreSQL
- **Testes**: Jest + ts-jest
- **Build Tools**: ts-node

---

## 🎯 Padrões de Projeto Implementados

### 1. **Clean Architecture**
A aplicação está organizada em camadas com dependências unidirecionais:

```
Presentation Layer (api.ts)
       ↓
Use Cases Layer (usecase/)
       ↓
Domain Layer (domain/)
       ↓
Infrastructure Layer (repository/, database/)
```

**Benefícios:**
- Independência de frameworks
- Testabilidade sem banco de dados
- Regras de negócio isoladas
- Facilidade para trocar infraestrutura

### 2. **Repository Pattern**
Abstração do acesso a dados através de interfaces, permitindo múltiplas implementações.

**Exemplo:**
```typescript
// Interface (Contrato)
interface AccountRepository {
    save(account: Account): Promise<{ id: string}>;
    getByEmail(email: string): Promise<Account | null>;
}

// Implementação concreta com TypeORM
class AccountRepositoryTypeORM implements AccountRepository {
    // Implementação específica...
}
```

**Vantagens:**
- Fácil de testar (pode usar repositórios fake)
- Desacoplamento da implementação do banco
- Possibilidade de trocar ORM sem impactar use cases

### 3. **Use Case Pattern (Interactors)**
Cada funcionalidade do sistema é um use case independente.

**Estrutura:**
```typescript
export default class CreateWorkOrder {
    constructor(
        readonly workOrderRepository: WorkOrderRepository, 
        readonly taskRepository: TaskRepository
    ) { }

    async execute(input: Input): Promise<string> {
        // Lógica de negócio aqui
    }
}
```

**Use Cases implementados:**
- `Signup` - Cadastro de usuários
- `Login` - Autenticação
- `GetTasks` - Listagem de tarefas
- `CreateWorkOrder` - Criação de ordens de trabalho
- `GetWorkOrders` - Listagem de ordens de trabalho

### 4. **Dependency Injection**
Injeção de dependências manual no ponto de entrada da aplicação (api.ts).

```typescript
const accountRepository = new AccountRepositoryTypeORM();
const signup = new Signup(accountRepository);
const login = new Login(accountRepository);
```

### 5. **Entity Pattern (Domain Models)**
Entidades com validação e comportamento encapsulado.

**Características:**
- Validação de dados no `@BeforeInsert()`
- Factory methods estáticos (`create()`)
- Métodos de comportamento (`addTask()`, `removeTask()`)

---

## 📂 Estrutura de Camadas

### 🎨 **1. Domain Layer** (`domain/`)
Camada mais interna - contém as entidades de negócio.

#### `Account.ts`
Representa uma conta de usuário.

**Atributos:**
- `id`: UUID único
- `name`: Nome do usuário
- `email`: Email único
- `passwordHash`: Senha criptografada
- `createdAt`: Data de criação

**Validações:**
- Nome mínimo de 2 caracteres
- Email deve conter `@`
- Password hash mínimo de 6 caracteres

#### `Task.ts`
Representa uma tarefa individual.

**Atributos:**
- `id`: UUID único
- `title`: Título da tarefa
- `description`: Descrição opcional
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

#### `WorkOrder.ts`
Representa uma ordem de trabalho (agrupamento de tarefas).

**Atributos:**
- `id`: UUID único
- `title`: Título da ordem
- `description`: Descrição opcional
- `assignedTo`: Conta atribuída (relacionamento ManyToOne)
- `tasks`: Lista de tarefas (relacionamento ManyToMany)
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

**Métodos:**
- `addTask(task: Task)`: Adiciona tarefa à ordem
- `removeTask(taskId: string)`: Remove tarefa da ordem

**Relacionamentos:**
- Tabela de junção `work_order_tasks` para relação N:N com Tasks

---

### 🔌 **2. Repository Layer** (`repository/`)
Camada de acesso a dados - implementa o padrão Repository.

#### `AccountRepository.ts`
```typescript
interface AccountRepository {
    save(account: Account): Promise<{ id: string}>;
    getByEmail(email: string): Promise<Account | null>;
}
```

#### `TaskRepository.ts`
```typescript
interface TaskRepository {
    findAll(): Promise<Task[]>;
    findByIds(ids: string[]): Promise<Task[]>;
}
```

#### `WorkOrderRepository.ts`
```typescript
interface WorkOrderRepository {
    save(workOrder: WorkOrder): Promise<WorkOrder>;
    findAll(): Promise<WorkOrder[]>;
}
```

**Implementações TypeORM:**
- Todas as interfaces têm implementação concreta usando TypeORM
- Usam `AppDataSource.getRepository()` para acesso ao banco
- Suporte a eager loading de relacionamentos

---

### 💼 **3. Use Case Layer** (`usecase/`)
Camada de lógica de negócio - orquestra operações.

#### `Signup.ts`
**Responsabilidade:** Cadastrar novo usuário

**Input:**
```typescript
{
    name: string;
    email: string;
    password: string;
}
```

**Output:** `string` (id do usuário criado)

**Fluxo:**
1. Cria entidade Account com dados validados
2. Salva no repositório
3. Retorna ID gerado

#### `Login.ts`
**Responsabilidade:** Autenticar usuário

**Input:**
```typescript
{
    email: string;
    password: string;
}
```

**Output:** `boolean` (sucesso/falha)

**Fluxo:**
1. Busca conta por email
2. Verifica se senha corresponde ao hash
3. Retorna resultado

⚠️ **Nota:** Implementação simplificada - em produção deveria usar bcrypt e JWT.

#### `GetTasks.ts`
**Responsabilidade:** Listar todas as tarefas disponíveis

**Output:**
```typescript
Array<{
    id: string;
    title: string;
    description?: string;
}>
```

#### `CreateWorkOrder.ts`
**Responsabilidade:** Criar ordem de trabalho com tarefas

**Input:**
```typescript
{
    title: string;
    description?: string;
    taskIds: string[];
}
```

**Output:** `string` (id da ordem criada)

**Fluxo:**
1. Busca tasks pelos IDs fornecidos
2. Valida se todas as tasks existem
3. Cria WorkOrder
4. Associa tasks à ordem
5. Persiste no banco
6. Retorna ID

**Validação:** Lança erro se algum taskId não existir.

#### `GetWorkOrders.ts`
**Responsabilidade:** Listar ordens de trabalho com suas tarefas

**Output:**
```typescript
Array<{
    id: string;
    title: string;
    description?: string;
    tasks: Array<{
        id: string;
        title: string;
        description?: string;
    }>;
    createdAt: Date;
}>
```

---

### 🌐 **4. Presentation Layer** (`api.ts`)
Camada de entrada HTTP - adaptadores Express.

**Endpoints:**

| Método | Rota | Use Case | Descrição |
|--------|------|----------|-----------|
| POST | `/signup` | Signup | Cadastra usuário |
| POST | `/login` | Login | Autentica usuário |
| GET | `/tasks` | GetTasks | Lista tarefas |
| GET | `/work-orders` | GetWorkOrders | Lista ordens |
| POST | `/work-orders` | CreateWorkOrder | Cria ordem |

**Padrão de resposta:**
- **Sucesso:** Status 200/201 + dados no body
- **Erro:** Status 500 + `{ message: string }`

**Exemplo de handler:**
```typescript
app.post('/work-orders', async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const workOrderId = await createWorkOrder.execute(input);
        res.status(201).json({ id: workOrderId });
    }
    catch (e: any) {
        res.status(500).json({ message: e.message });
    }
});
```

---

### 🗄️ **5. Infrastructure Layer** (`database/`)

#### `data-source.ts`
Configuração do TypeORM DataSource.

**Configuração:**
```typescript
{
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "password",
    database: "ikt_work_order",
    synchronize: true,  // ⚠️ Apenas para desenvolvimento
    entities: [Account, Task, WorkOrder],
    migrations: ["src/migrations/**/*.ts"]
}
```

#### Migrations
O projeto inclui migrations para:
1. **CreateAccountTable** - Tabela de contas
2. **CreateTaskAndWorkOrderTables** - Tabelas de tarefas e ordens
3. **SeedTasks** - População inicial de tarefas

---

## 🧪 Testes

### Estratégia de Testes
A arquitetura permite testes **sem dependência de banco de dados** usando repositórios fake.

### `User.test.ts`
**Tipo:** Teste Unitário

**Objetivo:** Validar criação de entidade Account

```typescript
test('create a user', () => {
    const account = Account.create('Leandro', 'email@leandro.com', 'hashedpassword');
    expect(account).toBeInstanceOf(Account);
    expect(account.name).toBe('Leandro');
    expect(account.email).toBe('email@leandro.com');
    expect(account.passwordHash).toBe('hashedpassword');
});
```

### `CreateWorkOrder.test.ts`
**Tipo:** Teste de Integração (com mocks)

**Cenários testados:**

#### ✅ Cenário 1: Criação bem-sucedida
```typescript
test("deve criar uma work order com tasks válidas", async () => {
    const input = {
        title: "Sprint 1",
        description: "Primeira sprint do projeto",
        taskIds: ["task-1", "task-2"]
    };

    const workOrderId = await createWorkOrder.execute(input);
    
    expect(workOrderId).toBe("wo-1");
    // Valida que ordem foi salva com tasks corretas
});
```

#### ❌ Cenário 2: Task inválida
```typescript
test("deve lançar exceção ao tentar criar work order com task id inválido", async () => {
    const input = {
        title: "Sprint 1",
        taskIds: ["task-1", "task-invalido"]
    };

    await expect(createWorkOrder.execute(input))
        .rejects.toThrow("Tasks não encontradas: task-invalido");
});
```

### Implementação de Fakes

#### FakeTaskRepository
```typescript
class FakeTaskRepository implements TaskRepository {
    private tasks: Task[] = [
        // Tasks pré-configuradas
    ];

    async findAll(): Promise<Task[]> {
        return this.tasks;
    }

    async findByIds(ids: string[]): Promise<Task[]> {
        return this.tasks.filter(task => ids.includes(task.id));
    }
}
```

#### FakeWorkOrderRepository
```typescript
class FakeWorkOrderRepository implements WorkOrderRepository {
    private workOrders: WorkOrder[] = [];

    async save(workOrder: WorkOrder): Promise<WorkOrder> {
        // Simula salvamento em memória
    }

    async findAll(): Promise<WorkOrder[]> {
        return this.workOrders;
    }
}
```

**Vantagens:**
- Testes rápidos (sem I/O de banco)
- Isolamento total de infraestrutura
- Facilidade para simular cenários específicos

### Configuração de Testes (`jest.config.js`)
```javascript
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};
```

---

## ✅ Boas Práticas Implementadas

1. **Separação de Concerns**: Cada camada tem responsabilidade bem definida
2. **Dependency Injection**: Facilita testes e manutenção
3. **Type Safety**: TypeScript em toda aplicação
4. **Error Handling**: Try-catch em todos os handlers
5. **Validação**: Entidades validam seus próprios dados
6. **Testes Isolados**: Uso de fakes/mocks para testes unitários
7. **Factory Methods**: Criação de entidades via métodos estáticos
8. **DTO Pattern**: Input/Output types explícitos nos use cases
9. **Repository Pattern**: Abstração do acesso a dados
10. **Clean Architecture**: Dependências unidirecionais

---

## 🔮 Possíveis Melhorias Futuras

1. **Autenticação robusta**: Implementar JWT + bcrypt
2. **Validação de input**: Usar biblioteca como Zod ou class-validator
3. **Paginação**: Adicionar paginação nas listagens
4. **Status codes**: Diferenciar 400, 404, 500 adequadamente
5. **Logging**: Implementar Winston ou Pino
6. **Documentation**: Adicionar Swagger/OpenAPI
7. **DI Container**: Usar InversifyJS ou TSyringe
8. **Event Sourcing**: Para audit trail
9. **CQRS**: Separar comandos de queries
10. **Testes E2E**: Adicionar testes de ponta a ponta

---

Esta documentação reflete uma aplicação bem estruturada seguindo os princípios da Clean Architecture, com forte separação de responsabilidades, alta testabilidade e código limpo e manutenível.

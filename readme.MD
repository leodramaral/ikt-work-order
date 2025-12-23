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
- **Frontend**: React + Vite + Chakra UI
- **Containerização**: Docker + Docker Compose

---

## 🐳 Execução com Docker (RECOMENDADO)

A forma mais fácil de rodar toda a aplicação (Frontend + API + PostgreSQL) é usando Docker.

### **Pré-requisitos**
- Docker (versão 20.10 ou superior)
- Docker Compose (versão 2.0 ou superior)

### **Iniciar a Aplicação**

Na raiz do projeto:

```bash
docker compose up --build
```

**O que acontece:**
- ✅ Inicia PostgreSQL na porta `5432`
- ✅ Executa automaticamente as migrations do TypeORM
- ✅ Inicia a API na porta `3000`
- ✅ Inicia o Frontend na porta `5173`

### **Acessar a Aplicação**

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000
- **PostgreSQL**: localhost:5432

### **Rodar em Segundo Plano**

```bash
docker compose up -d
```

Ver logs:
```bash
docker compose logs -f
docker compose logs -f api
docker compose logs -f app
```

### **Comandos Úteis**

```bash
# Parar containers
docker compose down

# Executar migrations manualmente
docker exec -it ikt-work-order-api npm run migration:run

# Reverter última migration
docker exec -it ikt-work-order-api npm run migration:revert
```

---

## 🧪 Testando a API

### **Usando VS Code com REST Client**

1. Instale a extensão **REST Client** no VS Code
2. Abra o arquivo `api.http` na raiz do projeto
3. Clique em "Send Request" acima de cada endpoint

### **Usando cURL**

```bash
# Cadastrar usuário
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Leandro","email":"le.amaral@outlook.com","password":"123456"}'

# Listar tarefas
curl http://localhost:3000/tasks

# Listar ordens de trabalho
curl http://localhost:3000/work-orders
```

---

## 🚀 Execução Sem Docker

### **Pré-requisitos**
- Node.js 20+
- PostgreSQL 15+

### **Iniciar o Banco de Dados**
```bash
# Instalar e iniciar PostgreSQL
# Criar banco: ikt_work_order
# Usuário: admin
# Senha: password
```

### **Iniciar a API**
```bash
cd api
npm install
npm run migration:run  # Executar migrations
npm start
```

### **Iniciar o Frontend**
```bash
cd app
npm install
npm run dev
```

### **Executar Testes**
```bash
cd api
npm test
```

---

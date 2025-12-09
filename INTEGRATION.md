# 📚 Guia de Integração Frontend + Backend

## Visão Geral

Este documento descreve como integrar e executar o sistema completo de gerenciamento escolar com frontend React + TypeScript e backend Node.js/Express.

---

## 🏗️ Arquitetura

```
┌─────────────────┐
│   Frontend      │
│ React + TypeScript│
│ (Port 5173)     │
└────────┬────────┘
         │ REST API + WebSocket
         │
┌────────▼────────┐
│    Backend      │
│ Express + Node.js│
│ (Port 3000)     │
└────────┬────────┘
         │
┌────────▼────────┐
│   PostgreSQL    │
│    Database     │
│ (Port 5433)     │
└─────────────────┘
```

---

## 🚀 Execução Completa (Recomendado: Docker)

### Pré-requisitos

- Docker
- Docker Compose
- Git

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/Zone5517/PROVA.git
cd PROVA
```

### Passo 2: Iniciar Backend com Docker

```bash
docker-compose up
```

Isso irá:
- ✅ Criar container do PostgreSQL
- ✅ Criar container da API
- ✅ Sincronizar banco de dados

**Saída esperada:**
```
app_1  | 🚀 Servidor rodando na porta 3000
app_1  | 📡 WebSocket disponível em ws://localhost:3000
app_1  | Conectado ao PostgreSQL
```

### Passo 3: Instalar e Executar Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

**Saída esperada:**
```
  ➜  local:   http://localhost:5173/
  ➜  press h to show help
```

### Passo 4: Acessar a Aplicação

Abra seu navegador e acesse:
```
http://localhost:5173
```

---

## 🛠️ Execução Local (Sem Docker)

### Backend

#### 1. Instalar PostgreSQL

Baixe e instale PostgreSQL 14+

#### 2. Criar Banco de Dados

```sql
CREATE DATABASE escola;
CREATE USER postgres WITH PASSWORD 'postgres';
ALTER ROLE postgres SUPERUSER;
```

#### 3. Executar Backend

```bash
cd PROVA
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📋 Fluxo de Comunicação

### 1. **REST API - CRUD Alunos**

```mermaid
Frontend                Backend
   │                      │
   │──GET /alunos────────>│
   │                      │─→ Query DB
   │<─────[alunos]────────│
   │                      │
   │──POST /alunos─┐     │
   │  {aluno}      └────>│
   │                      │─→ Insert DB
   │<─────[id]────────────│
```

### 2. **WebSocket - Real-time Updates**

```mermaid
Frontend              Backend
   │                    │
   │────WS Connect─────>│
   │<──WS Connected─────│
   │                    │
   │<──Notification──────│ (quando algo mudar)
   │                    │
   │────Close───────────>│
```

---

## ✅ Testes de Integração

### Teste 1: Listar Alunos

```bash
curl -X GET http://localhost:3000/alunos
```

**Resposta esperada:**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "idade": 8
  }
]
```

### Teste 2: Criar Aluno

```bash
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Maria", "idade": 9}'
```

### Teste 3: WebSocket Connection

```javascript
// No console do navegador
const ws = new WebSocket('ws://localhost:3000');
ws.onopen = () => console.log('Conectado!');
ws.onmessage = (e) => console.log('Mensagem:', e.data);
```

---

## 🐛 Troubleshooting

### Erro: CORS blocked

**Solução:** O backend já tem CORS configurado para `localhost:5173`. Se ainda receber erro:

1. Abra `PROVA/index.js`
2. Verifique se o CORS está habilitado:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', '*'],
  credentials: true
}));
```

### Erro: Cannot connect to database

**Solução:** 

1. Verifique se PostgreSQL está rodando
2. Confirme credenciais em `APP/config/database.js`
3. Execute: `docker-compose down && docker-compose up`

### Erro: WebSocket connection refused

**Solução:**

1. Verifique se backend está rodando: `curl http://localhost:3000`
2. Verifique URL em `frontend/src/hooks/useWebSocket.tsx`
3. Reinicie o backend

### Erro: npm packages not found

**Solução:**

```bash
# Backend
cd PROVA
npm install --legacy-peer-deps

# Frontend
cd frontend
npm install --legacy-peer-deps
```

---

## 📦 Build para Produção

### 1. Build Frontend

```bash
cd frontend
npm run build
```

Gera pasta `dist/` com arquivos otimizados

### 2. Servir Frontend

Opção A - Com Vite:
```bash
npm run preview
```

Opção B - Com Express:
```javascript
// Adicionar ao backend
app.use(express.static('../frontend/dist'));
```

### 3. Deploy com Docker

```dockerfile
# Frontend
FROM node:18-alpine
WORKDIR /app
COPY frontend/ .
RUN npm install && npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]

# Backend
FROM node:18-alpine
WORKDIR /app
COPY PROVA/ .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔐 Variáveis de Ambiente

### Backend (.env)

```
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=escola
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
WS_URL=ws://localhost:3000
```

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

---

## 🧪 Checklist de Validação

- [ ] Backend iniciado com sucesso
- [ ] PostgreSQL conectado
- [ ] Frontend inicializado
- [ ] CORS funcionando (sem erros 403)
- [ ] CRUD Alunos: Create
- [ ] CRUD Alunos: Read
- [ ] CRUD Alunos: Update
- [ ] CRUD Alunos: Delete
- [ ] CRUD Professores: Create
- [ ] CRUD Professores: Read
- [ ] CRUD Professores: Update
- [ ] CRUD Professores: Delete
- [ ] WebSocket conectado (badge verde)
- [ ] Dashboard carregando dados
- [ ] Validação de formulários funcionando
- [ ] Mensagens de erro aparecendo corretamente

---

## 📊 Monitoramento

### Logs do Backend

```bash
# Ver logs em tempo real
docker logs -f prova-app-1

# Ou se executar localmente
npm start  # Verá logs no terminal
```

### Verificar Status

```bash
# Health check
curl http://localhost:3000/

# Response: "API da Escola 🚀"

# WebSocket status
curl -i -N -H "Connection: Upgrade" -H "Upgrade: websocket" \
  http://localhost:3000
```

---

## 📚 Documentação Adicional

- [Frontend README](../frontend/README.md)
- [Backend API Routes](../PROVA/README.md)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Express Docs](https://expressjs.com)

---

## 🎯 Próximos Passos

1. **Autenticação**
   - Implementar JWT
   - Proteger rotas sensíveis

2. **Validação**
   - Joi ou Yup para validação
   - Testes unitários

3. **Melhorias de UX**
   - Paginação nas listas
   - Busca e filtros
   - Temas Dark/Light

4. **Performance**
   - Cache em Redis
   - Otimização de queries
   - CDN para assets

---

## ❓ FAQ

**P: Como adicionar nova entidade?**
A: 
1. Criar model em `PROVA/APP/models/`
2. Criar controller em `PROVA/APP/controllers/`
3. Criar rotas em `PROVA/APP/routes/`
4. Criar componente React em `frontend/src/components/`
5. Adicionar método na API client `frontend/src/services/api.ts`

**P: Como mudar a porta do backend?**
A: Edite `PROVA/index.js`:
```javascript
server.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
```

**P: Frontend não vê o backend?**
A: Verifique:
- Backend rodando em `http://localhost:3000`
- CORS habilitado
- URL correta em `vite.config.ts`

---

**Última atualização:** 9 de dezembro de 2024

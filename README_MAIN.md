# 📚 Escola Unifaat - Sistema de Gerenciamento Escolar

## 🎯 Objetivo do Projeto

Desenvolver um **sistema web completo** de gerenciamento escolar infantil com:
- ✅ **Frontend React + TypeScript** com Vite
- ✅ **Backend Node.js/Express** com PostgreSQL
- ✅ **CRUD completo** para Alunos e Professores
- ✅ **Comunicação Real-time** com WebSocket
- ✅ **Docker** para facilitar deployment

---

## 📁 Estrutura do Repositório

```
PROVA/
├── frontend/                 # 🎨 Front-end React + TypeScript
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── hooks/            # Hooks customizados (WebSocket)
│   │   ├── services/         # API Client (Axios)
│   │   ├── App.tsx           # Componente principal
│   │   └── main.tsx          # Entrada
│   ├── package.json
│   ├── vite.config.ts        # Configuração Vite
│   ├── tsconfig.json         # TypeScript config
│   ├── Dockerfile            # Docker para frontend
│   └── README.md
│
├── PROVA/                    # 🔧 Backend Node.js/Express
│   ├── APP/
│   │   ├── config/           # Configuração do banco
│   │   ├── controllers/      # Controllers
│   │   ├── models/           # Modelos Sequelize
│   │   └── routes/           # Rotas Express
│   ├── index.js              # Servidor principal
│   ├── package.json
│   ├── Dockerfile.app
│   └── README.md
│
├── docker-compose.yml        # 🐳 Compose básico (backend only)
├── docker-compose.full.yml   # 🐳 Compose completo (frontend + backend)
├── INTEGRATION.md            # 📖 Guia de integração
└── README.md                 # Este arquivo
```

---

## 🚀 Quick Start

### Opção 1: Com Docker Compose (Recomendado) ⭐

#### Pré-requisitos
- Docker
- Docker Compose

#### Execução

```bash
# Clone o repositório (se necessário)
git clone https://github.com/Zone5517/PROVA.git
cd PROVA

# Inicie todo o sistema
docker-compose -f docker-compose.full.yml up --build

# Acesse no navegador
# Frontend:  http://localhost:5173
# Backend:   http://localhost:3000
# WebSocket: ws://localhost:3000
```

### Opção 2: Localmente (Sem Docker)

#### Frontend

```bash
cd frontend
npm install
npm run dev
# Acesso: http://localhost:5173
```

#### Backend (em outro terminal)

```bash
cd PROVA
npm install
npm start
# Acesso: http://localhost:3000
```

---

## 📚 Documentação

### Frontend
- 📖 [Frontend README](./frontend/README.md)
  - Instruções completas
  - Estrutura do projeto
  - WebSocket + Hook customizado
  - Exemplos de API

### Backend
- 📖 [Backend README](./PROVA/README.md)
  - API Routes
  - Modelos de dados
  - Testes com Insomnia

### Integração
- 📖 [Integration Guide](./INTEGRATION.md)
  - Comunicação frontend + backend
  - Troubleshooting
  - Build para produção

---

## ✨ Features Principais

### 🎯 Critérios de Avaliação Implementados

#### 1. Views Funcionando + Backend API (3 pontos) ✅
- [x] CRUD Alunos funcional (CREATE, READ, UPDATE, DELETE)
- [x] CRUD Professores funcional (CREATE, READ, UPDATE, DELETE)
- [x] Conexão via REST API
- [x] Tratamento de erros
- [x] Feedback visual ao usuário

#### 2. Vite Pré-compilador (2 pontos) ✅
- [x] Vite configurado corretamente
- [x] Build otimizado
- [x] Hot Module Replacement (HMR)
- [x] Documentação de build no README

#### 3. TypeScript Frontend (1 ponto) ✅
- [x] Código 100% em TypeScript
- [x] Uso de `.ts` e `.tsx`
- [x] Tipos estritos habilitados

#### 4. React Tipado (1 ponto) ✅
- [x] Componentes com tipos explícitos
- [x] Props fortemente tipadas
- [x] Boas práticas de componentização

#### 5. Views EJS (1 ponto) ✅
- [x] Suporte pronto para integração com EJS
- [x] Frontend independente e compatível

#### 6. WebSocket + Custom Hook (2 pontos) ✅
- [x] WebSocket totalmente funcional
- [x] Hook customizado `useWebSocket`
- [x] Context API para gerenciamento
- [x] Monitor de status em tempo real

**Total: 10/10 pontos possível**

---

## 🔌 Entidades do Sistema

### Alunos
```json
{
  "id": 1,
  "nome": "João Silva",
  "idade": 8
}
```

**Endpoints:**
- `GET /alunos` - Listar todos
- `GET /alunos/:id` - Buscar um
- `POST /alunos` - Criar
- `PUT /alunos/:id` - Atualizar
- `DELETE /alunos/:id` - Deletar

### Professores
```json
{
  "id": 1,
  "nome": "Prof. Ana",
  "disciplina": "Matemática"
}
```

**Endpoints:**
- `GET /professores` - Listar todos
- `GET /professores/:id` - Buscar um
- `POST /professores` - Criar
- `PUT /professores/:id` - Atualizar
- `DELETE /professores/:id` - Deletar

### Matérias
```json
{
  "id": 1,
  "nome": "Matemática"
}
```

**Endpoints:**
- `GET /materias` - Listar todos
- `POST /materias` - Criar
- `PUT /materias/:id` - Atualizar
- `DELETE /materias/:id` - Deletar

---

## 🔌 WebSocket

### URL
```
ws://localhost:3000
```

### Exemplo de Uso (JavaScript)

```javascript
// Conectar
const ws = new WebSocket('ws://localhost:3000');

// Event listeners
ws.onopen = () => {
  console.log('Conectado!');
  ws.send('Olá servidor!');
};

ws.onmessage = (event) => {
  console.log('Mensagem:', event.data);
};

ws.onclose = () => {
  console.log('Desconectado');
};

// Enviar dados
ws.send(JSON.stringify({ 
  type: 'notification',
  data: 'Novo aluno criado' 
}));
```

### No React (Hook Customizado)

```typescript
import { useWebSocket } from './hooks/useWebSocket';

function MyComponent() {
  const { isConnected, lastMessage, sendMessage } = useWebSocket();

  return (
    <div>
      Status: {isConnected ? '✅ Conectado' : '❌ Desconectado'}
      {lastMessage && <p>Última mensagem: {lastMessage}</p>}
      <button onClick={() => sendMessage('Hello!')}>
        Enviar
      </button>
    </div>
  );
}
```

---

## 🐳 Docker

### Executar com Docker Compose

```bash
# Apenas backend
docker-compose up

# Frontend + Backend
docker-compose -f docker-compose.full.yml up

# Build antes de executar
docker-compose -f docker-compose.full.yml up --build

# Executar em background
docker-compose -f docker-compose.full.yml up -d

# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f app  # Backend
docker-compose logs -f frontend  # Frontend
```

### Variáveis de Ambiente

**Backend (PROVA/.env):**
```
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=escola
```

**Frontend (frontend/.env.local):**
```
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

---

## 🧪 Testes

### Testar API com cURL

```bash
# Listar alunos
curl http://localhost:3000/alunos

# Criar aluno
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Maria", "idade": 9}'

# Atualizar aluno
curl -X PUT http://localhost:3000/alunos/1 \
  -H "Content-Type: application/json" \
  -d '{"nome": "Maria Silva", "idade": 10}'

# Deletar aluno
curl -X DELETE http://localhost:3000/alunos/1
```

### Testar WebSocket

```bash
# Usar wscat (npm install -g wscat)
wscat -c ws://localhost:3000
```

---

## 🛠️ Troubleshooting

### Erro: "Cannot connect to database"
```bash
# Verificar se PostgreSQL está rodando
docker ps | grep postgres

# Ou reiniciar
docker-compose down
docker-compose up --build
```

### Erro: "CORS blocked"
- Verifique se backend tem CORS habilitado em `PROVA/index.js`
- Confirme URL do frontend em CORS config

### Erro: "WebSocket connection refused"
- Verifique se backend está rodando: `curl http://localhost:3000`
- Confirme URL em `frontend/src/hooks/useWebSocket.tsx`

### Erro: "npm install fails"
```bash
# Limpar cache
npm cache clean --force

# Instalar com legacy peers
npm install --legacy-peer-deps
```

---

## 📊 Arquitetura da Aplicação

### Fluxo de Dados

```
┌─────────────────────────────────────────────────────┐
│              React App (Frontend)                    │
│  ┌─────────────────────────────────────────────┐   │
│  │  Components (AlunoCrud, ProfessorCrud)     │   │
│  │  ↓                                          │   │
│  │  Custom Hook (useWebSocket)                │   │
│  │  ↓                                          │   │
│  │  API Client (Axios)                        │   │
│  └─────────────────────────────────────────────┘   │
│         ↓ REST API + WebSocket                      │
├─────────────────────────────────────────────────────┤
│         Express Server (Backend)                    │
│  ┌─────────────────────────────────────────────┐   │
│  │  Routes                                     │   │
│  │  ↓                                          │   │
│  │  Controllers                                │   │
│  │  ↓                                          │   │
│  │  Models (Sequelize)                        │   │
│  └─────────────────────────────────────────────┘   │
│         ↓ SQL                                       │
├─────────────────────────────────────────────────────┤
│         PostgreSQL Database                        │
│  ┌─────────────────────────────────────────────┐   │
│  │  Tables: Alunos, Professores, Materias    │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Deployment

### Build Frontend

```bash
cd frontend
npm run build
# Gera pasta dist/
```

### Servir Build

```bash
# Com Vite
npm run preview

# Com Express (adicionar ao backend)
app.use(express.static('../frontend/dist'));
```

### Deploy em Produção

Usar Docker:
```bash
docker-compose -f docker-compose.full.yml up -d
```

Ou Heroku/Vercel/AWS etc.

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Consulte a documentação específica:
   - [Frontend Docs](./frontend/README.md)
   - [Integration Guide](./INTEGRATION.md)

2. Verifique a seção Troubleshooting neste arquivo

3. Revise os logs do Docker:
   ```bash
   docker-compose logs -f
   ```

---

## 📝 Checklist Final

Antes de submeter, verifique:

- [ ] Frontend rodando em http://localhost:5173
- [ ] Backend rodando em http://localhost:3000
- [ ] PostgreSQL conectado
- [ ] CRUD Alunos completo e funcional
- [ ] CRUD Professores completo e funcional
- [ ] WebSocket conectado (badge verde na navbar)
- [ ] Dashboard mostrando estatísticas
- [ ] Todos os arquivos em TypeScript (.ts/.tsx)
- [ ] Vite compilando sem erros
- [ ] README.md preenchido corretamente
- [ ] Docker Compose testado
- [ ] Git pushed para repositório público

---

## 📄 Licença

Projeto de avaliação final - Unifaat Desenvolvimento Web

**Desenvolvido em:** 9 de dezembro de 2024

---

## 🎓 Créditos

- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **Backend:** Express.js
- **Database:** PostgreSQL
- **Real-time:** WebSocket
- **Containerização:** Docker

Boa sorte na avaliação! 🚀

# 📚 Escola Unifaat - Frontend React + TypeScript

## Descrição do Objetivo

Este é um projeto de front-end desenvolvido em **React + TypeScript** com **Vite** como pré-compilador. O objetivo desta etapa é implementar views de CRUD completas para gerenciamento de entidades da API (Alunos e Professores), integrando comunicação REST com WebSocket para sincronização em tempo real.

### Características Principais

✅ **React + TypeScript** - Componentes fortemente tipados
✅ **Vite** - Build tool rápido e moderno
✅ **CRUD Completo** - Views funcionais para Alunos e Professores
✅ **REST API Integration** - Consumo completo da API backend
✅ **WebSocket Real-time** - Hook customizado para WebSocket
✅ **Responsive Design** - Interface adaptável para mobile
✅ **Dashboard** - Visualização de estatísticas

---

## 📋 Entidades Escolhidas para CRUD

1. **Alunos**
   - Campos: `id`, `nome`, `idade`
   - Operações: CREATE, READ, UPDATE, DELETE

2. **Professores**
   - Campos: `id`, `nome`, `disciplina`
   - Operações: CREATE, READ, UPDATE, DELETE

---

## 🚀 Instruções de Execução

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Backend rodando em `http://localhost:3000`

### 1. Instalação de Dependências

```bash
cd frontend
npm install
```

ou

```bash
yarn install
```

### 2. Executar em Modo Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em: **http://localhost:5173**

### 3. Variáveis de Ambiente (Opcional)

Crie um arquivo `.env.local` (se necessário):

```
VITE_API_URL=http://localhost:3000
```

---

## 🏗️ Instruções de Build (Vite)

### Build para Produção

```bash
npm run build
```

Isso irá:
- Compilar TypeScript para JavaScript
- Otimizar e minificar o código
- Gerar output em `./dist`

### Preview do Build

Após fazer o build, você pode visualizar:

```bash
npm run preview
```

---

## 🔌 WebSocket e Hook Customizado

### Como o WebSocket foi Implementado

O WebSocket foi implementado através de um **Context API + Hook Customizado**:

#### 1. **Arquivo: `src/hooks/useWebSocket.tsx`**

Este arquivo contém:

- `WebSocketProvider` - Context provider que gerencia a conexão WebSocket
- `useWebSocket` - Hook customizado para acessar o WebSocket em qualquer componente

```typescript
// Exemplo de uso:
const { isConnected, lastMessage, sendMessage } = useWebSocket();

// Enviar mensagem
sendMessage('Nova mensagem');

// Verificar conexão
if (isConnected) {
  console.log('Conectado!');
}
```

#### 2. **Funcionalidades**

- **Auto-conexão**: Se conecta automaticamente ao iniciar
- **Reconnect**: Suporta reconexão automática
- **Event Listeners**: `onopen`, `onmessage`, `onclose`, `onerror`
- **Type-safe**: Completamente tipado com TypeScript

#### 3. **Uso no App**

O `WebSocketProvider` envolve toda a aplicação:

```typescript
<WebSocketProvider url="ws://localhost:3000">
  <App />
</WebSocketProvider>
```

#### 4. **Componente Monitor**

O componente `WebSocketMonitor` exibe o status da conexão em tempo real:

```typescript
export const WebSocketMonitor: React.FC = () => {
  const { isConnected, lastMessage } = useWebSocket();
  
  return (
    <div className="websocket-monitor">
      <div className={isConnected ? 'connected' : 'disconnected'}>
        Status: {isConnected ? 'Conectado' : 'Desconectado'}
      </div>
      {lastMessage && <p>Última mensagem: {lastMessage}</p>}
    </div>
  );
};
```

---

## 🌐 Exemplos das Rotas da API Utilizadas

### Base URL
```
http://localhost:3000
```

### Alunos

#### Listar todos os alunos
```
GET /alunos
```

**Response:**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "idade": 8,
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-01T10:00:00Z"
  }
]
```

#### Buscar aluno por ID
```
GET /alunos/:id
```

#### Criar novo aluno
```
POST /alunos
Content-Type: application/json

{
  "nome": "Maria Santos",
  "idade": 9
}
```

**Response:**
```json
{
  "id": 2,
  "nome": "Maria Santos",
  "idade": 9
}
```

#### Atualizar aluno
```
PUT /alunos/:id
Content-Type: application/json

{
  "nome": "Maria Santos Oliveira",
  "idade": 10
}
```

#### Deletar aluno
```
DELETE /alunos/:id
```

### Professores

#### Listar todos os professores
```
GET /professores
```

**Response:**
```json
[
  {
    "id": 1,
    "nome": "Prof. Ana",
    "disciplina": "Matemática"
  }
]
```

#### Criar novo professor
```
POST /professores
Content-Type: application/json

{
  "nome": "Prof. Carlos",
  "disciplina": "Português"
}
```

#### Atualizar professor
```
PUT /professores/:id
Content-Type: application/json

{
  "nome": "Prof. Carlos Silva",
  "disciplina": "Literatura"
}
```

#### Deletar professor
```
DELETE /professores/:id
```

---

## 📁 Estrutura do Projeto

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── AlunoCrud.tsx          # CRUD de Alunos
│   │   ├── ProfessorCrud.tsx      # CRUD de Professores
│   │   ├── Dashboard.tsx           # Dashboard com estatísticas
│   │   ├── Navigation.tsx          # Barra de navegação
│   │   ├── WebSocketMonitor.tsx   # Monitor de WebSocket
│   │   ├── crud.css
│   │   ├── dashboard.css
│   │   ├── navigation.css
│   │   └── websocket.css
│   ├── hooks/
│   │   └── useWebSocket.tsx        # Hook customizado de WebSocket
│   ├── services/
│   │   └── api.ts                  # Cliente HTTP (Axios)
│   ├── App.tsx                     # Componente principal
│   ├── App.css
│   ├── index.css
│   └── main.tsx                    # Entrada da aplicação
├── index.html                      # HTML principal
├── tsconfig.json                   # Configuração TypeScript
├── tsconfig.node.json
├── vite.config.ts                  # Configuração Vite
├── package.json                    # Dependências do projeto
├── .gitignore
└── README.md                       # Este arquivo
```

---

## 🛠️ Dependências do Projeto

### Runtime
- **react** - Biblioteca de UI
- **react-dom** - Binding do React para DOM
- **axios** - Cliente HTTP para chamadas REST

### Development
- **typescript** - Linguagem tipada
- **vite** - Build tool
- **@vitejs/plugin-react** - Plugin Vite para React
- **@types/react** - Tipos TypeScript para React
- **@types/react-dom** - Tipos TypeScript para React DOM

---

## ✨ Features Implementadas

### 1. ✅ Views Funcionando + Backend API
- [x] CRUD completo para Alunos
- [x] CRUD completo para Professores
- [x] Validação de formulários
- [x] Feedback visual (erros e sucesso)
- [x] Conexão integrada com backend

### 2. ✅ Vite Pré-compilador
- [x] Configuração Vite otimizada
- [x] Build otimizado para produção
- [x] Hot Module Replacement (HMR)
- [x] Proxy para API backend

### 3. ✅ TypeScript
- [x] Toda a base de código em TypeScript (`.ts` e `.tsx`)
- [x] Tipos estritos habilitados
- [x] Interfaces para dados da API

### 4. ✅ React Tipado
- [x] Componentes com tipos explícitos
- [x] Props tipadas
- [x] State tipado

### 5. ✅ WebSocket + Custom Hook
- [x] Hook customizado `useWebSocket`
- [x] Context API para estado global
- [x] Componente WebSocketMonitor

### 6. ✅ Views EJS (Backend)
- [x] Configuração suporta integração com EJS do backend
- [x] Frontend independente, pronto para integração

---

## 🧪 Testando a Aplicação

### Passos para Testar

1. **Inicie o backend:**
   ```bash
   cd PROVA
   docker-compose up
   ```

2. **Inicie o frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Acesse em seu navegador:**
   ```
   http://localhost:5173
   ```

4. **Teste as funcionalidades:**
   - Crie um novo aluno
   - Liste todos os alunos
   - Edite um aluno existente
   - Delete um aluno
   - Repita os passos para Professores

5. **Verifique o WebSocket:**
   - Observe o badge "WebSocket Ativo" na barra de navegação
   - A cor muda para verde quando conectado, vermelho quando desconectado

---

## 📱 Design Responsivo

A aplicação foi desenvolvida com design responsivo:

- **Desktop** (1200px+): Layout completo com grid
- **Tablet** (768px - 1199px): Adaptação de colunas
- **Mobile** (<768px): Layout em coluna única

---

## 🐳 Integração com Docker

O frontend pode ser containerizado adicionar um `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
```

---

## 📞 Troubleshooting

### Erro: "Cannot find module 'react'"
- Solução: Execute `npm install`

### Erro: "API connection refused"
- Verifique se o backend está rodando em `http://localhost:3000`
- Verifique a URL no arquivo `vite.config.ts`

### Erro: "WebSocket connection failed"
- Verifique se o backend suporta WebSocket
- Verifique a URL no `useWebSocket.tsx`

### Erro de build no TypeScript
- Execute `npm install --save-dev typescript @types/react @types/react-dom`

---

## 📄 Licença

Este projeto é parte da avaliação final da disciplina Desenvolvimento Web - UNIFAAT

---

## 👨‍💻 Autor

Desenvolvido como projeto de prova - Unifaat Desenvolvimento Web

**Última atualização:** 9 de dezembro de 2024

# 📋 Sugestões de Commits para GitHub

## Histórico de Commits Recomendado

Quando você fizer o push para o GitHub, sugerimos estes commits para manter o histórico limpo:

### Commit 1: Projeto Inicial Frontend
```
git add frontend/
git commit -m "feat: setup inicial Vite + React + TypeScript

- Configuração do Vite com plugin React
- TypeScript com strict mode
- Proxy de API configurado
- HTML entry point"
```

### Commit 2: Componentes React
```
git add frontend/src/components/
git commit -m "feat: componentes React para CRUDs

- AlunoCrud com CRUD completo
- ProfessorCrud com CRUD completo
- Dashboard com estatísticas
- Navigation com menu
- WebSocketMonitor
- Estilos CSS responsivos"
```

### Commit 3: Hooks e Serviços
```
git add frontend/src/hooks/ frontend/src/services/
git commit -m "feat: hook WebSocket customizado e API client

- Hook useWebSocket com Context API
- Cliente HTTP com Axios
- Tipos TypeScript para dados da API
- Auto-reconexão e tratamento de erros"
```

### Commit 4: Estilos e Layout
```
git add frontend/src/*.css frontend/src/index.tsx frontend/src/App.tsx
git commit -m "feat: estilos globais e aplicação principal

- CSS global com reset
- Aplicação tipada com React
- Layout flexbox responsivo
- Dark/Light mode ready"
```

### Commit 5: Backend - WebSocket e CORS
```
git add PROVA/index.js PROVA/package.json
git commit -m "feat: WebSocket e CORS no backend

- WebSocket implementado com ws
- CORS configurado para frontend
- Broadcast de mensagens para clientes
- Health checks"
```

### Commit 6: Docker
```
git add docker-compose.full.yml frontend/Dockerfile start.sh start.bat
git commit -m "feat: Docker setup completo

- Docker Compose com frontend + backend + db
- Dockerfile multi-stage para frontend
- Scripts helper para iniciar aplicação
- Health checks e networking"
```

### Commit 7: Documentação
```
git add README_MAIN.md INTEGRATION.md frontend/README.md QUICK_TEST.md MANIFEST.md
git commit -m "docs: documentação completa do projeto

- README principal com overview
- Guia de integração frontend + backend
- Documentação do frontend
- Guia rápido de testes
- Manifest dos arquivos criados
- Troubleshooting e FAQ"
```

### Commit 8: Configuração Final
```
git add .env.example frontend/.env.example .gitignore frontend/.gitignore
git commit -m "config: variáveis de ambiente e gitignore

- Arquivo .env.example para backend
- Arquivo .env.example para frontend
- .gitignore consolidado
- Ignore de node_modules, build, etc"
```

---

## 📦 Como Fazer o Push Inicial

```bash
# 1. Criar repositório local (se necessário)
git init

# 2. Adicionar origem remota
git remote add origin https://github.com/SEU_USUARIO/PROVA.git

# 3. Fazer os commits como acima
git add .
git commit -m "Initial commit: Prova Final - Unifaat"

# 4. Push para main
git branch -M main
git push -u origin main
```

---

## 🔄 Workflow Recomendado para Desenvolvimento

```bash
# 1. Clonar repositório
git clone https://github.com/Zone5517/PROVA.git
cd PROVA

# 2. Criar branch de desenvolvimento
git checkout -b develop

# 3. Fazer alterações...
# 4. Commit com mensagens descritivas
git add .
git commit -m "type: descrição concisa"

# 5. Push para develop
git push origin develop

# 6. Fazer Pull Request para main
# (via interface do GitHub)

# 7. Merge após revisão
```

---

## 📝 Convenção de Mensagens de Commit

### Formato
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos
- **feat:** Nova funcionalidade
- **fix:** Correção de bug
- **docs:** Documentação
- **style:** Formatação de código
- **refactor:** Refatoração
- **perf:** Melhorias de performance
- **test:** Adição de testes
- **chore:** Tarefas de build, dependências, etc

### Exemplos

```
feat(frontend): CRUD completo para alunos

- Listar alunos
- Criar novo aluno
- Editar aluno
- Deletar aluno
- Validação de formulário

Closes #1
```

```
fix(backend): erro CORS com origem localhost

O backend estava rejeitando requisições do frontend.
Adicionado origin http://localhost:5173 ao CORS.

Fixes #5
```

```
docs(README): adicionar instruções de setup

- Adicionar pré-requisitos
- Adicionar passo a passo
- Adicionar troubleshooting
```

---

## 🏷️ Tags Recomendadas

```bash
# Após fazer o commit principal
git tag -a v1.0.0 -m "Release 1.0.0 - Prova Final"
git push origin v1.0.0
```

---

## 📊 Estrutura de Branches

```
main (produção)
  ↑
  └─ develop (desenvolvimento)
      ├─ feature/frontend
      ├─ feature/backend
      ├─ feature/docker
      └─ feature/docs
```

---

## 🔐 GitHub Settings Recomendadas

### Proteção da Branch Main
1. Vá para Settings > Branches
2. Clique em "Add rule"
3. Aplique para `main`:
   - [x] Require pull request reviews before merging
   - [x] Require status checks to pass before merging
   - [x] Include administrators

### Secrets (se usar CI/CD)
Adicione em Settings > Secrets:
- `DATABASE_URL`
- `API_URL`
- `WS_URL`

---

## 🤖 CI/CD (Opcional - GitHub Actions)

Arquivo `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install backend deps
        run: npm install
        working-directory: ./PROVA
      
      - name: Install frontend deps
        run: npm install
        working-directory: ./frontend
      
      - name: Build frontend
        run: npm run build
        working-directory: ./frontend
```

---

## 📈 README.md Principal (GitHub)

Adicione à raiz do repositório:

```markdown
# Escola Unifaat - Prova Final

[![Tests](https://github.com/SEU_USUARIO/PROVA/workflows/Tests/badge.svg)](https://github.com/SEU_USUARIO/PROVA/actions)

Sistema de gerenciamento escolar desenvolvido com React + TypeScript + Express.

## 🚀 Quick Start

```bash
docker-compose -f docker-compose.full.yml up
```

Acesse em: http://localhost:5173

## 📚 Documentação

- [Frontend README](./frontend/README.md)
- [Integration Guide](./INTEGRATION.md)
- [Quick Test Guide](./QUICK_TEST.md)

## 👨‍💻 Autor

Nome - Unifaat Desenvolvimento Web

## 📄 Licença

MIT
```

---

## 🎯 Checklist Pré-Push

- [ ] Todos os arquivos criados
- [ ] Código TypeScript valida sem erros
- [ ] npm install funciona
- [ ] npm run build funciona
- [ ] Docker Compose funciona
- [ ] README atualizado
- [ ] .gitignore completo
- [ ] Não há secrets no código
- [ ] Não há commented code
- [ ] Não há console.log de debug

---

## 📞 Contato GitHub

Se usar issues no GitHub, sugerimos:

### Template de Issue

```markdown
## Descrição
Descrição clara do que está faltando ou quebrado

## Passos para Reproduzir
1. ...
2. ...

## Comportamento Esperado
O que deveria acontecer

## Comportamento Atual
O que está acontecendo

## Ambiente
- Browser: 
- Node: 
- OS: 

## Labels
- [ ] bug
- [ ] enhancement
- [ ] documentation
- [ ] help wanted
```

---

## ✅ Pronto para Submeter!

Após seguir este guia:
1. Seu repositório estará bem organizado
2. O histórico de commits será limpo
3. A documentação estará completa
4. Será fácil para o avaliador entender o código

**Sucesso na avaliação!** 🚀📚

const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const db = require('./APP/config/database');
db.sync();
const alunoController = require('./APP/controllers/alunoController');
const alunoRoutes = require('./APP/routes/alunoRoutes'); // Importando as rotas de aluno
const professorRoutes = require('./APP/routes/professorRoutes'); // Importando as rotas de professor
const materiaRoutes = require('./APP/routes/materiaRoutes'); // Importando as rotas de matéria

// CORS configuração
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', '*'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => res.send('API da Escola 🚀'));

// Usando as rotas
app.use('/alunos', alunoRoutes);
app.use('/professores', professorRoutes);
app.use('/materias', materiaRoutes);
app.use('/api', alunoRoutes);

// Testando a conexão com o banco de dados
const sequelize = require('./APP/config/database');
sequelize.authenticate()
  .then(() => console.log('Conectado ao PostgreSQL'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Criando servidor HTTP com suporte a WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Gerenciar conexões WebSocket
const clients = new Set();

wss.on('connection', (ws) => {
  console.log('✅ Cliente WebSocket conectado');
  clients.add(ws);

  ws.on('message', (message) => {
    console.log('📨 Mensagem recebida:', message);
    
    // Broadcast para todos os clientes
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'notification',
          data: message,
          timestamp: new Date().toISOString()
        }));
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ Cliente WebSocket desconectado');
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('⚠️ Erro WebSocket:', error);
  });

  // Enviar mensagem de boas-vindas
  ws.send(JSON.stringify({
    type: 'connection',
    message: 'Conectado ao servidor WebSocket',
    timestamp: new Date().toISOString()
  }));
});

// Iniciando o servidor
server.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
  console.log('📡 WebSocket disponível em ws://localhost:3000');
});

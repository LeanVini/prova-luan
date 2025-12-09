#!/bin/bash
# Script para executar o projeto completo com Docker

echo "=================================="
echo "🚀 Escola Unifaat - Setup Completo"
echo "=================================="
echo ""

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado!"
    echo "Instale Docker em: https://www.docker.com/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado!"
    exit 1
fi

echo "✅ Docker encontrado"
echo ""

# Build e start
echo "🔨 Iniciando containers..."
docker-compose -f docker-compose.full.yml up --build

echo ""
echo "=================================="
echo "✅ Tudo está pronto!"
echo "=================================="
echo ""
echo "Frontend:  http://localhost:5173"
echo "Backend:   http://localhost:3000"
echo "WebSocket: ws://localhost:3000"
echo ""
echo "Pressione Ctrl+C para parar os containers"
echo ""

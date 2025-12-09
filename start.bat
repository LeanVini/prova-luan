@echo off
REM Script para executar o projeto completo com Docker

echo.
echo ==================================
echo 🚀 Escola Unifaat - Setup Completo
echo ==================================
echo.

REM Verificar se Docker está instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker não está instalado!
    echo Instale Docker em: https://www.docker.com/
    pause
    exit /b 1
)

echo ✅ Docker encontrado
echo.

REM Build e start
echo 🔨 Iniciando containers...
docker-compose -f docker-compose.full.yml up --build

echo.
echo ==================================
echo ✅ Tudo está pronto!
echo ==================================
echo.
echo Frontend:  http://localhost:5173
echo Backend:   http://localhost:3000
echo WebSocket: ws://localhost:3000
echo.
echo Pressione Ctrl+C para parar os containers
echo.
pause

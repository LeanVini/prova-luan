@echo off
echo 🚀 Instalando dependências do frontend...
cd frontend
call npm install

echo ✅ Build do frontend...
call npm run build

echo 📦 Frontend pronto para deployment!
echo.
echo Para executar em desenvolvimento:
echo   npm run dev
echo.
echo Para preview do build:
echo   npm run preview
pause

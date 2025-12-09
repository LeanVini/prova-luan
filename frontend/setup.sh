#!/bin/bash

echo "🚀 Instalando dependências do frontend..."
cd frontend
npm install

echo "✅ Build do frontend..."
npm run build

echo "📦 Frontend pronto para deployment!"
echo ""
echo "Para executar em desenvolvimento:"
echo "  npm run dev"
echo ""
echo "Para preview do build:"
echo "  npm run preview"

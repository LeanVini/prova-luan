# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Build do projeto
RUN npm run build

# Servidor stage
FROM node:18-alpine

WORKDIR /app

# Instalar servidor simples para servir arquivos estáticos
RUN npm install -g serve

# Copiar apenas o build do estágio anterior
COPY --from=build /app/dist ./dist

# Expor porta
EXPOSE 5173

# Comando para servir
CMD ["serve", "-s", "dist", "-l", "5173"]

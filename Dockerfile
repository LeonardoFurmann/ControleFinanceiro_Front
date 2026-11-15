# Estágio 1: gera os arquivos estáticos do React.
FROM node:22-alpine AS build
WORKDIR /app

# Primeiro só o que define as dependências: fica em cache enquanto o lock não mudar.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# O Vite embute a URL da API no JavaScript durante o build; ela não é lida na execução.
# "/api" é relativo: o navegador chama o mesmo endereço do site, e o Nginx repassa ao backend.
ARG VITE_API_URL=/api
RUN npm run build

# Estágio 2: só o Nginx e os arquivos gerados.
FROM nginx:stable-alpine

LABEL org.opencontainers.image.source="https://github.com/LeonardoFurmann/ControleFinanceiro_Front"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# 127.0.0.1 e não localhost: no Alpine, localhost pode resolver para IPv6, onde o Nginx não escuta.
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -q --spider http://127.0.0.1/ || exit 1

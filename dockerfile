# Stage 1 — build com pnpm
FROM node:20-alpine AS builder
WORKDIR /app

# copiar manifestos primeiro para cache de camada
COPY package.json pnpm-lock.yaml* ./

# instalar pnpm e dependências conforme lockfile
RUN npm install -g pnpm@10 \
 && pnpm install --frozen-lockfile

# copiar código e gerar build
COPY . .
RUN pnpm run build

# Stage 2 — runtime com nginx
FROM nginx:stable-alpine AS runner

# copiar build estático
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
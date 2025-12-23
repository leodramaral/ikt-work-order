FROM node:20-alpine

RUN apk add --no-cache netcat-openbsd

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "until nc -z postgres 5432; do echo 'Aguardando PostgreSQL...'; sleep 2; done; echo 'PostgreSQL iniciado!'; echo 'Executando migrations...'; npm run migration:run || echo 'Migrations já executadas'; echo 'Iniciando API...'; npm run dev"]

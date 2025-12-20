FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "until nc -z postgres 5432; do echo 'Waiting for postgres...'; sleep 2; done; echo 'PostgreSQL started'; npm run migration:run; npm run dev"]

FROM node:16.18.1

WORKDIR /app


COPY package*.json ./
COPY . .

RUN npm install

# Copia testes do avaliador e arquivos do projeto
COPY .eslint* ./
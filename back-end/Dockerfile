FROM node:16.14.2

WORKDIR /app


COPY package*.json ./

RUN npm install

# Copia testes do avaliador e arquivos do projeto
COPY .eslint* ./

# Usuário linux padrão do container, não é recomendado usar root
USER node

# Substitui o comando padrão da imagem do node
CMD [ "/bin/bash" ]
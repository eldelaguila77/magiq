FROM node:22

# Instalar netcat
RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
# Instala ts-node globalmente
RUN npm install -g ts-node
RUN npm install -g ts-node-dev

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
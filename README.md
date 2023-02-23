# Modelo

Essa página documenta a padronização criada para o desenvolvimento.

# Repositório

O repositório a seguir ja contempla todos os passos feitos anteriormente, para começar o projeto é necessário realizar o `CLONE` desse repostório e instalar as `dependências`.

Esse projeto está desenvolvido em NodeJS com TypeScript, Express, JWT e TypeORM para manipulação do banco de dados.

[](https://github.com/fiduciafinanciamentoss/template-backend-typescript.git)

```powershell
# Copiar o diretório
git clone https://github.com/fiduciafinanciamentoss/template-backend-typescript.git

# Instalar as dependências
yarn

# Inicializar o projeto
yarn dev

# Construir a imagem do Docker
docker build -t modelo .

# Inicializar o Docker
docker-compose up -d
```

# O Começo

O tutorial abaixo é como o projeto modelo foi construido para um melhor entendimento de suas dependências.

# 1. Iniciando o projeto

```powershell
yarn init -y
```

## 1.1 Instalando Express

```powershell
yarn add express
yarn add @types/express -D
```

## 1.2 Instalando TypeScript

```powershell
yarn add typescript -D
yarn tsc --init
```

### 1.2.1 Configuração do TypeScript

```json
"outDir": "./dist"
```

## 1.3 ts-node-dev

```powershell
yarn add ts-node-dev -D
```

### 1.3.1 Script

```json
"scripts": {
   "dev": "ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules --respawn src/shared/infra/http/server.ts"
}
```

## 1.4 ESLint e Prettier

[ESLint e Prettier](https://www.notion.so/ESLint-e-Prettier-3169f3dc880843caab4f35c24afedc3a)

# 2. Testes

Para realizar os testes na aplicação será utilizando a biblitoca [`JEST](https://jestjs.io/pt-BR/).`

```powershell
yarn add jest @types/jest -D
yarn jest --init
```

Ao inserir os comandos acima serão realizadas algumas perguntas, conforme veremos a seguir:

1. Would you like to use Jest when running "test" script in "package.json"? `YES`

2.  Would you like to use Typescript for the configuration file? `YES`

3. Choose the test environment that will be used for testing `NODE`

4. Do you want Jest to add coverage reports? `NO`

5. Which provider should be used to instrument code for coverage? `v8`

6. Automatically clear mock calls and instances between every test? `YES`

## 2.1 Instalar a depedencia ts-jest

```powershell
yarn add ts-jest -D
```

Após realizar essa instalação dentro do arquivo `jest.config.ts`

```tsx
bail: true,

preset: "ts-jest"

testMatch: [
	 "**/*.spec.ts"
],
```

# 3. Documentação

A documentação das rotas será desenvolvida utilizando a biblioteca [`SWAGGER`](https://swagger.io/)

```powershell
yarn add swagger-ui-express
yarn add @types/swagger-ui-express -D
```

Dentro do arquivo `tsconfig.json`

```tsx
"resolveJsonModule": true
```

# 4. ORM

A manipulação será utilizando o [`TypeORM`](https://typeorm.io/#/)

```powershell
yarn add typeorm reflect-metadata
yarn add mysql2
```

Dentro do arquivo `tsconfig.json`

```json
"experimentalDecorators": true
"emitDecoratorMetadata": true
```

O arquivo `ormconfig.ts` ficará a configuração do banco de dados

```tsx
export default {
    "type": process.env.DB_CONNECTION,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE
 }
```

E configurando o arquivo `server.ts`

```tsx
import "./database";
```

# 5. ENV

```powershell
yarn add dotenv
```

Um exemplo de `.env`

```
DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

E dentro do arquivo `server.ts`, antes de todas as importações:

```tsx
import dotenv from "dotenv";
dotenv.config();
```

# 6. Injeção de dependência

Para a injeção de dependência será utilizado o [`TSyringe`](https://github.com/microsoft/tsyringe), para instalar usaremos o comando:

```powershell
yarn add tsyringe
```

# 7. JWT

Para realizar as autenticações dentro do sistema utilizamos o `JSON Web Token (JWT)`, para realizar a instalação:

```powershell
yarn add jsonwebtoken
yarn add @types/jsonwebtoken -D

yarn add uuid
yarn add @types/uuid -D

yarn add bcrypt
yarn add @types/bcrypt -D

yarn add dayjs
```

# 8. Docker

Utilizaremos o Docker para colocar a aplicação em container, depois de instalar o [`DOCKER`](https://www.docker.com/), criamos um arquivo chamado de `Dockerfile`

```docker
FROM node

WORKDIR /usr/app

COPY package.json ./

ENV TZ="America/Sao_Paulo"

RUN npm install --force

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
```

Para que o docker execute e construa a aplicação, o comando a ser utilizado é:

```docker
docker build -t modelo .
```

E após isso, criar o arquivo `docker-compose.yml`

```yaml
version: "3.7"

services: 
  app:
    build: .
    container_name: modelo
    ports:
      - 3333:3333
    volumes: 
      - .:/usr/app
```

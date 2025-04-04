This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Instalando dependencias

O projeto foi feito na versão LTS v20.19.0 do [Node](https://nodejs.org/pt/download).

Projeto

```bash
npm install
```

[Docker](https://www.docker.com/products/docker-desktop/) (foi o jeito mais facil de criar um banco para que todos possam usar do mesmo sem um setup a mais no computador)

```bash
docker-compose up -d 
```

Prisma

```bash
npm install -g prisma
```

## Iniciando o projeto

```bash
npm run dev
```

## Como atualizar o banco

Com o projeto parado:

```bash
npx prisma db seed

npx prisma generate --force 
```




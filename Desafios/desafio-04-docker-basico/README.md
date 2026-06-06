# 🚀 Desafio 04 — Docker Básico

Uma API desenvolvida com **Node.js** e **Express**, preparada para ser executada dentro de um container Docker, garantindo portabilidade, previsibilidade e facilidade de implantação em qualquer ambiente.

---

## 🎯 Objetivo do Desafio

Containerizar uma aplicação backend Node.js utilizando Docker, criando uma imagem reproduzível e executando a API dentro de um container.

---

## 🧠 Tecnologias Utilizadas

* Node.js
* Express.js
* Docker
* Dockerfile
* Variáveis de Ambiente
* REST API

---

## 📁 Estrutura do Projeto

```txt
desafio-04-docker-basico/
│
├── src/
│   ├── app.js
│   └── server.js
│
├── .dockerignore
├── .env.example
├── Dockerfile
├── package.json
└── README.md
```

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/desafio-04-docker-basico.git
```

Entre na pasta:

```bash
cd desafio-04-docker-basico
```

Instale as dependências:

```bash
npm install
```

---

## ▶️ Executando Localmente

Inicie o servidor:

```bash
npm run dev
```

Servidor disponível em:

```txt
http://localhost:3000
```

---

## 🌐 Endpoints

### Home

```http
GET /
```

Resposta:

```json
{
  "message": "🚀 API running successfully inside Docker!",
  "challenge": "Desafio 04 - Docker Básico",
  "status": "success"
}
```

---

### Health Check

```http
GET /health
```

Resposta:

```json
{
  "status": "ok",
  "uptime": 12.34,
  "timestamp": "2026-06-06T00:00:00.000Z"
}
```

---

### Users

```http
GET /users
```

Resposta:

```json
[
  {
    "id": 1,
    "name": "Vitor Dutra",
    "role": "Backend Developer"
  },
  {
    "id": 2,
    "name": "Nova Era Tech",
    "role": "Challenge Platform"
  }
]
```

---

## 🐳 Docker

### Build da imagem

```bash
docker build -t desafio-04-api-docker .
```

### Executar container

```bash
docker run -p 3000:3000 desafio-04-api-docker
```

### Verificar containers ativos

```bash
docker ps
```

---

## 🛠️ Funcionalidades

* API REST com Express
* Health Check da aplicação
* Estrutura organizada em camadas simples
* Variáveis de ambiente
* Dockerfile configurado
* Pronta para containerização
* Fácil deploy em qualquer ambiente

---

## ✅ Critérios Atendidos

* Dockerfile criado
* Porta da aplicação exposta
* Estrutura pronta para execução em container
* Uso de imagem oficial do Node.js
* Instalação eficiente das dependências
* Variáveis de ambiente configuradas
* API acessível através dos endpoints

---

## 📚 Aprendizados

Durante este desafio foram praticados conceitos importantes de Docker:

* Criação de imagens
* Containers
* Dockerfile
* Port Mapping
* Variáveis de ambiente
* Isolamento de aplicações
* Reprodutibilidade de ambientes

---

## 🚀 Próximo Passo

O próximo desafio será focado em **testes automatizados com Jest**, garantindo maior qualidade e confiabilidade para a aplicação.

---

## 👨‍💻 Autor

**Vitor Dutra Melo**

Backend Developer | Node.js | Express | PostgreSQL | Prisma ORM

Projeto desenvolvido como parte da trilha de desafios da **Nova Era Tech**.

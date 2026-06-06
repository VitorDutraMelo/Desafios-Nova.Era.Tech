# 🚀 Desafio 05 — Testes Unitários com Jest

Projeto desenvolvido como parte do **Nova Era Tech Backend JS Challenge**, com foco em testes automatizados utilizando **Jest**.

O objetivo deste desafio foi validar regras de negócio através de testes unitários, garantindo maior confiabilidade, segurança e facilidade de manutenção da aplicação.

---

# 🎯 Objetivo

Criar uma suíte de testes unitários para serviços críticos da aplicação.

Foram testados cenários de:

* Criação de entidade válida
* Rejeição de payload inválido
* Atualização de dados
* Cenários de erro de negócio
* Validação de regras da aplicação

---

# 🛠️ Tecnologias Utilizadas

* Node.js
* JavaScript
* Jest
* Testes Unitários
* Coverage Report

---

# 📂 Estrutura do Projeto

```bash
src/
├── database/
│   └── fakeProductRepository.js
│
├── errors/
│   └── AppError.js
│
├── services/
│   └── productService.js
│
tests/
└── productService.test.js

jest.config.js
package.json
README.md
```

---

# 📸 Resultado Final

## 🧪 Testes Executados com Sucesso

![Tests Passed](./images/tests-passed.png)

---

## 📊 Cobertura dos Testes

![Coverage Report](./images/coverage.png)

---

## 📁 Estrutura do Projeto

![Project Structure](./images/structure.png)

---

# ✅ Casos de Teste Implementados

### Create Product

* Deve criar um produto válido
* Deve rejeitar campos obrigatórios ausentes
* Deve rejeitar preço menor ou igual a zero
* Deve rejeitar quantidade negativa
* Deve rejeitar produtos duplicados

### Update Product

* Deve atualizar um produto existente
* Deve rejeitar atualização de produto inexistente
* Deve rejeitar preço inválido
* Deve rejeitar quantidade negativa

---

# 📈 Resultado dos Testes

```bash
PASS tests/productService.test.js

Test Suites: 1 passed, 1 total
Tests: 9 passed, 9 total
```

---

# 📊 Cobertura Obtida

```bash
Statements : 100%
Functions  : 100%
Lines      : 100%
Branches   : 95.45%
```

---

# ▶️ Executando o Projeto

Instalar dependências:

```bash
npm install
```

Executar testes:

```bash
npm test
```

Gerar relatório de cobertura:

```bash
npm run test:coverage
```

---

# 🧠 Conceitos Praticados

* Jest
* Testes unitários
* Matchers
* Testes assíncronos
* Arrange, Act, Assert
* Cobertura de código
* Regras de negócio isoladas
* Fake Repository Pattern

---

# 👨‍💻 Autor

**Vitor Dutra Melo**

Desafio desenvolvido durante a trilha Backend JavaScript da Nova Era Tech.

# 📋 GoTask — Gerenciador de Tarefas Kanban

<p align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge" alt="Status" />
</p>


---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Autora](#-autora)
- [Licença](#-licença)

---

## 🚀 Visão Geral

O **GoTask** é um quadro de produtividade projetado para facilitar a organização diária de atividades. O sistema permite acompanhar o ciclo de vida de cada tarefa através de colunas de status, detalhar demandas e registrar comentários e interações em tempo real.

O projeto explora os conceitos modernos do ecossistema Angular:
- **Componentização:** interfaces modulares, isoladas e reutilizáveis.
- **Reatividade & Fluxo Unidirecional:** gerenciamento de estado via Services e Signals/RxJS.
- **Formulários Reativos:** validação e controle granular de entradas do usuário.

---

## 📂 Estrutura do Projeto

```text
projeto-go-task/
├── src/
│   ├── app/
│   │   ├── components/         # Componentes reutilizáveis (cards, colunas, modais)
│   │   │   ├── task-card/
│   │   │   ├── task-column/
│   │   │   └── task-comments/
│   │   ├── models/             # Interfaces e tipos de dados (Task, Comment, Status)
│   │   ├── services/           # Regras de negócio e gerenciamento de estado
│   │   ├── app.component.ts    # Componente raiz
│   │   └── app.routes.ts       # Configurações de rotas (se aplicável)
│   ├── assets/                 # Ícones, imagens e recursos estáticos
│   ├── environments/           # Variáveis de ambiente
│   ├── index.html              # HTML base
│   └── styles.css              # Estilos globais e diretivas do Tailwind
├── angular.json                # Configuração do Angular CLI
├── package.json                # Dependências e scripts do projeto
├── tsconfig.json               # Configurações do compilador TypeScript
└── README.md

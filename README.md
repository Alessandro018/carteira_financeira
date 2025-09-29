# Carteira Financeira

Aplicação web de carteira financeira construída com **Laravel 12 + React + TypeScript**. Permite operações como depósito, transferência, autenticação de usuário, etc.

---

## 📋 Sumário

- [Funcionalidades](#funcionalidades)  
- [Tecnologias](#tecnologias)  
- [Pré-requisitos](#pré-requisitos)  
- [Como executar](#como-executar)  
- [Estrutura de pastas](#estrutura-de-pastas)  
- [Endpoints importantes](#endpoints-importantes)  
- [Como usar no frontend](#como-usar-no-frontend)  
- [Validação e exibição de erros](#validação-e-exibição-de-erros)  
- [Contribuição](#contribuição)  

---

## 🛠 Funcionalidades

- Cadastro e autenticação de usuário  
- Login
- Depósito em conta  
- Transferência entre usuários  
- Visualização de movimentações (depósitos / transferências)
- Cancelamento de movimentações (depósitos / transferências)
- Regras de segurança para proteger rotas que exigem autenticação  

---

## 🔧 Tecnologias

- **Backend**: Laravel 12, Sanctum  
- **Frontend integrado**: React + TypeScript  
- **Estilos**: Tailwind CSS  
- **Ferramentas de build**: Vite ou Laravel Mix (dependendo da configuração existente)  
- **Banco de dados**: MySQL / outro SQL compatível  

---

## 🔌 Pré-requisitos

- PHP >= versão mínima requerida pelo Laravel 12  
- Composer  
- Node.js / npm ou yarn  
- Banco de dados (MySQL, MariaDB ou similar)  

---

## 🚀 Como executar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/Alessandro018/carteira_financeira.git
   cd carteira_financeira
2. Instale dependências do backend:

    ````bash
    composer install
- Se você estiver realizando no windows, talvez você possa ter algum problema como esse:
  <img width="955" height="259" alt="image" src="https://github.com/user-attachments/assets/79effff0-ebc3-4049-b050-7c2457308a91" />
  - Para tentar resolver, execute os seguintes comandos no Windows PowerShell:
      ````bash
      reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem /v LongPathsEnabled /t REG_DWORD /d 1 /f
      git config --system core.longpaths
  - Em seguida, execute novamente o passo 2

3. Copie o arquivo de ambiente e configure:

    `````bash
    cp .env.example .env
- Ajuste as variáveis de banco de dados (DB_DATABASE, DB_USERNAME, DB_PASSWORD)
- Configure outras variáveis necessárias (por exemplo, SANCTUM_STATEFUL_DOMAINS, APP_URL, etc.)
4. Gere a chave da aplicação Laravel:

      ````bash
      php artisan key:generate
5. Rode as migrações:

    ````bash
    php artisan migrate
6. Instale dependências do frontend:

    ````bash
    npm install
7. Compile os assets / frontend:

    ````bash
    npm run dev
8. Inicie o servidor Laravel:

    ````bash
    php artisan serve
9. Abra no navegador:

    ````bash
    http://localhost:8000

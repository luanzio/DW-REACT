<h2>Projeto CRUD de Usuários em React e Node.js</h2>

Este projeto implementa uma aplicação para gerenciar usuários utilizando React para o frontend e Node.js para o backend. A aplicação realiza operações básicas de CRUD (Create, Read, Update, Delete) através de uma API RESTful.

<h3>API Backend (Node.js)</h3>
A API utiliza um banco de dados SQL para armazenar e gerenciar os usuários. Abaixo estão os principais endpoints implementados:

GET /api/users
Retorna todos os usuários cadastrados.
POST /api/users
Cria um novo usuário com os dados fornecidos no corpo da requisição (name, email, fone).
PUT /api/users/:id
Atualiza os dados de um usuário existente com base no id fornecido na URL.
DELETE /api/users/:id
Deleta o usuário correspondente ao id fornecido na URL.

<h3>Frontend (React)</h3>
No frontend, a interface de usuário permite interagir com a API através de formulários e exibição dos dados de usuários. A integração com a API é feita utilizando fetch ou uma biblioteca cliente HTTP como Axios.

Configuração
Para executar o projeto localmente:

<h3>Clone o repositório:</h3>
git clone https://github.com/seu-usuario/projeto-crud-usuarios.git
Instale as dependências do backend e do frontend:


cd projeto-crud-usuarios/backend
npm install
cd ../frontend
npm install

Inicie o servidor backend:
cd ../backend
npm start
Inicie o servidor frontend:


cd ../frontend
npm start
Acesse a aplicação em seu navegador através de http://localhost:5173.

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(cors())
app.use(express.json())
app.use(routes);

app.listen(3333);

/*
  Métodos HTTP:

  GET:    Buscar/listar uma informação no Back-end
  POST:   Criar uma informação
  PUT:    Alterar uma informação no back-end
  DELETE: Deletar uma informação no back-end

  Tipos de parâmetros:

  Query:        Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
  Route:        Parâmetros utilizados para identificar recursos
  Request body: Corpo da requisição, utilizado para criar ou alterar recursos


  SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
  NoSQL: MongoDB, CouchDB, etc

  Driver: SELECT * FROM users
  QueryBuilder: table('users').select('*').where()
*/

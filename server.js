
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var database = require('./config/db');
const port = process.env.PORT || 8080;
var swaggerUi = require('swagger-ui-express');
var cors = require('cors');
swaggerDocument = require('./docs/swagger.json');

app.use('/api-docs', swaggnpmerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json())
app.use(cors);
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(database.url, (err, db) => {
  if (err) return console.log(err);
  var dbmongo = db.db('escuras');
  require('./routes/index.js')(app, dbmongo);
  app.listen(port, () => {
    console.log('Servidor ativo: ' + port);
  })
});




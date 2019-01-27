
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var database = require('./config/db');
const port = process.env.PORT || 8080;
var swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./docs/swagger.json');
const cors = require('cors');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json())
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(database.url, (err, db) => {
  if (err) return console.log(err);
  var dbmongo = db.db('escuras');
  require('./routes/index.js')(app, dbmongo);
  app.listen(port, () => {
    console.log('Servidor ativo: ' + port);
  })
});




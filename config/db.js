let username = '1010984';
let password = 'Adagui78_';
let dbhost = 'ds249873.mlab.com';
let port = '49873';
let dbname = 'escuras';

module.exports = {
  // url: `mongodb://${username}:${password}@${dbhost}:${port}/${dbname}`
  "url": "mongodb://localhost:27017",
  "db": "estacao",
  "collection": {
    "user": "user",
    "temperature": "temperature",
    "configuration": "configuration"
  },
  "user": {
    "name": "name",
    "password": "password",
    "email": "email"
  },
  "temperature": {
    "value": "value",
    "unity": "unity",
    "date": "date",
    "account": "account"
  },
  "configuration": {
    "period": "period",
    "account": "account",
    "def_period": "def_period"
  }
};


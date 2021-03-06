let username = 'tozart';
let password = 'adagui78';
let dbhost = 'ds155714.mlab.com';
let port = '55714';
let dbname = 'estacao';

module.exports = {
  "url": `mongodb://${username}:${password}@${dbhost}:${port}/${dbname}`,
  "url_alternative": "mongodb://localhost:27017/estacao",
  "db": dbname,
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


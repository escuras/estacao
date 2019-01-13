let username = 'tozart';
let password = 'adagui78';
let dbhost = 'ds155714.mlab.com';
let port = '55714';
let dbname = 'estacao';
mongodb://<dbuser>:<dbpassword>@ds155714.mlab.com:55714/estacao

module.exports = {
  "url": process.env.MONGODB_URI,
  "url_alternative": `mongodb://${username}:${password}@${dbhost}:${port}/${dbname}`,
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


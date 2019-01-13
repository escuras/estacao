var MongoClient = require('mongodb').MongoClient;
var database = require('../config/db');

exports.createDatabase = function () {
  MongoClient.connect(database.db, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });
}

exports.createCollections = async function () {
  MongoClient.connect(database.url || database.url_alternative, (err, db) => {
    if (err) throw err;
    var dbo = db.db(database.db);
    dbo.createCollection(database.collection.user, function (err, res) {
      if (err) throw err;
      var user = database.collection.user;
      console.log(`Collection "${user}" created!`);
    });
    dbo.createCollection(database.collection.temperature, function (err, res) {
      if (err) throw err;
      var temp = database.collection.temperature;
      console.log(`Collection "${temp}" created!`);
    });
    dbo.createCollection(database.collection.configuration, function (err, res) {
      if (err) throw err;
      var conf = database.collection.user;
      console.log(`Collection "${conf}" created!`);
    });
    db.close();
  });
}

exports.dropColldatabase.collection.userection = function (name) {
  MongoClient.connect(database.url || database.url_alternative, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database.db);
    dbo.collection(name).drop(function (err, delOK) {
      if (err) throw err;
      if (delOK) console.log(`Collection with name "${name}" deleted.`);
      db.close();
    });
  });
}

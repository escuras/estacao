let MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
let mongo = require('mongodb');
let database = require('../config/db');

exports.insertCelsius = function (value, account) {
  MongoClient.connect(database.url, function (err, db) {
    if (err) throw err;
    const time = moment().toDate();
    var dbo = db.db(database.db);
    var unity = "Celsius";
    var myobj = { "unity": unity, "value": value, "date": time, "account": account };
    dbo.collection(database.collection.temperature).insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

exports.clean = (account) => {
  MongoClient.connect(database.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database.db);
    var query = { "account": account };
    dbo.collection(database.collection.temperature).deleteMany(query, function (err, result) {
      if (err) throw err;
      console.log("All records where deleted.")
      db.close();
    });
  });
}

exports.cleanBetween = (start, end, account) => {
  MongoClient.connect(database.url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database.db);
    var query = { "date": { "$gte": start, "$lt": end }, "account": account };
    dbo.collection(database.collection.temperature).remove({ query }, function (err, result) {
      if (err) throw err;
      console.log(`All records between ${start} and ${end} where deleted.`);
      db.close();
    });
  });
}

exports.findAll = async function (account) {
  var db = await MongoClient.connect(database.url)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var sortAsc = { "date": 1 };
  var collection = dbo.collection(database.collection.temperature).find().sort(sortAsc).toArray()
    .then(data => { return data; })
    .catch(error => console.log(error));
  db.close();
  return collection;
}

exports.findByDate = async function (start, end, account) {
  var db = await MongoClient.connect(database.url)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var query = { date: { $gte: new Date(start), $lt: new Date(end) }, account: account };
  //var sortAsc = { "date": 1 };
  var collection = dbo.collection(database.collection.temperature).find(query).toArray()
    .then(data => { return data; })
    .catch(error => console.log(error));
  db.close();
  return collection;
}



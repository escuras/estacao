let MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
let mongo = require('mongodb');
let database = require('../config/db');
const def_period = 1800000;


exports.insertPeriod = async function (account) {
  var db = await MongoClient.connect(database.url || database.url_alternative)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var obj = { "account": account, "period": def_period, "def_period": def_period };
  dbo.collection(database.collection.configuration).insertOne(obj)
    .then(data => { db.close(); console.log("Document inserted."); })
    .catch(error => { db.close(); console.log(error); });
  db.close();
}

exports.updatePeriod = async function (value, account) {
  var db = await MongoClient.connect(database.url || database.url_alternative)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var o_id = new mongo.ObjectID(account);
  var myquery = { "account": o_id };
  var newvalues = { $set: { "period": value } };
  dbo.collection(database.collection.configuration).updateOne(myquery, newvalues)
    .then(data => { console.log("Document updated."); db.close(); })
    .catch(error => { console.log(error); db.close(); });
}

exports.findPeriod = async function (account) {
  var db = await MongoClient.connect(database.url || database.url_alternative)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var o_id = new mongo.ObjectID(account);
  var myquery = { "account": o_id };
  var conf = await dbo.collection(database.collection.configuration).findOne(myquery)
    .then(data => { db.close(); return data; })
    .catch(error => { console.log(error); db.close(); });
  if (conf != null) {
    return conf.period;
  }
  return null;
}

exports.defaultPeriod = async (account) => {
  var db = await MongoClient.connect(database.url || database.url_alternative)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var o_id = new mongo.ObjectID(account);
  var myquery = { "account": o_id };
  var conf = await dbo.collection(database.collection.configuration).findOne(myquery)
    .then(data => { db.close(); return data; })
    .catch(error => { db.close(); console.log(error); });
  if (conf != null) {
    return conf.def_period;
  }
  return null;
}

exports.delete = async (account) => {
  var db = await MongoClient.connect(database.url || database.url_alternative)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var o_id = new mongo.ObjectID(account);
  var myquery = { "account": o_id };
  dbo.collection(database.collection.configuration).deleteOne(myquery)
    .then(data => { console.log("Configurations deleted."); db.close(); })
    .catch(error => { console.log(error); db.close(); });
}
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var database = require('../config/db');
let db_conf = require("../database/configuration");

exports.insert = async function (name, password, email) {
  var db = await MongoClient.connect(database.url || database.url_alternative)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var myobj = { name: name, password: password, email: email };
  return dbo.collection(database.collection.user).insertOne(myobj)
    .then(data => { db.close(); return data.ops[0]; })
    .catch(error => { console.log(error); db.close(); });
}

exports.delete = async function (id) {
  var db = await MongoClient.connect(database.url || database.url_alternative)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var o_id = new mongo.ObjectID(id);
  var query = { "_id": o_id };
  await dbo.collection(database.collection.user).deleteOne(query)
    .then(data => { console.log("1 document deleted"); db.close(); })
    .catch(error => { console.log(error); db.close(); });
}

exports.findAll = async function () {
  var db = await MongoClient.connect(database.url || database.url_alternative)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var sortAsc = { "name": 1 };
  return await dbo.collection(database.collection.user).find().sort(sortAsc).toArray()
    .then(data => { db.close(); return data; })
    .catch(error => { console.log(error); db.close(); });
}


const findOne = async function (query) {
  var db = await MongoClient.connect(database.url || database.url_alternative)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var collection = dbo.collection(database.collection.user);
  return await collection.findOne(query)
    .then(data => { db.close(); return data; })
    .catch(error => { console.log(error); db.close(); });
}

exports.findByName = async function (name) {
  const start = async function () {
    var query = { "name": name };
    const result = await findOne(query);
    return result;
  }
  return await start();
}

exports.findByNameAndPassword = async function (name, password) {
  const start = async function () {
    var query = { "name": name, "password": password };
    const result = await findOne(query);
    return result;
  }
  return await start();
}

exports.findByEmailAndPassword = async function (email, password) {
  const start = async function () {
    var query = { "email": email, "password": password };
    const result = await findOne(query);
    return result;
  }
  return await start();
}

exports.findByEmail = async function (email) {
  const start = async function () {
    var query = { "email": email };
    const result = await findOne(query);
    return result;
  }
  return await start();
}

exports.findById = async function (id) {
  const start = async function () {
    var o_id = new mongo.ObjectID(id);
    var query = { "_id": o_id };
    const result = await findOne(query);
    return result;
  }
  return await start();
}

exports.update = async function (id, name, password, email) {
  var db = await MongoClient.connect(database.url || database.url_alternative)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var collection = dbo.collection(database.collection.user);
  var o_id = new mongo.ObjectID(id);
  var query = { "_id": o_id };
  if (!email) {
    var newvalues = { $set: { "name": name, "password": password } };
  } else {
    var newvalues = { $set: { "name": name, "password": password, "email": email } };
  }
  console.log(o_id);
  console.log(newvalues);
  return await collection.updateOne(query, newvalues)
    .then(() => { db.close(); return true; })
    .catch(() => { db.close(); return false; });
}


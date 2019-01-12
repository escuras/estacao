var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var database = require('../config/db');
let db_conf = require("../database/configuration");

var findByName = function (dbo, name) {
  dbo.collection(database.collection.user).findOne({ "database.user.name": name }, function (err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });
}

exports.insert = async function (name, password, email) {
  var db = await MongoClient.connect(database.url)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var myobj = { name: name, password: password, email: email };
  var user = dbo.collection(database.collection.user).insertOne(myobj)
    .then(data => { return data.ops[0]; })
    .catch(error => console.log(error));
  db_conf.in
  db.close();
  return user;
}

exports.delete = async function (id) {
  console.log(id);
  var db = await MongoClient.connect(database.url)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var o_id = new mongo.ObjectID(id);
  var query = { "_id": o_id };
  console.log(query);
  await dbo.collection(database.collection.user).deleteOne(query)
    .then(data => { console.log("1 document deleted"); })
    .catch(error => console.log(error));
  db.close();
}

exports.findAll = async function () {
  var db = await MongoClient.connect(database.url)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var sortAsc = { "name": 1 };
  var collection = await dbo.collection(database.collection.user).find().sort(sortAsc).toArray()
    .then(data => { return data; })
    .catch(error => console.log(error));
  db.close();
  return collection;
}


const findOne = async function (query) {
  var db = await MongoClient.connect(database.url)
    .then(data => { return data; })
    .catch(error => console.log(error));
  var dbo = db.db(database.db);
  var collection = dbo.collection(database.collection.user);
  var data = await collection.findOne(query)
    .then(data => { return data; })
    .catch(error => console.log(error));
  db.close();
  return data;
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
  var db = await MongoClient.connect(database.url)
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
  return await collection.updateOne(query, newvalues)
    .then(() => { return true; })
    .catch(() => { return false; });
}


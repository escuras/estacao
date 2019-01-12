var test = require('../database/user');
var temp = require('../database/temperature');
var dba = require('./collection');
const moment = require('moment');

test.insert("ccco", "ccccco", "cccco@ddd.com").then(data => console.log(data));

/* test.findAll()
    .then(data => { const user = data; console.log(user) }); */

/*
test.findByName("aaa")
    .then(data => { const user = data; console.log(user) });

test.findById("5c2d43dc4691d626646bb661")
    .then(data => { const user = data; console.log(user) });

test.findByNameAndPassword("ddd", "dddd")
    .then(data => { const user = data; console.log(user) });

test.findByEmailAndPassword("cccco@ddd.com", "ccccc")
    .then(data => { const user = data; console.log(user) });

test.findByEmail("cccco@ddd.com")
    .then(data => { const user = data; console.log(user) });

test.delete("5c2d4941d2ce384f68d85d2f"); */

//temp.insertCelsius(10);
/* temp.findAll().then(data => console.log(data));

var start = new Date(2019, 0, 5, 16, 44, 17, 0);
var end = new Date(2019, 0, 5, 23, 44, 26, 0);
console.log(start);
console.log(end);
//temp.findByDate(start, end).then(data => console.log(data));

temp.cleanBetween(start, end); */

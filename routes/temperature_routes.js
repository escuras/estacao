let db_temp = require("../database/temperature");
let db_user = require("../database/user");
const moment = require('moment');

module.exports = function (app, database) {

    app.post('/api/temperature', async function (req, res) {
        var value = req.query.value;
        var account = req.query.account;
        if (!value) {
            res.status(401);
            res.send("The value of temperature is needed.");
            return;
        }
        if (!account) {
            res.status(402);
            res.send("The account is needed.");
            return;
        }
        var user = await findUser(account);
        if (user === null) {
            res.status(403);
            res.send("The account don't exist.");
            return;
        }
        db_temp.insertCelsius(value, account);
        res.status(201);
        res.send("The value was inserted.");
    });

    async function findUser(id) {
        var user = db_user.findById(id)
            .then(data => { return data; })
        return user;
    }

    app.delete('/api/temperature/delete', async function (req, res) {
        var account = req.query.account;
        if (!account) {
            res.status(401);
            res.send("The account is needed.");
            return;
        }
        var user = await findUser(account);
        if (user === null) {
            res.status(402);
            res.send("The account don't exist.");
            return;
        }
        if (!req.query.start && !req.query.end) {
            db_temp.clean(account);
            res.status(201);
            res.send(`All records deleted.`);
        }
        if (req.query.start && !req.query.end) {
            var start = req.query.start.toString();
            var end = moment().toDate().toString();
            db_temp.cleanBetween(start, end, account);
            res.status(202);
            res.send(`Period deleted between ${start} and ${end}.`);
            return;
        }
        if (req.query.start && req.query.end) {
            var start = req.query.start.toString();
            var end = req.query.end.toString();
            db_temp.cleanBetween(start, end, account);
            res.status(202);
            res.send(`Period deleted between ${start} and ${end}.`);
            return;
        }
        res.status(403);
        res.send("Start moment is needed if end moment defined.")
        return;
    });

    app.get('/api/temperature/get', async function (req, res) {
        var account = req.query.account;
        if (!account) {
            res.status(400);
            res.send("The account is needed.");
            return;
        }
        var user = await findUser(account);
        if (user === null) {
            res.status(400);
            res.send("The account don't exist.");
            return;
        }
        if (!req.query.start && !req.query.end) {
            var values = await db_temp.findAll(account);
            res.status(200);
            res.send(values);
            return;
        }
        if (req.query.start && !req.query.end) {
            var start = req.query.start.toString();
            var end = moment().toDate().toString();
            var values = await db_temp.findByDate(start, end, account);
            res.status(200);
            res.send(values);
            return;
        }
        if (req.query.start && req.query.end) {
            var start = req.query.start.toString();
            var end = req.query.end.toString();
            var values = await db_temp.findByDate(start, end, account);
            res.status(200);
            res.send(values);
            return;
        }
        res.status(400);
        res.send("Start moment is needed if end moment defined.")
        return;
    });
}

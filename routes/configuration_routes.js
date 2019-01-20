let db_conf = require("../database/configuration");
let db_user = require("../database/user");
const moment = require('moment');

module.exports = function (app, database) {

    app.put('/api/configuration', async function (req, res) {
        var period = req.query.period;
        var account = req.query.account;
        res.AppendHeader("Access-Control-Allow-Origin", "*");
        if (!period) {
            res.status(401);
            res.send("The period of lecture is needed.");
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
        db_conf.updatePeriod(period, account);
        res.status(201);
        res.send("The period was updated to " + period + ".");
    });

    async function findUser(id) {
        var user = db_user.findById(id)
            .then(data => { return data; })
        return user;
    }

    app.get('/api/configuration/period', async function (req, res) {
        var account = req.query.account;
        res.AppendHeader("Access-Control-Allow-Origin", "*");
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
        var period = await db_conf.findPeriod(account);
        console.log(period);
        res.status(200);
        res.send(`${period}`);
        return;
    });

    app.get('/api/configuration/default_period', async function (req, res) {
        var account = req.query.account;
        res.AppendHeader("Access-Control-Allow-Origin", "*");
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
        var def_period = await db_conf.defaultPeriod(account);
        res.status(200);
        res.send(`${def_period}`);
        return;
    });
}
let db_user = require("../database/user");
let db_conf = require("../database/configuration");
let db_temp = require("../database/temperature");

module.exports = function (app, database) {

  app.post('/api/user', async function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    if (!name) {
      res.status(400);
      res.send("The name of the user is needed.");
      return;
    }
    if (!password) {
      res.status(401);
      res.send("The password of the user is needed.");
      return;
    }
    var user = await findUserWithName(name);
    if (user !== null) {
      res.status(402);
      res.send("Exists a user with same name.");
      return;
    }
    var user = await findUserWithEmail(email);
    if (user !== null) {
      res.status(403);
      res.send("Exists a user with same email.");
      return;
    }
    var user = await db_user.insert(name, password, email).
      then(data => { return data });
    var dto = {
      id: user._id,
      name: user.name,
      email: user.email
    }
    db_conf.insertPeriod(user._id);
    res.status(201);
    res.send(dto);
  });

  async function findUserWithName(name) {
    var user = db_user.findByName(name)
      .then(data => { return data; })
    return user;
  }

  async function findUserWithEmail(email) {
    var user = db_user.findByEmail(email)
      .then(data => { return data; })
    return user;
  }

  async function findUserWithId(id) {
    var user = db_user.findById(id)
      .then(data => { return data; })
    return user;
  }

  app.get('/api/users/get', async function (req, res) {
    var users = await db_user.findAll()
      .then(data => { return data });
    const dtos = users.map(function (user) {
      var id = user._id;
      var name = user.name;
      var email = user.email;
      var obj = { id, name, email };
      return obj;
    });
    res.status(200);
    res.send(dtos);
  });

  app.post('/api/user/get', async function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    if (password === undefined) {
      res.status(401);
      res.send("You need the password of the user.");
      return;
    }
    if (name !== undefined) {
      var user = await db_user.findByNameAndPassword(name, password);
      console.log(user);
      if (user !== null) {
        var dto = {
          id: user._id,
          name: user.name,
          email: user.email
        }
        res.status(200);
        res.send(dto);
        return;
      }
    }
    if (name === undefined && email !== undefined) {
      var user = await db_user.findByEmail(email, password);
      if (user !== null) {
        var dto = {
          id: user._id,
          name: user.name,
          email: user.email
        }
        res.status(200);
        res.send(dto);
        return;
      }
    }
    res.status(402);
    res.send(null);
  });

  app.put('/api/user/put', async function (req, res) {
    if (req.body.password === undefined) {
      res.status(401);
      res.send("You need the password to update the user.");
      return;
    }
    if (req.body.id === undefined) {
      res.status(402);
      res.send("You need the ID of the user.");
      return;
    }
    if (req.body.name === undefined) {
      res.status(403);
      res.send("You need the name to update the user.");
      return;
    }
    var user = await findUserWithName(req.body.name);
    if (user !== null && user._id != req.body.id) {
      res.status(404);
      res.send("Exists a user with same name.");
      return;
    }
    if (req.body.email === undefined) {
      res.status(405);
      res.send("You need the email to update the user.");
      return;
    }
    var user = await findUserWithEmail(req.body.email);
    if (user !== null && user.id != req.body.id) {
      res.status(406);
      res.send("Exists a user with same email.");
      return;
    }
    if (db_user.update(req.body.id, req.body.name, req.body.password, req.body.email)) {
      res.status(202);
      res.send(req.query.id);
      return;
    }
  });

  app.delete('/api/user/delete', (req, res) => {
    var id = req.query.id;
    db_user.delete(id);
    db_temp.clean(id);
    db_conf.delete(id);
    res.status(200);
    res.send(`User with ${req.query.id} deleted.`);
  });

}

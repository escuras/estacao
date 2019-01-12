// routes/index.js

const userRoutes = require('./user_routes.js');
const tempRoutes = require('./temperature_routes.js');
const confRoutes = require('./configuration_routes.js');
module.exports = function (app, db) {
	userRoutes(app, db);
	tempRoutes(app, db);
	confRoutes(app, db);
}

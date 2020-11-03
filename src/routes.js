const {Router} = require('express');
const UserController = require('./app/controllers/UserController');
const SessionsController = require('./app/controllers/SessionController');
const routes = new Router();
 
routes.post('/users', UserController.store);
routes.post('/sessions',SessionsController.store);

module.exports = routes;
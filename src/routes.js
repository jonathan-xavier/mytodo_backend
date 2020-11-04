const {Router} = require('express');
const UserController = require('./app/controllers/UserController');
const SessionsController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();
 
routes.post('/users', UserController.store);
routes.post('/sessions',SessionsController.store);

routes.use(authMiddleware);
routes.put('/users',UserController.update);

module.exports = routes;
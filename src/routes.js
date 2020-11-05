const {Router} = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const UserController = require('./app/controllers/UserController');
const SessionsController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middlewares/auth');
const FileController = require('./app/controllers/FileController');

const routes = new Router();
const upload = multer(multerConfig);
 
routes.post('/users', UserController.store);
routes.post('/sessions',SessionsController.store);

routes.use(authMiddleware);
routes.put('/users',UserController.update);

//rota para salvar imagens
routes.post('/files', upload.single('file'),FileController.store);
module.exports = routes;
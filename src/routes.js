const {Router} = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const UserController = require('./app/controllers/UserController');
const SessionsController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middlewares/auth');
const FileController = require('./app/controllers/FileController');
const TaskController = require('./app/controllers/TaskController');
const CategoryController = require('./app/controllers/CategoryController');


const routes = new Router();
const upload = multer(multerConfig);
 
routes.post('/users', UserController.store);
routes.post('/sessions',SessionsController.store);

routes.use(authMiddleware);
routes.put('/users',UserController.update);
routes.get('/users',UserController.index);

//rota para salvar imagens
routes.post('/files', upload.single('file'),FileController.store);

//rota para salvar tarefas
routes.post('/task',TaskController.store);
//rota para listar tarefas
routes.get('/task',TaskController.index);
//rota para editar tarefas
routes.put('/task',TaskController.update);
//rota para deletar tarefas
routes.post('/task/delete',TaskController.delete);

//rota para salvar categorias
routes.post('/category',CategoryController.store);
//rota para buscar categorias
routes.get('/category',CategoryController.index);
//rota para editar categorias
routes.put('/category',CategoryController.update);

//rota para deletar categorias
routes.post('/category/delete', CategoryController.delete);
module.exports = routes;
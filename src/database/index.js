//aquivo que vai conhecer todos os models

const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const User = require('../app/models/User');
const File = require('../app/models/File');
const Category = require('../app/models/Category');
const Task = require('../app/models/Task');
const models = [User,File,Category,Task];

class Database {
    constructor(){
        this.init();
    }

    init(){
        //estou passando a connection para todos os models
        this.connection = new Sequelize(databaseConfig);
        models.map(model =>model.init(this.connection))
              .map(model => model.associate && model.associate(this.connection.models));
    }
}

module.exports = new Database();
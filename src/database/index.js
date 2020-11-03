//aquivo que vai conhecer todos os models

const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const User = require('../app/models/User');

const models = [User];

class Database {
    constructor(){
        this.init();
    }

    init(){
        //estou passando a connection para todos os models
        this.connection = new Sequelize(databaseConfig);
        models.map(model =>{
            model.init(this.connection);
        });
    }
}

module.exports = new Database();
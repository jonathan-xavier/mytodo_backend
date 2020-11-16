const {Model,Sequelize} = require('sequelize');

class Category extends Model{

    static init(sequelize){
        super.init({
            title: Sequelize.STRING,
        
        },{
            sequelize,
        });
        return this;
    };
    //fazer a ligação com as tarefas
    static associate(models){
        this.hasMany(models.Task); 
    }
    
}

module.exports = Category;
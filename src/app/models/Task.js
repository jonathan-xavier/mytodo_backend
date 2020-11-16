const { Model, Sequelize } = require('sequelize');

class Task extends Model {
    static init(sequelize) {
        super.init({
            title: Sequelize.STRING,
            description: Sequelize.STRING,

            
        }, {
            sequelize,
        });
        return this;
    };
    static associate(models) {      //com isso aqui pegou
        this.belongsTo(models.Category,{foreignKey: 'category_id'});
    }


}

module.exports = Task;
'use strict';
//migration que adiciona uma coluna a tabela users, 
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'avatar_id',
      {
        type: Sequelize.INTEGER,
        //chave estrangeira
        references:{
          model: 'files', key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    )
  },

  down: async (queryInterface) => {
   return queryInterface.removeColumn('users','avatar_id');
  }
};

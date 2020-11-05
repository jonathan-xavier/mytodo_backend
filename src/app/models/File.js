

const {Model,Sequelize,} = require('sequelize');

 class File extends Model{
                    //esse nome poderia ser connection
     static init(sequelize){
         super.init({
             nome: Sequelize.STRING,
             path: Sequelize.STRING,
           

         },{
             sequelize,

         }); 
      

         return this;
     }

  
 }

 module.exports = File;
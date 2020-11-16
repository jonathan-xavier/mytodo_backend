

const {Model,Sequelize,} = require('sequelize');

 class File extends Model{
                    //esse nome poderia ser connection
     static init(sequelize){
         super.init({
             nome: Sequelize.STRING,
             path: Sequelize.STRING,
            url:{
                type:Sequelize.VIRTUAL,
                get(){
                    return `http://localhost:3333/files/${this.path}`;
                }
            },

         },{
             sequelize,

         }); 
      

         return this;
     }

  
 }

 module.exports = File;
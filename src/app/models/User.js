//instalar o bcrypt para encripitação de senha.
const bcrypt = require('bcryptjs');
const {Model,Sequelize,} = require('sequelize');

 class User extends Model{
                    //esse nome poderia ser connection
     static init(sequelize){
         super.init({
             nome: Sequelize.STRING,
             email: Sequelize.STRING,
             password:Sequelize.VIRTUAL,
             password_hash: Sequelize.STRING,

         },{
             sequelize,

         }); 
         //antes de salvar vai executar esse metodo
         this.addHook('beforeSave',async (user)=>{
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password,8);
            }
         });

         return this;
     }
 }

 module.exports = User;
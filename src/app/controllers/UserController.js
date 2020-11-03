const User = require("../models/User");


class UserController{
    async store(req,res){
        //verifica se ja tem o email cadastrado
        const userExists = await User.findOne({
            where: {email: req.body.email}
        });
        if(userExists){
            return res.status(400).json({error: 'Usuário já existe.'});

        }

            //estou passando so o email id e nome para o front
        const {id, nome,email} = await User.create(
            req.body
        );
     return res.json({id,nome,email});
    }
}

module.exports = new UserController();
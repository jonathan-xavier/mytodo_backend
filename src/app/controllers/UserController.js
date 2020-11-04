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

    //fazer alterações dos dados cadastrais
    async update(req,res){
            
        const {email, oldPassword} = req.body;
        const user = await User.findByPk(req.userId);

            //essa verificação é caso ele esteja mudando de email
            //se o email que ele esta passando é diferente do que ele ja tem
            //e se não tem nenhum usuário com esse email novo que ele está passsando.
        if(email !== user.email){
            const userExists = await User.findOne({
                where: {email: req.body.email}
            });
            if(userExists){
                return res.status(400).json({error: 'Usuário já existe.'});
    
            }
        }

        //verifica se a senha antiga bate com a que ele ja tem.
        //apenas se ele passar a senha antiga.
        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({error: 'Senha incorreta!'});
        } 
                                    //metodo que atualiza no banco
        const {id, nome} = await user.update(req.body);

        return res.json({
            id,
            nome,
            email,
        });
    }
}

module.exports = new UserController();
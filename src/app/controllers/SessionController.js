const jwt = require('jsonwebtoken');
const Yup = require("yup");
const User = require('../models/User');
const authConfig = require('../../config/auth');


class SessionController{
    async store(req,res){
          //aplicando validação de entrada
    const schema = Yup.object().shape({
        
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });
  
        const {email, password} = req.body;
        const user = await User.findOne({ 
            where: {email : email}});

        if(!user){
            return res.status(401).json({error: 'Usuário não encontrado!'});
        }    

        if(!(await user.checkPassword(password))){
            return res.status(401).json({error: 'Senha não corresponde.'});
        }

        const {id, nome} = user;
        return res.json({
            user:{
                id,
                nome,
                email,
            },
             token:jwt.sign({id},authConfig.secret,{
                 expiresIn: authConfig.expiresIn,
             }), //gerar md5 em algum site online
        });
    }
}

module.exports = new SessionController();
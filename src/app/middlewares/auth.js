//esse arquivo faz uma verificação se o usuário está logado.

const jwt = require('jsonwebtoken');
//pega uma funcao de callback e transforma em async await
const {promisify} = require('util');

const authConfig = require('../../config/auth');

module.exports = async (req,res,next)=>{
    //1 buscar o token
    //buscar no header
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error: 'Token não fornecido!'})
    }
        //descarta a primeira possição do array e pega só o token
    const [,token] = authHeader.split(' ');

    try {
        
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        //criar uma variavel na req para guardar o Id do usuario
        req.userId = decoded.id;
        
        return next();
    } catch (err) {
        return res.status(401).json({error: 'Token inválido'});
    }
};
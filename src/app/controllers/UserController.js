const Yup = require("yup");
const User = require("../models/User");
const Task = require('../models/Task');
class UserController {
    async store(req, res) {
        //aplicando validação de entrada
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Falha na validação'})
    }


    //verifica se ja tem o email cadastrado
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe." });
    }

    //estou passando so o email id e nome para o front
    const { id, nome, email } = await User.create(req.body);
    return res.json({ id, nome, email });
  }

  //fazer alterações dos dados cadastrais
  async update(req, res) {
        //aplicando validação de entrada
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6)
      .when('oldPassword', (oldPassword,field)=> 
       oldPassword ? field.required() : field
      ),
      //confirmar a senha
      confirmPassword: Yup.string().when('password',(password,field)=>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });//fim validação

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Falha na validação'})
    }


    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    //essa verificação é caso ele esteja mudando de email
    //se o email que ele esta passando é diferente do que ele ja tem
    //e se não tem nenhum usuário com esse email novo que ele está passsando.
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });
      if (userExists) {
        return res.status(400).json({ error: "Usuário já existe." });
      }
    }

    //verifica se a senha antiga bate com a que ele ja tem.
    //apenas se ele passar a senha antiga.
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Senha incorreta!" });
    }
    //metodo que atualiza no banco
    const { id, nome } = await user.update(req.body);

    return res.json({
      id,
      nome,
      email,
    });
  }
  //listar todos os usuários
  async index(req,res){
      const users = await User.findAll({
        attributes:['id','nome','email','avatar_id'],
        //include:[File],
      })
      return res.json(users);
  }
}

module.exports = new UserController();

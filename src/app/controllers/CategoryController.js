const Yup = require("yup");
const Category = require('../models/Category');
const Task = require("../models/Task");


class CategoryController {
    //funcao para cadastrar uma categoria
    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação da categoria' })
        }

        const categoriaExiste = await Category.findOne({
            where: { title: req.body.title },
        });
        if (categoriaExiste) {
            return res.status(400).json({ error: 'Categoria já existe' })
        }

        const { id, title } = await Category.create(req.body);
        return res.json({ id, title });
    }
    //funcao para atualizar a categoria(não fiz ainda)
    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação' });
        }

        
        await Category.update(req.body,{
            where:{
                id: req.body.id,
            }
        })
       return res.json({
           message: "Atualizado com sucesso!",
       });
     
    }
    //listar categoria
    async index(req,res){
        const category = await Category.findAll({
            attributes:['id','title'],
            include:[{
                model: Task,
                attributes:['title','description']
            }],
        })
        return res.json(category);
    }
    //deletar categorias
    async delete(req,res){
        var id = req.body.id;
        if(id != undefined){
            if(!isNaN(id)){ //essa linha verifica se é um número o id
                Category.destroy({
                    where:{
                        id:id
                    }
                }).then(()=>{
                    res.json({message: 'Excluido com sucesso!'});
                })
            }else{//não é um número se cair aqui
                res.status(400).json({error: 'Esse id não é um número!'});
            }
        }else{
            res.status(400).json({error: 'id undefined'});
        }
    }



}

module.exports = new CategoryController();
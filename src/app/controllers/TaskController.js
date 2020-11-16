const Yup = require("yup");
const Task = require('../models/Task');
const { parseISO, format } = require('date-fns');


class TaskController {

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            //data: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação' })
        }

        //verifica se ja existe uma tarefa
        const taskExists = await Task.findOne({
            where: { title: req.body.title }
        });
        if (taskExists) {
            return res.status(400).json({ error: 'Tarefa com mesmo nome já existe' });
        }

        //passando o titulo e descrição da tarefa
        const { id, title, description } = await Task.create(req.body);


        return res.json({ id, title, description });
    }
    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação' });
        }

        await Task.update(req.body, {
            where: {
                id: req.body.id,
            }
        });
        return res.json({ message: 'Tarefa Atualizada!' });
    }
    async index(req, res) {
        //aplicando paginação
        const { page = 1 } = req.query;

        //tenho que mostar a data formatada no mobile
        const task = await Task.findAll({
            attributes: ['id', 'title', 'description', 'createdAt', 'category_id'],
            limit: 15,
            offset: (page - 1) * 15,//vai pular de 15 em 15 tarefas
            //order:['createdAt']
        });
        return res.json(task);
    }
    async delete(req, res) {
        var id = req.body.id;
        if (id != undefined) {
            if (!isNaN(id)) {
                await Task.destroy({
                    where: {
                        id: id,
                    }
                }).then(() => {
                    return res.json({ message: 'Tarefa excluida com sucesso!' });
                });
            } else {
                res.status(400).json({ error: 'Esse id não é um número!' });
            }
        } else {
            res.status(400).json({ error: 'id undefined' });
        }
    }
}
module.exports = new TaskController();
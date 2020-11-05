//esse aquivo serve para salvar imagens
//e enviar para a pasta tmp/uploads

const multer = require('multer');
const crypto = require('crypto');
const {extname, resolve} = require('path')

module.exports =  {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..','..','tmp','uploads'),
        filename: (req,file,cb)=>{
            crypto.randomBytes(16, (err,res)=>{
                if(err) return cb(err);

                //vai ficar assim u11o7524df.png
                return cb(null, res.toString('hex') + extname(file.originalname));
            })
        },
    }),
};
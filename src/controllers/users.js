//sequelize.org documentatie

const { response } = require('express');
const db = require('../../models')

module.exports.getAllUsers = async (req, res) =>{
    try{
        const allUsers = await db.User.findAll();
        res.send(allUsers);
    }catch(err)
    {
        console.error('something went wrong')
        res.send({
            error:"something went wrong",
        })
    }    
}
//returnezi userul 
module.exports.getUserById = async (req, res) =>{
    const id = req.params.id

    try{
        const user = await db.User.findOne({where : {id : id}})
        if (user === null){
            res.status(404);
            res.send("user not found");
        }
        res.status(200)
        res.send(user)
    }catch(error)
    {
        console.error(error)
        res.send({
            error:"Something went wrong"
        })
    }

}

module.exports.createUser = async (req, res) =>{
    const {
        id,
        email,
        firstName,
        lastName,
    } = req.body

    try{
    const newUser = await db.User.create({
        email:email,
        firstName:firstName,
        lastName:lastName,
        createdAt:new Date(),
        updatedAt:new Date()
    })
    console.log(newUser)
    res.send(newUser)
    }catch(err){
        console.error(err)
        res.send({
            error:"something went wrong"
        })
    }
}

//returnezi update ul 
module.exports.updateUser = async (req, res) =>{
    const id = req.params.id
    const {
        email,
        firstName,
        lastName,
    } = req.body

    try{
        const updateUser = await db.User.update({
        email:email,
        firstName:firstName,
        lastName:lastName,
        createdAt:new Date(),
        updatedAt:new Date()
    }, {where:{
        id : id
    }})
    }catch(err){
        console.error(err)
        res.send({
            error:"something went wrong"
        })
    }

    try{
        const user = await db.User.findOne({where : {id : id}})
        if (user === null){
            res.status(404);
            res.send("user not found");
        }
        res.status(200)
        res.send(user)
    }catch(error)
    {
        console.error(error)
        res.send({
            error:"Something went wrong"
        })
    }
}

//dai 202
module.exports.deleteUser = async (req, res) =>{
    const id = req.params.id
    try{
        const deleteUser = await db.User.destroy({
            where : {
                id:id
            }
        })
        res.status(202)
        res.send()
    }catch(err)
    {
        console.error(err)
        res.send({
            error:"something went wrong"
        })
    }
}

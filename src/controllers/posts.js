//sequelize.org documentatie

const { response } = require('express');
const db = require('../../models')

module.exports.getAllPosts = async (req, res) =>{
    try{
        const allPosts = await db.Post.findAll();
        res.send(allPosts);
    }catch(err)
    {
        console.error('something went wrong')
        res.send({
            error:"something went wrong",
        })
    }    
}
//returnezi userul 
module.exports.getPostById = async (req, res) =>{
    const id = parseInt(req.params.id)
    //sequelize associations -> advnaced assosiation concept -> foo.belongsto(bar)
    try{
        const pst = await db.Post.findByPk(id)
        console.log(pst)
        const author = await pst.getUser();
        
        const response = {
            ...pst.dataValues,
            author,
        }

        if (user === null){
            res.status(404);
            res.send("user not found");
        }
        res.status(200)
        res.send(response)
    }catch(error)
    {
        console.error(error)
        res.send({
            error:"Something went wrong"
        })
    }

}

module.exports.createPost = async (req, res) =>{
    const userId = req.params.id;
    
    const {
        title,
        body
    } = req.body

    try{
        const user = await db.User.findByPk(userId)

        const newPost = {
            title,
            body,
        }

        const createdPost = await user.createPost(newPost)
        console.log("cratedPost", createdPost)

        res.status(201).send(newPost);

    }catch(err){
        console.error(err)
        res.send({
            error:"something went wrong"
        })
    }
}

//returnezi update ul 
module.exports.updatePost = async (req, res) =>{
    const id = req.params.id
    const {
        email,
        firstName,
        lastName,
    } = req.body

    try{
        const updateUser = await db.Post.update({
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
        const user = await db.Post.findOne({where : {id : id}})
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
module.exports.deletePost = async (req, res) =>{
    const id = req.params.id
    try{
        const deleteUser = await db.Post.destroy({
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

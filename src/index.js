const express = require('express')
const {handleGreeting} = require('./greeting')
const jwt = require("jsonwebtoken");
const app = express()
const port = 3001 
const MY_SECRET_KEY = "SUPERSECRETDISCRET"
const bodyParser = require("body-parser")

const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require("./controllers/users")
const {getAllPosts, getPostById, createPost, updatePost, deletePost} = require("./controllers/posts")


//de pus autorizare in middleware 
app.use(bodyParser.json());

const authorizationMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    console.log(authorization)
    if (authorization)
    {
        try{
            jwt.verify(authorization.replace('Bearer ', ''), MY_SECRET_KEY)
            next()
        }
        catch(e)
        {
            res.send("invalid token")
        }
    }
    res.send("no token")
}

app.get("/hello/:name?", authorizationMiddleware, (request, response) => {
    handleGreeting(request, response)
})

app.get("/hello", authorizationMiddleware, (request, response) => {
    handleGreeting(request, response)
})

app.get("/", (request, response) => {
    response.send("Hello world")
})

const findUser = (username, password) => {

        if(username ==='admin' && password === 'admin')
        return {
            username
        }
        return null;
    
}

app.post("/login", (req, res) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    if(findUser(username, password)){
        const jwtResponse = jwt.sign({}, MY_SECRET_KEY)
        res.send({
            jwtResponse,
        });
    }
    else
    {
        res.status(401).send({
            jwtResponse:null,
        });
    }
    

})


app.get("/users", getAllUsers );
app.get("/users/:id", getUserById)
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser)


app.get("/posts", getAllPosts );
app.get("/posts/:id", getPostById)
app.post("/posts", createPost);
app.put("/posts/:id", updatePost);
app.delete("/posts/:id", deletePost)


app.listen(port, () => {
    console.log("started on port")
})


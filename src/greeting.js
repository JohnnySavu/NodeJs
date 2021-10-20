const handleGreeting = (request, response) =>{
    const params = request.params
    console.log(params)
    if (!params.name)
    {
        response.send("HelloWorld")
    }
    else 
    {
        let message = "Hello" + params.name
        response.send(message)

    }
}

module.exports.handleGreeting = handleGreeting;
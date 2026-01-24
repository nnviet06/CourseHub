const userRouter = require('express').Router()

interface User{
    username: String;
    name: String;
    id: String
}

userRouter.get('/', async (request, response) => {
    const users: Array<User> = []
    response.json(users)
})


module.exports = userRouter
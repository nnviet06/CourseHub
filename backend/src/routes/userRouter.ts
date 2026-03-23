// user routes

import express from 'express'
import { getAllUsers, createUser } from '../controllers/userController'

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
// userRouter.post('/', createUser)

export default userRouter

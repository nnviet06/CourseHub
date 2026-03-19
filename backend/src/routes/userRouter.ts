import express from 'express'
import { login, signup } from '../controllers/authController'
import { getAllUsers } from '../controllers/userController'

const userRouter = express.Router()

userRouter.get('/', getAllUsers)

export default userRouter

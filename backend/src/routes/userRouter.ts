import express from 'express'
import { getAllUsers, getCurrentUser } from '../controllers/userController'
import { authenticateUser } from '../utils/middleware/authentication'

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.get('/current', authenticateUser, getCurrentUser)
// userRouter.post('/', createUser)

export default userRouter

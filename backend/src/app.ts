// Express app setup — middleware, routes, error handlers

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/userRouter'
import authRouter from './routes/authRouter'

dotenv.config()

const app = express()

// Middleware 
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(cookieParser())

// Mount api routes
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)


export default app

import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/userRouter'
import authRouter from './routes/authRouter'

dotenv.config()

const app = express()

// ─── Middleware ───
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(cookieParser())

// ─── Routes ───
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

// ─── Health Check ───
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// ─── 404 ───
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: '404 not found' })
})

// ─── Global Error Handler ───
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

export default app

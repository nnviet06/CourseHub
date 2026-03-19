// Initialize express app and set up routes
// This file is exported to server.ts for start up 

import express from 'express'
import router from './routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

// Start app
const app = express()

// Setup middlewares
app.use(express.json()) 
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());

// Mount api routes
app.use(router)



const PORT = '3006'

app.listen(PORT, () => {
    console.log('running on port 3006')
    console.log("http://localhost:3006/api/users");
})


export default app

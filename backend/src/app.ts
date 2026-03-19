import express from 'express'
import userRouter from './controllers/user'



const app = express()
app.use(express.json()) 

app.use('/api/users', userRouter)



const PORT = '3006'

app.listen(PORT, () => {
    console.log('running on port 3006')
    console.log("http://localhost:3006/api/users");
})


export default app

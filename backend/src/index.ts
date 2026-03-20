// Entry point — connects to DB then starts the server

import { connectDatabase } from './database'
import app from './app'

const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Health check: http://localhost:${PORT}/health`)
  })
}

start()

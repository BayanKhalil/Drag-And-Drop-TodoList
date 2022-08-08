import express, { Express } from "express"
import mongoose, { ConnectOptions } from "mongoose"
import cors from "cors"
import todoRoutes from "./controllers/todos/index"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(todoRoutes)

// const uri=`mongodb://${process.env.MONGODB_URL}`;



mongoose
  .connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true }as ConnectOptions)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })
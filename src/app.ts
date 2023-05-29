import cors from 'cors'
import express, { Application, Request } from 'express'
const app: Application = express()

// using cors
app.use(cors())

// parse data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req: Request, res: any) => {
  res.send('Hello World!')
})

export default app

import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import router from './app/modules/users/users.route'
const app: Application = express()
// using cors
app.use(cors())

// parse data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  res.send('server is working')
})
app.use('/api/v1/users/', router)

export default app

// data base connection ja ja dorkar tai tai akhane thakbe
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/logger'

async function dataMonstar() {
  try {
    await mongoose
      .connect(config.database_Url as string)
      .then(() => logger.info('Database is connected'))
    app.listen(config.port, () => {
      logger.info(`server listening port  is : ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('database connnection error', err)
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
dataMonstar()

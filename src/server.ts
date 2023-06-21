// data base connection ja ja dorkar tai tai akhane thakbe
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorlogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errorlogger.error('uncaught expection is detected', error);
  process.exit(1);
});
let server: Server;
async function dataMonstar() {
  try {
    await mongoose
      .connect(config.database_Url as string)
      .then(() => logger.info('Database is connected'));
    server = app.listen(config.port, () => {
      logger.info(`server listening port  is : ${config.port}`);
    });
  } catch (err) {
    errorlogger.error('database connnection error', err);
  }

  process.on('unhandledRejection', error => {
    errorlogger.error('unhandle rejection detected we are closing server');
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
dataMonstar();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is receved');
  if (server) {
    server.close();
  }
});

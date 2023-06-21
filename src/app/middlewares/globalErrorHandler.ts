/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/*eslint-disable no-unused-vars */
/*@typescript-eslint/no-unused-vars*/

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../error/ApiError';
import handleCastError from '../../error/handleCastError';
import handleValidationError from '../../error/handleValidationError';
import handleZodError from '../../error/handleZodError';
import { GenericErrorMessage } from '../../interfaces/error';
import { errorlogger } from '../../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.node_env === 'development'
    ? console.log('global error handler theke ----~~~~~~', error)
    : errorlogger.error(' global error handler theke ----~~~~~~', error);

  let statusCode = 500;
  let message = 'something went wrong';
  let errorMessage: GenericErrorMessage[] = [];

  if (error.name == 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    (message = simplifiedError.message),
      (errorMessage = simplifiedError.errorMessage);
  } else if (error.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message);
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof Error) {
    message = 'something went wrong from instance';
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.node_env !== 'production' ? error.stack : undefined,
  });
};

export default globalErrorHandler;

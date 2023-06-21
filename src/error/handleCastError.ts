import mongoose from 'mongoose';
import { GenericErrorMessage } from '../interfaces/error';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: GenericErrorMessage[] = [
    {
      path: error.path,
      message: 'invalid id',
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorMessage: errors,
  };
};

export default handleCastError;

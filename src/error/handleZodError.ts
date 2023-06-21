import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorRespone } from '../interfaces/common';
import { GenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorRespone => {
  const errors: GenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorMessage: errors,
  };
};

export default handleZodError;

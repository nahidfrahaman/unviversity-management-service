import { z } from 'zod';
import {
  academicSemisterCodes,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.contant';

const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemisterTitles] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.string({
      required_error: 'year is required',
    }),
    code: z.enum([...academicSemisterCodes] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      required_error: 'start month is required',
    }),
    endMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      required_error: 'end month is rquired ',
    }),
  }),
});

const updateAcademicSemisterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemisterTitles] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is required',
        })
        .optional(),
      code: z
        .enum([...academicSemisterCodes] as [string, ...string[]], {
          required_error: 'code is required',
        })
        .optional(),
      startMonth: z
        .enum([...academicSemisterMonths] as [string, ...string[]], {
          required_error: 'start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemisterMonths] as [string, ...string[]], {
          required_error: 'end month is rquired ',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && data.body.code),
    {
      message: 'Either both title and code should be provide or neither ',
    }
  );

export const AcademicSemisterValidation = {
  createAcademicSemisterZodSchema,
  updateAcademicSemisterZodSchema,
};

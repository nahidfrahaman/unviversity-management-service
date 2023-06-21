import { z } from 'zod';

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    academicFaculty: z.string({
      required_error: 'academicFaculty id is required',
    }),
  }),
});
const updatedAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
    academicFaulty: z
      .string({
        required_error: 'academicFaculty id is required',
      })
      .optional(),
  }),
});
export const AcademicDepartmentZodValidation = {
  createAcademicDepartmentZodSchema,
  updatedAcademicDepartmentZodSchema,
};

import { z } from 'zod';
const createManagementDeparmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});
const updateManagementDeparmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

export const ManagementDepartmentValidation = {
  createManagementDeparmentZodSchema,
  updateManagementDeparmentZodSchema,
};

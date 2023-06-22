import { z } from 'zod';

const upadeteUserAdminZodSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      faculty: z
        .object({
          name: z.object({
            firstName: z.string().optional(),
            middleName: z.string().optional(),
            lastName: z.string().optional(),
          }),
          gender: z.enum(['male', 'female']).optional(),
          dateOfBirth: z.string().optional(),
          email: z.string().optional(),
          contactNo: z.string().optional(),
          emergencyContactNo: z.string().optional(),
          presentAddress: z.string().optional(),
          permanentAddress: z.string().optional(),
          managementDepartment: z.string().optional(),
          bloodGroup: z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
          profileImage: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export const AdminValidation = {
  upadeteUserAdminZodSchema,
};

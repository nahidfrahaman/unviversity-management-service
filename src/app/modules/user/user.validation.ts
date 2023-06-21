import { z } from 'zod';

const createUserStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'first Name is required',
        }),
        middleName: z.string(),
        lastName: z.string({
          required_error: 'last Name is required',
        }),
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'date of birth is required',
      }),
      email: z.string({
        required_error: 'email is required',
      }),
      contactNo: z.string({
        required_error: 'contact no is rquired',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergency constact no is rquired',
      }),
      presentAddress: z.string({
        required_error: 'present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'present address is required',
      }),

      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        required_error: 'bloodGroup is required',
      }),

      guardian: z.object({
        fatherName: z.string({
          required_error: 'fatherName is required',
        }),
        fatherOccupation: z.string({
          required_error: 'fatherOccupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'fatherContactNo is required',
        }),
        motherName: z.string({
          required_error: 'motherName is required',
        }),
        motherOccupation: z.string({
          required_error: 'otherOccupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'motherContactNo is required',
        }),
        address: z.string({
          required_error: 'gurdian address is required',
        }),
      }),

      localGuardian: z.object({
        name: z.string({
          required_error: 'local gurdian Name is rquired',
        }),
        occupation: z.string({
          required_error: 'local occupation  is rquired',
        }),
        contactNo: z.string({
          required_error: 'local gurdian contactNo is rquired',
        }),
        address: z.string({
          required_error: 'local gurdian address is rquired',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});
const createUserFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'first Name is required',
        }),
        middleName: z.string(),
        lastName: z.string({
          required_error: 'last Name is required',
        }),
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'date of birth is required',
      }),
      email: z.string({
        required_error: 'email is required',
      }),
      contactNo: z.string({
        required_error: 'contact no is rquired',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergency constact no is rquired',
      }),
      presentAddress: z.string({
        required_error: 'present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'present address is required',
      }),

      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        required_error: 'bloodGroup is required',
      }),

      guardian: z.object({
        fatherName: z.string({
          required_error: 'fatherName is required',
        }),
        fatherOccupation: z.string({
          required_error: 'fatherOccupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'fatherContactNo is required',
        }),
        motherName: z.string({
          required_error: 'motherName is required',
        }),
        motherOccupation: z.string({
          required_error: 'otherOccupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'motherContactNo is required',
        }),
        address: z.string({
          required_error: 'gurdian address is required',
        }),
      }),

      localGuardian: z.object({
        name: z.string({
          required_error: 'local gurdian Name is rquired',
        }),
        occupation: z.string({
          required_error: 'local occupation  is rquired',
        }),
        contactNo: z.string({
          required_error: 'local gurdian contactNo is rquired',
        }),
        address: z.string({
          required_error: 'local gurdian address is rquired',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createUserStudentZodSchema,
  createUserFacultyZodSchema,
};

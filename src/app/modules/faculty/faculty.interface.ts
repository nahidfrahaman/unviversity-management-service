import { Model, ObjectId } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

type FacultyUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IFaculty = {
  id: string;
  name: FacultyUserName;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  academicDepartment: ObjectId | IAcademicDepartment;
  academicFaculty: ObjectId | IAcademicFaculty;
  profileImage?: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

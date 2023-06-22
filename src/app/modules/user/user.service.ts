import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../../config/index';
import { default as ApiError } from '../../../error/ApiError';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFaculytId,
  generateStudentId,
} from './user.utils';

const createStudent = async (
  student: IStudent,
  userData: IUser
): Promise<IUser | null> => {
  // const id = await generateStudentId(academicSemister);
  // user.id = id;

  // akta default password lagbe
  if (!userData.password) {
    userData.password = config.default_student_Pass as string;
  }

  userData.role = 'student';

  const academicSemister = await AcademicSemister.findById(
    student.academicSemister
  );

  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemister);
    userData.id = id;
    student.id = id;
    const createdStudent = await Student.create([student], { session });
    if (!createdStudent.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'created student failed');
    }

    // Append student id into user
    userData.student = createdStudent[0]._id;

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'failed to create user');
    }

    newUserAllData = newUser[0];
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemister',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

const createFaculty = async (
  faculty: IFaculty,
  userData: IUser
): Promise<IUser | null> => {
  if (!userData.password) {
    userData.password = config.default_faculty_Pass as string;
  }

  userData.role = 'faculty';

  let newUserAllData: any = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFaculytId();

    userData.id = id;
    faculty.id = id;
    const createdFaculty = await Faculty.create([faculty], { session });
    if (!createdFaculty.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'created Faculty failed');
    }

    // Append Faculty id into user
    userData.faculty = createdFaculty[0]._id;

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'failed to create user');
    }

    newUserAllData = newUser[0];
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};
const createAdmin = async (
  admin: IAdmin,
  userData: IUser
): Promise<IUser | null> => {
  if (!userData.password) {
    userData.password = config.default_admin_Pass as string;
  }

  userData.role = 'Admin';

  let newUserAllData: any = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id: string = await generateAdminId();

    userData.id = id;
    admin.id = id;

    const createdFaculty = await Admin.create([admin], { session });
    if (!createdFaculty.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'created Faculty failed');
    }

    // Append Faculty id into user
    userData.admin = createdFaculty[0]._id;

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'failed to create user');
    }

    newUserAllData = newUser[0];
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};

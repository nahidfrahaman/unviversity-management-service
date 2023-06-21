/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../error/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IpaginationOption } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { studentSearchabeFields } from './studentConstant';

const getStudent = async (
  filters: IStudentFilters,
  paginationOption: IpaginationOption
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  type Condition = {
    $or?: { [key: string]: { $regex: string; $options: string } }[];
    $and?: { [key: string]: unknown }[];
  };
  const andCondition: Condition[] = [];

  if (searchTerm) {
    andCondition.push({
      $or: studentSearchabeFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const { page, limit, skip, sortBy, sortByOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const sortConditon: { [key: string]: SortOrder } = {};
  if (sortBy && sortByOrder) {
    sortConditon[sortBy] = sortByOrder;
  }

  const results = await Student.find(whereCondition).skip(skip).limit(limit);
  const total = await Student.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: results,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const results = await Student.findOne({ id: id });
  return results;
};

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardian, localGuardian, ...studentData } = payload;

  const user = await Student.findById(id);

  if (!user) {
    throw new ApiError(StatusCodes.OK, 'user not found');
  }

  const updateStudentData: Partial<IStudent> = studentData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const namekey = `name.${key}`;
      updateStudentData[namekey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>; // `guardian.fisrtguardian`
      (updateStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]; // updateStudentData['guardian.motherContactNo']=guardian[motherContactNo]
      // updateStudentData --> object create --> guardian : { motherContactNo: 0177}
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuradianKey =
        `localGuardian.${key}` as keyof Partial<IStudent>; // `localGuardian.fisrtName`
      (updateStudentData as any)[localGuradianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const results = await Student.findOneAndUpdate(
    { _id: id },
    updateStudentData,
    {
      new: true,
    }
  );
  return results;
};

const deleteStudent = async (id: string) => {
  const session = await mongoose.startSession();

  let deletUser = null;
  try {
    session.startTransaction();
    const results = await Student.findOneAndDelete({ id }, { session })
      .populate('academicFaculty')
      .populate('academicSemister')
      .populate('academicDepartment');

    const deleteUser = await User.findOneAndDelete({ id }, { session });
    deletUser = results;
    //commit
    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
  return deletUser;
};
export const StudentService = {
  getStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};

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
import { facultySearchabeFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';

const getFaculty = async (
  filters: IFacultyFilters,
  paginationOption: IpaginationOption
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  type Condition = {
    $or?: { [key: string]: { $regex: string; $options: string } }[];
    $and?: { [key: string]: unknown }[];
  };
  const andCondition: Condition[] = [];

  if (searchTerm) {
    andCondition.push({
      $or: facultySearchabeFields.map(field => ({
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

  const results = await Faculty.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty')
    .populate('academicDepartment');
  const total = await Faculty.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: results,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const results = await Faculty.findOne({ id: id });
  return results;
};

const updateFaculty = async (id: string, payload: Partial<IFaculty>) => {
  const { name, ...facultyData } = payload;

  const user = await Faculty.findById(id);

  if (!user) {
    throw new ApiError(StatusCodes.OK, 'user not found');
  }

  const updatefacultyData: Partial<IFaculty> = facultyData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const namekey = `name.${key}`;
      updatefacultyData[namekey] = name[key as keyof typeof name];
    });
  }

  const results = await Faculty.findOneAndUpdate(
    { _id: id },
    updatefacultyData,
    {
      new: true,
    }
  );
  return results;
};
const deleteFaculty = async (id: string) => {
  const isExist = await Faculty.findOne({ id });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'faculty not found');
  }

  const session = await mongoose.startSession();

  let deletUser = null;
  try {
    session.startTransaction();
    const results = await Faculty.findOneAndDelete({ id }, { session })
      .populate('academicFaculty')

      .populate('academicDepartment');

    const deletedUser = await User.findOneAndDelete({ id }, { session });
    deletUser = deletedUser;
    //commit
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
  return deletUser;
};
export const FacultyService = {
  getFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};

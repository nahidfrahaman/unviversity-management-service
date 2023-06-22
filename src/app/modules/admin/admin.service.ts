/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../error/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IpaginationOption } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { adminSearchabeFields } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdmin = async (
  filters: IAdminFilters,
  paginationOption: IpaginationOption
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;

  type Condition = {
    $or?: { [key: string]: { $regex: string; $options: string } }[];
    $and?: { [key: string]: unknown }[];
  };
  const andCondition: Condition[] = [];

  if (searchTerm) {
    andCondition.push({
      $or: adminSearchabeFields.map(field => ({
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

  const results = await Admin.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .populate('managementDepartment');
  const total = await Admin.countDocuments(whereCondition);
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: results,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const results = await Admin.findOne({ id: id });
  return results;
};

const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  const { name, ...AdminData } = payload;

  const user = await Admin.findById(id);

  if (!user) {
    throw new ApiError(StatusCodes.OK, 'user not found');
  }

  const updateAdminData: Partial<IAdmin> = AdminData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const namekey = `name.${key}`;
      updateAdminData[namekey] = name[key as keyof typeof name];
    });
  }

  const results = await Admin.findOneAndUpdate({ _id: id }, updateAdminData, {
    new: true,
  }).populate('managementDepartment');
  return results;
};
const deleteAdmin = async (id: string) => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Admin not found');
  }

  const session = await mongoose.startSession();

  let deletUser = null;
  try {
    session.startTransaction();
    const results = await Admin.findOneAndDelete({ id }, { session }).populate(
      'managementDepartment'
    );

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

export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};

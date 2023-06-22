import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../error/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IpaginationOption } from '../../../interfaces/pagination';
import {
  IManagementDepartment,
  IMangementFilters,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

const createMangement = async (data: IManagementDepartment) => {
  const results = await ManagementDepartment.create(data);
  return results;
};

const getAllManagement = async (
  filters: IMangementFilters,
  paginationOption: IpaginationOption
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const academicSemesterSearchableFields = ['title', 'year', 'code'];

  type Condition = {
    $or?: { [key: string]: { $regex: string; $options: string } }[];
    $and?: { [key: string]: unknown }[];
  };
  const andCondition: Condition[] = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchableFields.map(field => ({
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

  //   andCondition.push({
  //     $or: academicSemesterSearchableFields.map(field => ({
  //       [field]: {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     })),
  //   });
  // }

  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const { page, limit, skip, sortBy, sortByOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const sortConditon: { [key: string]: SortOrder } = {};
  if (sortBy && sortByOrder) {
    sortConditon[sortBy] = sortByOrder;
  }

  const results = await ManagementDepartment.find(whereCondition)
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: results,
  };
};

const getSingleManagement = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const results = await ManagementDepartment.findById(id);
  return results;
};

const updateManagement = async (
  id: string,
  payload: Partial<IManagementDepartment>
) => {
  const isExist = await ManagementDepartment.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.OK, 'management not found');
  }

  const results = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return results;
};

const deleteManagement = async (id: string) => {
  const isExist = await ManagementDepartment.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'management not found');
  }
  const results = await ManagementDepartment.findByIdAndDelete(id);
  return results;
};

export const ManagementDepartmentService = {
  createMangement,
  getAllManagement,
  getSingleManagement,
  updateManagement,
  deleteManagement,
};

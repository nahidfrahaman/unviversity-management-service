import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../error/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IpaginationOption } from '../../../interfaces/pagination';
import { AcademicSemisterCodeMapper } from './academicSemister.contant';
import {
  IAcademicFilters,
  IAcademicSemister,
} from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';

const createAcademicSemister = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (AcademicSemisterCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'semister code is not currect '
    );
  }
  const createdAcademicSemister = await AcademicSemister.create(payload);
  if (!createdAcademicSemister) {
    throw new ApiError(400, 'failed to create AcademicSemister');
  }
  return createdAcademicSemister;
};

const getAllSemisters = async (
  filters: IAcademicFilters,
  paginationOption: IpaginationOption
): Promise<IGenericResponse<IAcademicSemister[]>> => {
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

  // if (searchTerm) {
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

  const results = await AcademicSemister.find(whereCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemister.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: results,
  };
};

const getSingleSemister = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const results = await AcademicSemister.findById(id);
  return results;
};

const updateSemister = async (
  id: string,
  payload: Partial<IAcademicSemister>
) => {
  if (
    payload.title &&
    payload.code &&
    AcademicSemisterCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'semister code is not currect '
    );
  }

  const results = await AcademicSemister.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return results;
};

const deleteSemister = async (id: string) => {
  const results = await AcademicSemister.findByIdAndDelete(id);
  return results;
};
export const AcademicSemisterService = {
  createAcademicSemister,
  getAllSemisters,
  getSingleSemister,
  updateSemister,
  deleteSemister,
};

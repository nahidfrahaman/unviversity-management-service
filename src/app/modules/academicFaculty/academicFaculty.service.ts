import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IpaginationOption } from '../../../interfaces/pagination';
import { academicFacultySearchableFields } from './academiFaculty.constant';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaulty.model';

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const results = await AcademicFaculty.create(payload);
  return results;
};

const getAllFaculty = async (
  filters: IAcademicFacultyFilters,
  paginationOption: IpaginationOption
) => {
  const { page, limit, skip, sortBy, sortByOrder } =
    paginationHelper.calculatePagination(paginationOption);
  const { searchTerm, ...filtersData } = filters;

  type Condition = {
    $or?: { [key: string]: { $regex: string; $options: string } }[];
    $and?: { [key: string]: unknown }[];
  };
  const andCondition: Condition[] = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicFacultySearchableFields.map(field => ({
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

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortByOrder) {
    sortConditions[sortBy] = sortByOrder;
  }
  const results = await AcademicFaculty.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: results,
  };
};

const getSingleFaculty = async (id: string) => {
  const results = await AcademicFaculty.findById(id);
  return results;
};

const updateFaculty = async (id: string, payload: IAcademicFaculty) => {
  const results = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return results;
};

const deleteFaculty = async (id: string) => {
  const results = await AcademicFaculty.findByIdAndDelete(id, {
    new: true,
  });
  return results;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllFaculty,
  updateFaculty,
  getSingleFaculty,
  deleteFaculty,
};

import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IpaginationOption } from '../../../interfaces/pagination';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createDepartment = async (payload: IAcademicDepartment) => {
  const results = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return results;
};

const getAllDepartmen = async (
  filters: IAcademicDepartmentFilters,
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
      $or: academicDepartmentFilterableFields.map(field => ({
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

  const results = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: results,
  };
};

const getSingleDepartment = async (id: string) => {
  const results = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return results;
};

const updateDepartment = async (id: string, payload: IAcademicDepartment) => {
  const results = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return results;
};

const deleteDepartment = async (id: string) => {
  const results = await AcademicDepartment.findByIdAndDelete(id).populate(
    'academicFaculty'
  );
  return results;
};

export const AcdemicDepartmentService = {
  createDepartment,
  getAllDepartmen,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};

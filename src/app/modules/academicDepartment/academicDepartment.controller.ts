import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/paginationFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartmentFilters } from './academicDepartment.interface';
import { AcdemicDepartmentService } from './academicDepartment.service';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const results = await AcdemicDepartmentService.createDepartment(data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Crate Academic Faculty successfuly',
    data: results,
  });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters: IAcademicDepartmentFilters = pick(req.query, [
    'searchTerm',
    'title',
  ]);
  const paginationOption = pick(req.query, paginationFields);

  const results = await AcdemicDepartmentService.getAllDepartmen(
    filters,
    paginationOption
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Crate Academic Faculty successfuly',
    data: results,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const results = await AcdemicDepartmentService.getSingleDepartment(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Department fetched successfully',
    data: results,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const results = await AcdemicDepartmentService.updateDepartment(
    id,
    updatedData
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: results,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const results = await AcdemicDepartmentService.deleteDepartment(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Department deleted successfully',
    data: results,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};

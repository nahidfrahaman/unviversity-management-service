import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/paginationFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFacultyFilters } from '../academicFaculty/academicFaculty.interface';
import { facultySearchabeFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { FacultyService } from './faculty.service';

const getFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters: IAcademicFacultyFilters = pick(
    req.query,
    facultySearchabeFields
  );

  const paginationOption = pick(req.query, paginationFields);

  const results = await FacultyService.getFaculty(filters, paginationOption);

  sendResponse<IFaculty[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'all academic faculty here',
    meta: results.meta,
    data: results.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const results = await FacultyService.getSingleFaculty(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'signle faculty here',
    data: results,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const results = await FacultyService.updateFaculty(id, updatedData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty update successfuly',
    data: results,
  });
});

const deletFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const results = await FacultyService.deleteFaculty(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'delete faculty successfuly',
    data: results,
  });
});

export const FacultyController = {
  getFaculty,
  getSingleFaculty,
  updateFaculty,
  deletFaculty,
};

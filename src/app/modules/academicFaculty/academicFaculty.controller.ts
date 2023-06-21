import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/paginationFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFilters } from '../academicSemister/academicSemister.interface';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const results = await AcademicFacultyService.createAcademicFaculty(data);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Crate Academic Faculty successfuly',
      data: results,
    });
  }
);
const getAllFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters: IAcademicFilters = pick(req.query, ['searchTerm', 'title']);

    const paginationOptions = pick(req.query, paginationFields);

    const results = await AcademicFacultyService.getAllFaculty(
      filters,
      paginationOptions
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'get Academic Faculty successfuly',
      meta: results?.meta,
      data: results.data,
    });
  }
);

const getSingleFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const results = await AcademicFacultyService.getSingleFaculty(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'get Academic Faculty successfuly',
      data: results,
    });
  }
);

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const results = await AcademicFacultyService.updateFaculty(id, updatedData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'get Academic Faculty successfuly',
    data: results,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const results = await AcademicFacultyService.deleteFaculty(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' Academic Faculty delete successfuly',
    data: results,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllFaculty,
  updateFaculty,
  getSingleFaculty,
  deleteFaculty,
};

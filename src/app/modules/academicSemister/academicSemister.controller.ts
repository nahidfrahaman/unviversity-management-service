import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/paginationFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  IAcademicFilters,
  IAcademicSemister,
} from './academicSemister.interface';
import { AcademicSemisterService } from './academicSemister.service';

const createAcademicSemister = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const results = await AcademicSemisterService.createAcademicSemister(data);

    sendResponse<IAcademicSemister>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'user created Successfuly',
      data: results,
    });
  }
);

const getAcademicSemisters = catchAsync(async (req: Request, res: Response) => {
  const filters: IAcademicFilters = pick(req.query, [
    'searchTerm',
    'title',
    'year',
    'code',
  ]);

  const paginationOption = pick(req.query, paginationFields);

  const results = await AcademicSemisterService.getAllSemisters(
    filters,
    paginationOption
  );

  sendResponse<IAcademicSemister[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'all academic semister here',
    meta: results.meta,
    data: results.data,
  });
});

const getSingleSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const results = await AcademicSemisterService.getSingleSemister(id);

  // res.status(200).json({
  //   sucess: true,
  //   data: results,
  // });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'signle semister here',
    data: results,
  });
});

const updateSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const results = await AcademicSemisterService.updateSemister(id, updatedData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'signle semister here',
    data: results,
  });
});

const deleteSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const results = await AcademicSemisterService.deleteSemister(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'delete semister successfuly',
    data: results,
  });
});

export const AcademicSemisterController = {
  createAcademicSemister,
  getAcademicSemisters,
  getSingleSemister,
  updateSemister,
  deleteSemister,
};

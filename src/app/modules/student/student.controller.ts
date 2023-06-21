import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/paginationFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IStudent, IStudentFilters } from './student.interface';
import { StudentService } from './student.service';
import { studentSearchabeFields } from './studentConstant';

const getStudent = catchAsync(async (req: Request, res: Response) => {
  const filters: IStudentFilters = pick(req.query, studentSearchabeFields);

  const paginationOption = pick(req.query, paginationFields);

  const results = await StudentService.getStudent(filters, paginationOption);

  sendResponse<IStudent[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'all academic semister here',
    meta: results.meta,
    data: results.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const results = await StudentService.getSingleStudent(id);

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

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const results = await StudentService.updateStudent(id, updatedData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student update successfuly',
    data: results,
  });
});

const deletStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const results = await StudentService.deleteStudent(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'delete semister successfuly',
    data: results,
  });
});

export const StudentController = {
  getStudent,
  getSingleStudent,
  updateStudent,
  deletStudent,
};

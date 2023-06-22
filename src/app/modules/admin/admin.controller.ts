import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/paginationFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import { AdminService } from './admin.service';

const getAllAdmin = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters: IAdminFilters = pick(req.query, adminFilterableFields);

    const paginationOption = pick(req.query, paginationFields);

    const results = await AdminService.getAllAdmin(filters, paginationOption);

    sendResponse<IAdmin[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'all academic semister here',
      meta: results.meta,
      data: results.data,
    });
  }
);

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const results = await AdminService.getSingleAdmin(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'signle Admin here',
    data: results,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const results = await AdminService.updateAdmin(id, updatedData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin update successfuly',
    data: results,
  });
});

const deletAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const results = await AdminService.deleteAdmin(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'delete Admin successfuly',
    data: results,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deletAdmin,
};

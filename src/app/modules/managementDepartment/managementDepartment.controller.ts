import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/paginationFields';
import pick from '../../../shared/pick';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import {
  IManagementDepartment,
  IMangementFilters,
} from './managementDepartment.interface';
import { ManagementDepartmentService } from './managementDepartment.service';

const createMangement = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const results = await ManagementDepartmentService.createMangement(data);

  sendResponse<IManagementDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user created Successfuly',
    data: results,
  });
});

const getAllMangement = catchAsync(async (req: Request, res: Response) => {
  const filters: IMangementFilters = pick(
    req.query,
    managementDepartmentFilterableFields
  );

  const paginationOption = pick(req.query, paginationFields);

  const results = await ManagementDepartmentService.getAllManagement(
    filters,
    paginationOption
  );

  sendResponse<IManagementDepartment[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'all Mangement retrive successfuly',
    meta: results.meta,
    data: results.data,
  });
});

const getSingleManagement = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const results = await ManagementDepartmentService.getSingleManagement(id);

  sendResponse<IManagementDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'signle Management retrive successfuly',
    data: results,
  });
});

const updateManagement = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedData = req.body;
    const results = await ManagementDepartmentService.updateManagement(
      id,
      updatedData
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'signle semister here',
      data: results,
    });
  }
);

const deleteManagement = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const results = await ManagementDepartmentService.deleteManagement(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'delete Management successfuly',
      data: results,
    });
  }
);

export const ManagementDepartmentController = {
  createMangement,
  getAllMangement,
  getSingleManagement,
  updateManagement,
  deleteManagement,
};

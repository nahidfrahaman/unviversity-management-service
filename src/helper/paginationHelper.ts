import { SortOrder } from 'mongoose';

type IOption = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortByOrder?: SortOrder;
};

type IOptionResuts = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortByOrder: SortOrder;
};

const calculatePagination = (opiton: IOption): IOptionResuts => {
  const page = Number(opiton.page || 1);
  const limit = Number(opiton.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = opiton.sortBy || 'createdAt';
  const sortByOrder = opiton.sortByOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortByOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};

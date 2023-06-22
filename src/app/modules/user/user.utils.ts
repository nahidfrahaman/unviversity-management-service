import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../error/ApiError';
import { IAcademicSemister } from '../academicSemister/academicSemister.interface';
import { User } from './user.model';

const getLastStudentFromDb = async () => {
  const lastUser = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id ? lastUser.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemister | null
) => {
  const currentId: string =
    (await getLastStudentFromDb()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  if (academicSemester) {
    const { year, code } = academicSemester;
    incrementedId = `${year.substring(2)}${code}${incrementedId}`;
  } else {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'academic semister not found');
  }

  return incrementedId;
};

const getLastFacultyFromDb = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFaculytId = async () => {
  const currentId =
    (await getLastFacultyFromDb()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};

const getLastAdminFromDb = async () => {
  const lastFaculty = await User.findOne({ role: 'Admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  const currentId =
    (await getLastAdminFromDb()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;
  return incrementedId;
};

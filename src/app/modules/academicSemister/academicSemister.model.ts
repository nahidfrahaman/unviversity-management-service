import { StatusCodes } from 'http-status-codes';
import { Schema, model } from 'mongoose';
import ApiError from '../../../error/ApiError';
import { academicSemisterMonths } from './academicSemister.contant';
import { AcademicModel, IAcademicSemister } from './academicSemister.interface';

const academicSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicSchema.pre('save', async function () {
  const exist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });
  if (exist) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Academic Semister is already exist'
    );
  }
});

export const AcademicSemister = model<IAcademicSemister, AcademicModel>(
  'AcademicSemister',
  academicSchema
);

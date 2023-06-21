import { Model } from 'mongoose';

export type IAcademicSemisterTitles = 'Autumn' | 'Summer' | 'Fall';

export type IAcademicSemisterCodes = '01' | '02' | '03';

export type IAcademicSemisterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemister = {
  title: IAcademicSemisterTitles;
  year: string;
  code: IAcademicSemisterCodes;
  startMonth: IAcademicSemisterMonths;
  endMonth: IAcademicSemisterMonths;
};

export type AcademicModel = Model<IAcademicSemister>;

export type IAcademicFilters = {
  searchTerm?: string;
};

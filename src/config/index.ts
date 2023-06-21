/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_Url: process.env.URL,
  default_student_Pass: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_Pass: process.env.DEFAULT_FACULTY_PASS,
};

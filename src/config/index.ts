/* eslint-disable no-undef */
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  database_Url: process.env.URL,
  default_User_Pass: process.env.DEFAULT_USER_PASS,
}

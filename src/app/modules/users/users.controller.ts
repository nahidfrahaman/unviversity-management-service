import { Request, Response } from 'express'
import usersService from './users.service'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { users } = req.body
    const results = await usersService.createUsers(users)
    res.status(200).json({
      success: true,
      data: results,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `cannot created user error :  ${err}`,
    })
  }
}

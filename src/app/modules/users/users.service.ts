import config from '../../../config/index'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUsers = async (user: IUser): Promise<IUser | null> => {
  // atuogenrated id r
  const id = await generateUserId()

  user.id = id

  // akta default password lagbe
  if (!user.password) {
    user.password = config.default_User_Pass as string
  }
  const createdUser = await User.create(user)
  if (!createUsers) {
    throw new Error('failed to create user ')
  }

  return createdUser
}

export default {
  createUsers,
}

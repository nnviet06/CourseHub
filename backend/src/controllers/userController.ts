// Contains logic for user related routes, such as getting user info, updating user info, etc.

import {Request, Response} from 'express'

interface UserRes {
    username: String;
    name: String;
    id: String;
}


export const getAllUsers = (req: Request, res: Response) => {
  const users = Array<UserRes>[] 
  res.json(users)
}

export const getUserById = (req: Request, res: Response) => {

}

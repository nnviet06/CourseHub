// Contains logic for login and signup

import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
}

export const signup = (req: Request, res: Response) => {
    const { username, password } = req.body;
}
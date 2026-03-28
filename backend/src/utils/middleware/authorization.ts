import { Request, Response, NextFunction } from "express";
import type { Role } from '../../types/userTypes'

export const authorizeRoles = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized. No user found' })
      return;
    }
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden: invalid permission' })
      return;
    }
    next()
  }
}

import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from 'jsonwebtoken';
import type { UserPayload } from "../../types/userTypes";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    (error: VerifyErrors | null, decoded: any) => {
      if (error) {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }
      req.user = decoded as UserPayload;
      next();
    }
  );
};

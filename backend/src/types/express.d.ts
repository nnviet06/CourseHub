import { UserPayload } from './userTypes'

export { }


declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

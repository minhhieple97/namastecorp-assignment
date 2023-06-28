import { User } from './user/user.entity';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

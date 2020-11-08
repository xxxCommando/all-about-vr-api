import {
  Errback, Request, Response, NextFunction,
} from 'express';
import jwt from 'express-jwt';

import { ACCESS_TOKEN_SECRET } from '../constants/api.constants';

export const requireJWTAuthentication = (): jwt.RequestHandler => jwt({
  secret: ACCESS_TOKEN_SECRET,
  algorithms: ['HS256'],
});

export const loggedMiddleware = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Unauthorized. Invalid or missing token!' });
  } else {
    next('route');
  }
};

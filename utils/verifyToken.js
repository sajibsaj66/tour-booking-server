import Jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'you are not authenticated user!'));
  }
  Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(401, 'Token is not valid!'));
    req.user = user;
    next();
  });
};

//verify user check
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(401, 'user is not authorized!'));
    }
  });
};
//verify user Admin check
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(401, 'user is not authorized!'));
    }
  });
};

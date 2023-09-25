import { NextFunction, Request, Response } from 'express';
const { validationResult } = require('express-validator');

exports.validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

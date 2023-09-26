import { Request, Response, NextFunction } from 'express';
import { UserRequest } from '../types/types';

const JWT = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

// クライアントから渡されたJWT が正常か検証
const tokenDecode = (req: Request) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer: string = bearerHeader.split(' ')[1];
    try {
      const decodeToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodeToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};
// JWT 認証を検証するためのミドルウェア

exports.verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenDecoded = tokenDecode(req);
  //   console.log(tokenDecoded);
  if (tokenDecoded) {
    // そのJWT と一致するユーザーを探してくる
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json({ message: '権限がありません。' });
    }
    (req as unknown as { user: UserRequest }).user = user;
    next();
  } else {
    return res.status(401).json({ message: '権限がありません。' });
  }
};

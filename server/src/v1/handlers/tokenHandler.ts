import { Request, Response, NextFunction } from 'express';
import { UserRequest } from '../types/types';

const JWT = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

// express.Request に拡張でuser型を追加
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        username: string;
        password: string;
        __v: number;
      };
    }
  }
}

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
    const user: UserRequest = await User.findById((tokenDecoded as any).id);
    if (!user) {
      return res.status(401).json({ message: '権限がありません。' });
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json({ message: '権限がありません。' });
  }
};

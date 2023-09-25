import { Request, Response, NextFunction } from 'express';

const JWT = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

// user リクエスト の型を定義
interface UserRequest {
  _id: string; // 例: '650d069d67ef2b6c5578a46b'
  username: string; // 例: 'notionUser2'
  password: string; // 例: 'U2FsdGVkX18QnLnBMVbtD98b6ktTpCJ+a+RmqNhX12k='
  __v: number; // 例: 0
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

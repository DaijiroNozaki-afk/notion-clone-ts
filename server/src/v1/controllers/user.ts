import { Request, Response } from 'express';
const JWT = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const User = require('../models/user');
import { RegisterRequest, IUser } from '../types/types';

exports.register = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response
) => {
  //パスワードの受け取り
  const password = req.body.password;
  try {
    //パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();
    //ユーザーの新規作成
    const user: IUser = await User.create(req.body);
    //JWTの発行
    const token: string | undefined = JWT.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: '24h',
      }
    );
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};
//ユーザーログイン用API
exports.login = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response
) => {
  const { username, password } = req.body;
  try {
    //DB からユーザーが存在するか探してくる
    const user: IUser = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        errors: {
          param: 'username',
          message: 'ユーザーが無効です。',
        },
      });
    }
    // パスワードが合っているか照合する
    const descryptedPassword: string = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (descryptedPassword !== password) {
      return res.status(401).json({
        errors: {
          param: 'password',
          message: 'パスワードが無効です。',
        },
      });
    }
    //JWTの発行
    const token: string | undefined = JWT.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: '24h',
      }
    );
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

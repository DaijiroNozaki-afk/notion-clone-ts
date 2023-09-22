// const express = require('express');
import express, { Request, Response } from 'express';
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('./src/v1/models/user');
const app = express();
const PORT = 5000;
require('dotenv').config();

app.use(express.json());

// リクエストボディの型を定義
interface RegisterRequest {
  password: string;
  // 他の必要なフィールドをここに追加
}

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log('DB と接続中・・・');
} catch (err) {
  console.log(err);
}

//ユーザー新規登録API
app.post(
  '/register',
  body('username')
    .isLength({ min: 8 })
    .withMessage('ユーザー名は8文字以上ある必要があります。'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上ある必要があります。'),
  body('confirmPassword')
    .isLength({ min: 8 })
    .withMessage('確認用パスワードは8文字以上ある必要があります。'),
  body('username').custom((value: String) => {
    return User.findOne({ username: value }).then((user: String) => {
      return Promise.reject('このユーザーはすでに使われています。');
    });
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
    //パスワードの受け取り
    const password = req.body.password;
    try {
      //パスワードの暗号化
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString();
      //ユーザーの新規作成
      const user = await User.create(req.body);
      //JWTの発行
      const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: '24h',
      });
      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

//ユーザーログイン用API

app.listen(PORT, () => {
  console.log('サーバー起動中・・・');
});

import { Request, Response } from 'express';
import { RegisterRequest, UserRequest } from '../types/types';
const router = require('express').Router();
const { body } = require('express-validator');
require('dotenv').config();

const User = require('../models/user');
const validation = require('../handlers/validation');
const userController = require('../controllers/user');
const tokenHandler = require('../handlers/tokenHandler');

//ユーザー新規登録API
router.post(
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
    return User.findOne({ username: value }).then((user: String | null) => {
      if (user) {
        return Promise.reject('このユーザーはすでに使われています。');
      }
    });
  }),
  validation.validate,
  userController.register
);
//ログイン用API
router.post(
  '/login',
  body('username')
    .isLength({ min: 8 })
    .withMessage('ユーザー名は8文字以上ある必要があります。'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上ある必要があります。'),
  validation.validate,
  userController.login
);

// JWT 認証API
router.post(
  '/verify-token',
  tokenHandler.verifyToken,
  (req: Request<{}, {}, RegisterRequest>, res: Response) => {
    const user = (req as unknown as { user: UserRequest }).user;

    return res.status(200).json({ user });
  }
);
module.exports = router;

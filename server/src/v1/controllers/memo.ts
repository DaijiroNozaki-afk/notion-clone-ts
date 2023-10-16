const Memo = require('../models/memo');
import { Request, Response } from 'express';
import { MemoRequest } from '../types/memoTypes';

exports.create = async (req: Request<{}, {}, MemoRequest>, res: Response) => {
  try {
    const memoCount = await Memo.find().count();
    // メモ新規作成
    // console.log(req.user);
    //req.user でミドルウェアの値は取得できている
    if (req.user !== undefined) {
      const memo = await Memo.create({
        user: req.user._id,
        position: memoCount > 0 ? memoCount : 0,
      });
      res.status(201).json(memo);
    }
    res.status(204); //json で状況を知らせるメッセージを返す必要がある
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getAll = async (req: Request<{}, {}, MemoRequest>, res: Response) => {
  try {
    if (req.user !== undefined) {
      const memos = await Memo.find({ user: req.user._id }).sort('-position');
      res.status(200).json(memos);
    } else {
      res.status(404).json('メモが見つかりません。');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

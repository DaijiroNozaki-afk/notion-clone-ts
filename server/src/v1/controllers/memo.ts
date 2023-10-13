const Memo = require('../models/memo');
import { Request, Response } from 'express';
import { MemoRequest } from '../types/memoTypes';

exports.create = async (req: Request<{}, {}, MemoRequest>, res: Response) => {
  try {
    const memoCount = await Memo.find().count();
    // メモ新規作成
    const memo = await Memo.create({
      user: req.body.user,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

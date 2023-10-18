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
      res.status(404).json('メモが存在しません。');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getOne = async (
  req: Request<{ memoId: string }, {}, MemoRequest>,
  res: Response
) => {
  const { memoId } = req.params;
  try {
    if (req.user !== undefined) {
      const memo: MemoRequest = await Memo.findOne({
        user: req.user._id,
        _id: memoId,
      });
      if (!memo) return res.status(404).json('メモが存在しません。');
      res.status(200).json(memo);
    } else {
      res.status(404).json('メモが存在しません。');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.update = async (
  req: Request<{ memoId: string }, {}, MemoRequest>,
  res: Response
) => {
  const { memoId } = req.params;
  const { title, description } = req.body;
  try {
    if (title === '') req.body.title = '無題';
    if (description === '')
      req.body.description = 'ここに自由に記入してください。';
    if (req.user !== undefined) {
      const memo: MemoRequest = await Memo.findOne({
        user: req.user._id,
        _id: memoId,
      });
      if (!memo) return res.status(404).json('メモが存在しません。');

      const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
        $set: req.body,
      });
      res.status(200).json(updatedMemo);
    } else {
      res.status(404).json('メモが存在しません。');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

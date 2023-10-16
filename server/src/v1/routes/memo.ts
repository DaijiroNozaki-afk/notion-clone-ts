import express from 'express';
const router = express.Router();
// TypeScriptは通常ESモジュールシステムを使用します。
// このため、この行によってrouterが再定義され、エラーが発生しています。
// const router = require('express').Router();
const memoController = require('../controllers/memo');
const tokenHandler = require('../handlers/tokenHandler');

//メモを作成
router.post('/', tokenHandler.verifyToken, memoController.create);
//ログインしているユーザーが投稿したメモを全て取得
router.get('/', tokenHandler.verifyToken, memoController.getAll);
module.exports = router;

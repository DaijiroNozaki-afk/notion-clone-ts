// const express = require('express');
import express, { Request, Response } from 'express';
const app = express();
const PORT = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Express!');
});

//ユーザー新規登録API

//ユーザーログイン用API

app.listen(PORT, () => {
  console.log('サーバー起動中・・・');
});

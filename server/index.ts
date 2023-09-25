// const express = require('express');
import express from 'express';
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
require('dotenv').config();

app.use(express.json());
app.use('/api/v1', require('./src/v1/routes/auth'));

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log('DB と接続中・・・');
} catch (err) {
  console.log(err);
}

app.listen(PORT, () => {
  console.log('サーバー起動中・・・');
});

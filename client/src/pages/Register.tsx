import React from 'react';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import authApi from '../api/authApi';

const Register = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //入力欄の文字列を取得
    const data = new FormData(e.target as HTMLFormElement);
    const username = (data.get('username') || '').toString().trim();
    const password = (data.get('password') || '').toString().trim();
    const confirmPassword = (data.get('confirmPassword') || '')
      .toString()
      .trim();

    // 新規登録API を叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      const token = res.data.token;
      localStorage.setItem('token', token);
      console.log('新規登録に成功しました。');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={false}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>

      <Button component={Link} to="/login">
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;

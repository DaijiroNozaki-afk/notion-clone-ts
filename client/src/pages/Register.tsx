import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import axios, { AxiosError, AxiosResponse } from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [usernameErrText, setUsernameErrText] = useState<string>('');
  const [passwordErrText, setPasswordErrText] = useState<string>('');
  const [confirmErrText, setConfirmErrText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // エラーの型を定義
  interface validationErrInt {
    location: string;
    msg: string;
    path: string;
    type: string;
    value: string;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');
    setConfirmErrText('');
    //入力欄の文字列を取得
    const data = new FormData(e.target as HTMLFormElement);
    const username = (data.get('username') || '').toString().trim();
    const password = (data.get('password') || '').toString().trim();
    const confirmPassword = (data.get('confirmPassword') || '')
      .toString()
      .trim();

    let error: boolean = false;

    if (username === '') {
      error = true;
      setUsernameErrText('名前を入力してください。');
    }
    if (password === '') {
      error = true;
      setPasswordErrText('パスワードを入力してください。');
    }
    if (confirmPassword === '') {
      error = true;
      setConfirmErrText('確認用パスワードを入力してください。');
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmErrText('パスワードと確認用パスワードが異なります。');
    }

    if (error) return;

    setLoading(true);
    // 新規登録API を叩く
    try {
      const res: AxiosResponse = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      const token: string = res.data.token;
      localStorage.setItem('token', token);
      console.log('新規登録に成功しました。');
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && (err as AxiosError)) {
        const errors = err.response.data.errors;
        errors.forEach((err: validationErrInt) => {
          if (err.path === 'username') {
            setUsernameErrText(err.msg);
          }
          if (err.path === 'password') {
            setPasswordErrText(err.msg);
          }
          if (err.path === 'confirmPassword') {
            setConfirmErrText(err.msg);
          }
        });
      }
      setLoading(false);
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ''}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ''}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={confirmErrText}
          error={confirmErrText !== ''}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
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

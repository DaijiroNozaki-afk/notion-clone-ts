import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import axios, { AxiosError, AxiosResponse } from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [usernameErrText, setUsernameErrText] = useState<string>('');
  const [passwordErrText, setPasswordErrText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // エラーの型を定義
  interface loginErrInt {
    msg: string;
    param: string;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');
    //入力欄の文字列を取得
    const data = new FormData(e.target as HTMLFormElement);
    const username = (data.get('username') || '').toString().trim();
    const password = (data.get('password') || '').toString().trim();

    let error: boolean = false;

    if (username === '') {
      error = true;
      setUsernameErrText('名前を入力してください。');
    }
    if (password === '') {
      error = true;
      setPasswordErrText('パスワードを入力してください。');
    }

    if (error) return;

    setLoading(true);
    // ログインAPI を叩く
    try {
      const res: AxiosResponse = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      const token: string = res.data.token;
      localStorage.setItem('token', token);
      console.log('ログインに成功しました。');
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && (err as AxiosError)) {
        const errors = err.response.data.errors;
        // console.log(errors);
        errors.forEach((err: loginErrInt) => {
          if (err.param === 'username') {
            setUsernameErrText(err.msg);
          }
          if (err.param === 'password') {
            setPasswordErrText(err.msg);
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
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>

      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Login;

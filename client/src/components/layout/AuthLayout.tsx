import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import notionLogo from '../../assets/images/notion-logo.png';
import authUtils from '../../utils/authUtils';
import { UserRequest } from '../../types/types';

const AuthLayout = () => {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    // JWT を持っているのか確認する
    const checkAuth = async () => {
      // 認証チェック
      const isAuth: boolean | UserRequest = await authUtils.isAuthenticated(); //boolean かuser が返ってくる
      if (isAuth) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <img
            src={notionLogo}
            alt=""
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          Notion クローン開発
        </Box>
        <Outlet />
      </Container>
    </div>
  );
};

export default AuthLayout;

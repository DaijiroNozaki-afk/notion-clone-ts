import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import notionLogo from '../../assets/images/notion-logo.png';
import authUtils from '../../utils/authUtils';
import { UserRequest } from '../../types/types';
import Sidebar from './common/Sidebar';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';
import { useAddDispatch } from '../../redux/store';

const AppLayout = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAddDispatch();
  useEffect(() => {
    // JWT を持っているのか確認する
    const checkAuth = async () => {
      // 認証チェック
      const user: boolean | UserRequest = await authUtils.isAuthenticated(); //boolean かuser が返ってくる
      if (!user) {
        navigate('/login');
      } else {
        //ユーザーを保存する
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: 'max-content' }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default AppLayout;

import { LogoutOutlined } from '@mui/icons-material';
import { AddBoxOutlined } from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import assets from '../../../assets/index';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useAddDispatch, useAppSelector } from '../../../redux/store';
import { Link } from 'react-router-dom';
import memoApi from '../../../api/memoApi';
import { setMemo } from '../../../redux/features/memoSlice';
import { MemoType } from '../../../types/types';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dispatch = useAddDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { memoId } = useParams<string>();
  const user = useAppSelector((state) => state.user.value);
  const memos = useAppSelector((state) => state.memo.value);
  // const memos: MemoType[] = useAppSelector((state) => state.memo.value);
  const logout = (): void => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemo(res.data));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);
  //選択されたメモをハイライト表示する
  useEffect(() => {
    const activeIndex: number = memos.findIndex(
      (e: MemoType) => e._id === memoId
    );
    setActiveIndex(activeIndex);
  }, [navigate]);

  const addMemo = async () => {
    try {
      const res = await memoApi.create();
      const newMemos = [res.data, ...memos];
      console.log(newMemos);
      dispatch(setMemo(newMemos));
      navigate(`memo/${res.data._id}`);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: '100vh' }}
    >
      <List
        sx={{
          width: 250,
          height: '100vh',
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlined></LogoutOutlined>
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: '10px' }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: '10px' }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton
              onClick={() => {
                addMemo();
              }}
            >
              <AddBoxOutlined />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((item: MemoType, index: number) => (
          <ListItemButton
            sx={{ pl: '20px' }}
            component={Link}
            to={`/memo/${item._id}`}
            key={item._id}
            selected={index === activeIndex}
          >
            <Typography>
              {item.icon} {item.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

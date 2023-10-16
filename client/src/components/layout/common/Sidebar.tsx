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
import React, { useEffect } from 'react';
import assets from '../../../assets/index';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAddDispatch, useAppSelector } from '../../../redux/store';
import { Link } from 'react-router-dom';
import memoApi from '../../../api/memoApi';
import { setMemo } from '../../../redux/features/memoSlice';

const Sidebar = () => {
  const dispatch = useAddDispatch();
  const navigate: NavigateFunction = useNavigate();
  const user = useAppSelector((state) => state.user.value);
  const memos = useAppSelector((state) => state.memo.value);
  const logout = (): void => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        // console.log(res);
        dispatch(setMemo(res.data));
        console.log(memos);
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, []);
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
            <IconButton>
              <AddBoxOutlined />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton
          sx={{ pl: '20px' }}
          component={Link}
          to="/memo/daskfj;asdlkfjasd;lkf"
        >
          <Typography>📝無題</Typography>
        </ListItemButton>
        <ListItemButton
          sx={{ pl: '20px' }}
          component={Link}
          to="/memo/daskfj;asdlkfjasd;lkf"
        >
          <Typography>📝無題</Typography>
        </ListItemButton>
        <ListItemButton
          sx={{ pl: '20px' }}
          component={Link}
          to="/memo/daskfj;asdlkfjasd;lkf"
        >
          <Typography>📝無題</Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;

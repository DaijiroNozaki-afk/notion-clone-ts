import { DeleteOutlineOutlined, StarBorderOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import memoApi from '../api/memoApi';
import { useAddDispatch, useAppSelector } from '../redux/store';
import { MemoType } from '../types/types';
import { setMemo } from '../redux/features/memoSlice';
import EmojiPicker from '../components/layout/common/EmojiPicker';

const Memo = () => {
  const { memoId } = useParams<string>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [icon, setIcon] = useState<string>('📝');
  const dispatch = useAddDispatch();
  const navigate = useNavigate();
  const memos = useAppSelector((state) => state.memo.value);
  useEffect(() => {
    const getMemo = async () => {
      try {
        if (memoId !== undefined) {
          const res = await memoApi.getOne(memoId);
          // console.log(res);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIcon(res.data.icon);
        }
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer: NodeJS.Timeout;
  const timeout: number = 500;

  const updateTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const newTitle: string = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        if (memoId !== undefined) {
          await memoApi.update(memoId, { title: newTitle });
        } else {
          alert('メモが選択されていません。');
        }
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };
  const updateDescription = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const newDescription: string = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        if (memoId !== undefined) {
          await memoApi.update(memoId, { description: newDescription });
        } else {
          alert('メモが選択されていません。');
        }
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      if (memoId !== undefined) {
        const deletedMemo = await memoApi.delete(memoId);
        console.log(deletedMemo);

        const newMemos = memos.filter((e: MemoType) => e._id !== memoId);
        if (newMemos.length === 0) {
          navigate('/memo');
        } else {
          navigate(`/memo/${newMemos[0]._id}`);
        }
        dispatch(setMemo(newMemos));
      } else {
        alert('メモが選択されていません。');
      }
    } catch (err) {
      alert(err);
    }
  };

  const onIconChange = async (newIcon: string) => {
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setMemo(temp));
    try {
      if (memoId !== undefined) {
        await memoApi.update(memoId, { icon: newIcon });
      } else {
        alert('メモが選択されていません。');
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton color="error" onClick={deleteMemo}>
          <DeleteOutlineOutlined />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            onChange={updateTitle}
            value={title}
            placeholder="無題"
            variant="outlined"
            fullWidth
            sx={{
              '.MuiOutlinedInput-input': { padding: 0 },
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              '.MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' },
            }}
          />
          <TextField
            onChange={updateDescription}
            value={description}
            placeholder="追加"
            variant="outlined"
            fullWidth
            sx={{
              '.MuiOutlinedInput-input': { padding: 0 },
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              '.MuiOutlinedInput-root': { fontSize: '1rem' },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Memo;

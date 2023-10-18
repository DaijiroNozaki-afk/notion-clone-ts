import { DeleteOutlineOutlined, StarBorderOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import memoApi from '../api/memoApi';

const Memo = () => {
  const { memoId } = useParams<string>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  useEffect(() => {
    const getMemo = async () => {
      try {
        if (memoId !== undefined) {
          const res = await memoApi.getOne(memoId);
          // console.log(res);
          setTitle(res.data.title);
          setDescription(res.data.description);
        }
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);
  const updateTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle: string = e.target.value;
    setTitle(newTitle);
    try {
      if (memoId !== undefined) {
        await memoApi.update(memoId, { title: newTitle });
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
        <IconButton color="error">
          <DeleteOutlineOutlined />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
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
    </>
  );
};

export default Memo;

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
    </>
  );
};

export default Memo;

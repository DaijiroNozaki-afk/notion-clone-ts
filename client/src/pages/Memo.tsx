import { DeleteOutlineOutlined, StarBorderOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, TextField } from '@mui/material';
import React from 'react';

const Memo = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
        <TextField placeholder="無題" variant="outlined" fullWidth />
        <TextField placeholder="追加" variant="outlined" fullWidth />
      </Box>
    </>
  );
};

export default Memo;

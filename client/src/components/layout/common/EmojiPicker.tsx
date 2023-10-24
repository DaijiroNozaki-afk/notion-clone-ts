import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface emojiInt {
  icon: string;
}

const EmojiPicker = (props: emojiInt) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>();
  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);
  return (
    <Box>
      <Typography variant="h3" fontWeight="700" sx={{ cursor: 'pointer' }}>
        {selectedEmoji}
      </Typography>
    </Box>
  );
};

export default EmojiPicker;

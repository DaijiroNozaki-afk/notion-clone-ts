import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Picker from '@emoji-mart/react';

interface emojiInt {
  icon: string;
  onChange: (newIcon: string) => void;
}
interface Emoji2Int {
  id: string;
  name: string;
  emoticons: string[];
  unicode: string;
  keywords: string[];
  native: string;
  shortcodes: string;
  unified: string;
}

const EmojiPicker = (props: emojiInt) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>();
  const [isShowPicker, setIsShowPicker] = useState<boolean>(false);
  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const showPicker = () => setIsShowPicker(!isShowPicker);

  const selectEmoji = (e: Emoji2Int) => {
    const emojiCode: string[] = e.unified.split('-');
    let codesArray: number[] = [];
    emojiCode.forEach((el) => codesArray.push(Number('0x' + el)));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onChange(emoji);
  };
  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: 'pointer' }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? 'block' : 'none',
          position: 'absolute',
          zIndex: '100',
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;

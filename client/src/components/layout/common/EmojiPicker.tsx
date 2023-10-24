import React from 'react';

interface emojiInt {
  icon: string;
}

const EmojiPicker = (props: emojiInt) => {
  return <div>{props.icon}</div>;
};

export default EmojiPicker;

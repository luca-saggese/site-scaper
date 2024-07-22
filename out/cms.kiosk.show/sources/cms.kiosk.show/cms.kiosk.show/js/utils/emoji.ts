import EmojiJson from '@Utils/emoji.json';

const emojiUrlBase = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.0/img/apple/64';

export const EmojiList = EmojiJson;

export const getEmojiUrl = (code: string) => {
  const emoji = EmojiJson.find((item) => item.code === code);
  if (!emoji) {
    return '';
  }
  return `${emojiUrlBase}/${emoji.image}`;
};

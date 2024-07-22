export const randomValue = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export const randomHex = () => {
  const possibleValues = '0123456789abcdef'.split('');
  const hex = Array(6)
    .fill('0')
    .map(() => randomValue(possibleValues))
    .join('');
  return `#${hex}`;
};

export const randomAlphaNumeric = (length: number) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

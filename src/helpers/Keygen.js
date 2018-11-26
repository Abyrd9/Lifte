const Keygen = arr => {
  let keyList = arr.length > 0 ? arr.filter(item => item.key) : [];

  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const generator = () => {
    for (let i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  let key = generator();
  while (keyList.includes(key)) {
    key = generator();
  }

  return key;
};

export default Keygen;

export const getTextNote = (note: string, tags: string[]) => {
  let str = note;
  for (let i = 0; i < tags.length; i++) {
    str = str.replaceAll(tags[i], '');
  }
  return str;
};

import { NoteType } from '../models/NoteProps';

export const getAllTags = (notes: NoteType[]) => {
  const value = notes;
  let tags: string[] = [];
  value.map((el: NoteType) => {
    return (tags = [...tags, ...el.tags]);
  });
  return [...new Set(tags)];
};

export const setUniqueTags = (tags: string[], state: string[]) => {
  let allTags = [...state, ...tags];
  allTags = [...new Set(allTags)];
  return allTags;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const moveCaretToEnd = (target: any) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(target);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

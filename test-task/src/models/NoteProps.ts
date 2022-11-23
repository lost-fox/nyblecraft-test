import React from 'react';

export interface NoteProps {
  value: NoteType;
  onShow: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export interface NoteType {
  id: number;
  text: string;
  tags: string[];
}

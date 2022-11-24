import { NoteType } from './NoteProps';

export interface ModalWindowProps {
  editNote: NoteType;
  buttonClick: string;
  close?: (e: React.MouseEvent) => void;
  save?: () => void;
  edit?: (e: React.KeyboardEvent) => void;
  editTags?: (e: React.MouseEvent) => void;
}

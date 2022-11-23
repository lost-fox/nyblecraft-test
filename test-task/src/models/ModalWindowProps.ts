import { NoteType } from './NoteProps';

export interface ModalWindowProps {
  data?: NoteType;
  close?: (e: React.MouseEvent) => void;
}

export interface NoteProps {
  value: NoteType;
}

export interface NoteType {
  id: number;
  text: string;
  tags: string[];
}

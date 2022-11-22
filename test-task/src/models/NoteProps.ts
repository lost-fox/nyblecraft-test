export interface NoteProps {
  value: Note;
}

interface Note {
  id: number;
  text: string;
  tags: string[];
}

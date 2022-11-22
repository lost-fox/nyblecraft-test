import { NoteType } from './NoteProps';

export interface AppState {
  notes: NoteType[];
  allTags: string[];
}

import { useState } from 'react';
import './App.scss';
import { Note as NoteComponents } from './components/Note';
import { AppState } from './models/AppState';
import { NoteType } from './models/NoteProps';
import { getTextNote } from './utils/getTextNote';
import { setUniqueTags } from './utils/setUniqueTags';

function App() {
  const [state, setState] = useState<AppState>({
    notes: [],
    allTags: [],
  });
  const [addNote, setAddNote] = useState<string>('');
  const [countNode, setCountNode] = useState<number>(1);

  const changeAddNote = () => {
    const noteText: string = addNote;
    const tags: string[] = noteText.match(/#\S*/gi) || [];
    const text: string = getTextNote(noteText, tags);
    setCountNode(countNode + 1);
    const data: NoteType = {
      id: countNode,
      text: text,
      tags: [...new Set(tags)],
    };
    const getAllTags = setUniqueTags(tags, state.allTags);
    setState({ ...state, notes: [...state.notes, data], allTags: getAllTags });
    setAddNote('');
  };

  console.log(state);
  return (
    <div className="app-wrapper">
      <h1 className="app-title">Текстовый редактор</h1>
      <div className="app-add-task">
        <textarea
          className="app-add-task__text"
          name="task"
          id="task"
          cols={50}
          rows={5}
          onChange={(e) => {
            setAddNote(e.target.value);
          }}
          value={addNote}
        ></textarea>
        <button className="app-add-task__button" onClick={changeAddNote}>
          Добавить
        </button>
      </div>
      <div className="app-notes flex">
        {state.notes.map((note) => {
          return <NoteComponents key={note.id} value={note} />;
        })}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.scss';
import { ModalPortal } from './components/ModalPortal';
import { ModalWindow } from './components/ModalWindow';
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idNote, setIdNote] = useState<string>('');

  const changeAddNote = () => {
    const noteText: string = addNote;
    if (!noteText.length) return;
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

  const showInfoNote = (e: React.MouseEvent) => {
    const id = (e.currentTarget as HTMLButtonElement).id;
    setIdNote(id);
    setIsOpen(true);
  };

  const deleteNote = (e: React.MouseEvent) => {
    const id = +(e.currentTarget as HTMLButtonElement).id;
    const stateNotes = state.notes;
    const stateAllTags = state.allTags;
    const newStateNotes = stateNotes.filter((note) => {
      return note.id !== id;
    });
    const deleteTags = new Set(
      stateNotes.filter((note) => {
        return note.id === id;
      })[0].tags
    );
    const newStateAllTags = stateAllTags.filter((tag) => !deleteTags.has(tag));
    setState({ ...state, notes: newStateNotes, allTags: newStateAllTags });
  };

  const closeModal = (e: React.MouseEvent) => {
    const tag = e.target as HTMLDivElement;
    if (tag.id === 'modal-close') {
      setIsOpen(false);
    }
  };

  return (
    <>
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
        <div className="app-filters">
          <h2 className="app-filters__title">Фильтры: </h2>
          <div className="app-filters__tag flex">
            {state.allTags.map((tag) => {
              return (
                <span className="app-filters__tag-item" key={tag}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
        <div className="app-notes flex">
          {state.notes.map((note) => {
            return (
              <NoteComponents
                key={note.id}
                value={note}
                onShow={showInfoNote}
                onDelete={deleteNote}
              />
            );
          })}
        </div>
      </div>
      {isOpen && (
        <ModalPortal>
          <ModalWindow close={closeModal} data={state.notes[+idNote - 1]} />
        </ModalPortal>
      )}
    </>
  );
}

export default App;

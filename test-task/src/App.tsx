import React, { useEffect, useState } from 'react';
import './App.scss';
import { ModalPortal } from './components/ModalPortal';
import { ModalWindow } from './components/ModalWindow';
import { Note as NoteComponents } from './components/Note';
import { AppState } from './models/AppState';
import { NoteType } from './models/NoteProps';
import { getAllTags } from './utils/getAllTags';
import { getTextNote } from './utils/getTextNote';
import { moveCaretToEnd } from './utils/moveCaretToEnd';
import { setUniqueTags } from './utils/setUniqueTags';

function App() {
  const [state, setState] = useState<AppState>({
    notes: [],
    allTags: [],
  });
  const editInitial: NoteType = {
    id: 0,
    text: '',
    tags: [],
  };
  const [addNote, setAddNote] = useState<string>('');
  const [countNode, setCountNode] = useState<number>(1);
  const [editNote, setEditNote] = useState<NoteType>(editInitial);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idNote, setIdNote] = useState<string>('');
  const [isButtonClick, setIsButtonClick] = useState<string>('');
  const [filtersNote, setFiltersNote] = useState<NoteType[]>(state.notes);
  const [filterItem, setFilterItem] = useState<string[]>([]);

  useEffect(() => {
    setEditNote(state.notes[+idNote - 1]);
  }, [idNote]);

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
    setFiltersNote([...state.notes, data]);
  };

  const showInfoNote = (e: React.MouseEvent) => {
    const id = (e.currentTarget as HTMLButtonElement).id;
    setIsButtonClick((e.currentTarget as HTMLButtonElement).name);
    setIdNote(id);
    setIsOpen(true);
  };

  const deleteNote = (e: React.MouseEvent) => {
    const id = +(e.currentTarget as HTMLButtonElement).id;
    const stateNotes = state.notes;
    const newStateNotes = stateNotes.filter((note) => {
      return note.id !== id;
    });
    const newStateAllTags = getAllTags(newStateNotes);
    setState({ ...state, notes: newStateNotes, allTags: newStateAllTags });
    setFiltersNote(newStateNotes);
  };

  const getEditNote = (e: React.KeyboardEvent) => {
    moveCaretToEnd((e.target as HTMLDivElement).children[0]);
    const text = (e.target as HTMLDivElement).children[0].textContent || '';
    const tags: string[] =
      (e.target as HTMLDivElement).children[2].textContent?.split('#').join(' #').split(' ') || [];
    tags.shift();
    let textTags: string[] = [];
    let newText = text;
    if (text.slice(-1).charCodeAt(0) === 160) {
      textTags = text.match(/#\S*/gi) || [];
      newText = getTextNote(text, textTags);
    }
    const newTags = setUniqueTags(textTags, tags);
    const data: NoteType = {
      id: +idNote,
      text: newText,
      tags: newTags,
    };
    setEditNote(data);
  };

  const getEditTags = (e: React.MouseEvent) => {
    const deleteTag = (e.target as HTMLButtonElement).id;
    const tags = editNote.tags.filter((el) => {
      return el !== deleteTag;
    });
    setEditNote({ ...editNote, tags: tags });
  };

  const saveNote = () => {
    const data = editNote;
    const stateNotes: NoteType[] = state.notes.map((el) => (el.id === +idNote ? data : el));
    const getAllTags = setUniqueTags(data.tags, state.allTags);
    setState({ ...state, notes: stateNotes, allTags: getAllTags });
    setFiltersNote(stateNotes);
    setIdNote('');
    setIsOpen(false);
    setEditNote(editInitial);
  };

  const closeModal = (e: React.MouseEvent) => {
    const tag = e.target as HTMLDivElement;
    if (tag.id === 'modal-close') {
      setIsOpen(false);
      setIdNote('');
      setEditNote(editInitial);
    }
  };

  const getFiltersTag = (e: React.MouseEvent) => {
    const value: string = (e.target as HTMLSpanElement).textContent || '';
    const notes = state.notes;
    let filter = filterItem;
    const filterNotes: NoteType[] = [];
    const isFilter = filter.some((elem) => elem === value);
    if (isFilter) {
      filter.splice(filter.indexOf(value), 1);
    } else {
      filter = [...filter, value];
    }
    for (let i = 0; i <= filter.length; i++) {
      for (let j = 0; j <= notes.length; j++) {
        if (notes[j]?.tags.some((el) => el === filter[i])) {
          filterNotes.push(notes[j]);
        }
      }
    }

    for (let i = 0; i <= filterNotes.length; i++) {
      for (let j = i + 1; j < filterNotes.length; j++) {
        if (filterNotes[i].id === filterNotes[j].id) {
          filterNotes.splice(j, 1);
        }
      }
    }

    setFilterItem(filter);
    if (!filter.length) {
      setFiltersNote(state.notes);
      return;
    }
    setFiltersNote(filterNotes);
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
              const className = filterItem.some((el) => el === tag)
                ? 'app-filters__tag-item app-filters__tag-item--active'
                : 'app-filters__tag-item';
              return (
                <span className={className} key={tag} onClick={getFiltersTag}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
        <div className="app-notes flex">
          {filtersNote.map((note) => {
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
          <ModalWindow
            close={closeModal}
            data={state.notes[+idNote - 1]}
            buttonClick={isButtonClick}
            edit={getEditNote}
            save={saveNote}
            editNote={editNote}
            editTags={getEditTags}
          />
        </ModalPortal>
      )}
    </>
  );
}

export default App;

import React from 'react';
import { NoteProps } from '../../models/NoteProps';
import { Tag } from '../Tag';
import showImg from '../../assets/icons/show.png';
import editImg from '../../assets/icons/edit.png';
import deleteImg from '../../assets/icons/delete.png';
import './style.scss';

export const Note: React.FC<NoteProps> = (props) => {
  const { value, onShow } = props;
  const { id, text, tags } = value;
  return (
    <div className="note-wrapper flex">
      <div className="note">
        <p className="note__text">{text}</p>
        <hr />
        <div className="note__tags flex">
          {tags.map((el) => {
            return <Tag key={el} value={el} />;
          })}
        </div>
      </div>
      <div className="note-buttons">
        <button
          id={id.toString()}
          className="note-buttons__button note-buttons__button--show"
          onClick={onShow}
        >
          <img src={showImg} alt="show icon" />
        </button>
        <button className="note-buttons__button note-buttons__button--edit">
          <img src={editImg} alt="edit icon" />
        </button>
        <button className="note-buttons__button note-buttons__button--delete">
          <img src={deleteImg} alt="delete icon" />
        </button>
      </div>
    </div>
  );
};

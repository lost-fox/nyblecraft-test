import { ModalWindowProps } from '../../models/ModalWindowProps';
import { Tag } from '../Tag';
import './style.scss';

export const ModalWindow = (props: ModalWindowProps) => {
  if (!props.data) return <></>;
  const { data, editNote, buttonClick, close, save, edit, editTags } = props;
  const { tags, text } = data;

  return (
    <div className="modal" id="modal-close" onClick={close}>
      <div className="modal-container">
        <div className="close" id="modal-close" onClick={close}>
          ✘
        </div>
        {buttonClick === 'show' ? (
          <>
            <p className="modal-text">{text}</p>
            <hr className="modal-hr" />
            <div className="modal-tags flex">
              {tags.map((tag: string) => {
                return <Tag key={tag} value={tag} />;
              })}
            </div>
          </>
        ) : (
          <>
            <h2 className="modal-title">Редактирование</h2>
            <hr className="modal-hr" />
            <div className="modal-textarea" contentEditable onKeyUp={edit}>
              <div className="modal-textarea__text">{editNote?.text}</div>
              <hr className="modal-hr" />
              <span className="modal-tags flex">
                {editNote?.tags.map((tag: string) => {
                  return (
                    <>
                      <Tag key={tag} value={tag} />
                      <button id={tag} className="modal-tags__button" onClick={editTags}></button>
                    </>
                  );
                })}
              </span>
            </div>
            <button className="modal-button" onClick={save}>
              Сохранить
            </button>
          </>
        )}
      </div>
    </div>
  );
};

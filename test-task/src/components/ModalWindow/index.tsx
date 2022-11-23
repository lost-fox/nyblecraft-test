import { ModalWindowProps } from '../../models/ModalWindowProps';
import { Tag } from '../Tag';
import './style.scss';

export const ModalWindow = (props: ModalWindowProps) => {
  const { data, close } = props;
  return (
    <div className="modal" id="modal-close" onClick={close}>
      <div className="modal-container">
        <div className="close" id="modal-close" onClick={close}>
          ✘
        </div>
        <p className="modal-text">{data?.text}</p>
        <hr className="modal-hr" />
        <div className="modal-tags flex">
          {data?.tags.map((tag: string) => {
            return <Tag key={tag} value={tag} />;
          })}
        </div>
      </div>
    </div>
  );
};

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalPortalProps } from '../../models/ModalPortalProps';

export const ModalPortal = (props: ModalPortalProps) => {
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    const cur = el.current;
    document.body.appendChild(cur);
    return () => {
      document.body.removeChild(cur);
    };
  }, []);

  return createPortal(props.children, el.current);
};

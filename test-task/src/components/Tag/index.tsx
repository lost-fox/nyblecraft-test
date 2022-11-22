import React from 'react';
import { TagProps } from '../../models/TagProps';
import './style.scss';

export const Tag: React.FC<TagProps> = (props) => {
  return <div className="tag-wrapper">{props.value}</div>;
};

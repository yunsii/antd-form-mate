import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

export interface TextAreaEntryProps extends NewFormMateItemPropsWithoutChildren<string, TextAreaProps> {}

const plainRender: PlainRenderFn<string, TextAreaProps> = ({ value, entryProps }) => {
  return value;
};

const TextAreaEntry: React.FC<TextAreaEntryProps> = (props) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <Input.TextArea {...props.entryProps} />
    </FormMateItem>
  );
};

TextAreaEntry.displayName = getEntryDisplayName(TextAreaEntry);

export default TextAreaEntry;

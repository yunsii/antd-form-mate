import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface TextAreaEntryProps extends NewFormMateItemPropsWithoutChildren<TextAreaProps> {}

const TextAreaEntry: React.FC<TextAreaEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <Input.TextArea {...props.entryProps} />
    </FormMateItem>
  );
};

TextAreaEntry.displayName = `FM.${TextAreaEntry.name}`;

export default TextAreaEntry;

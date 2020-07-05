import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface TextAreaEntryProps extends NewFormMateItemPropsWithoutChildren<TextAreaProps> {}

const TextAreaEntry: React.FC<TextAreaEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <Input.TextArea {...props.entryProps} />
    </FormMateItem>
  );
};

TextAreaEntry.displayName = getEntryDisplayName(TextAreaEntry);

export default TextAreaEntry;

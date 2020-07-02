import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface InputEntryProps extends NewFormMateItemPropsWithoutChildren<InputProps> {}

const InputEntry: React.FC<InputEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <Input {...props.entryProps} />
    </FormMateItem>
  );
};

InputEntry.displayName = `FM.${InputEntry.name}`;

export default InputEntry;

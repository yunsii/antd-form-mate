import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface InputEntryProps extends NewFormMateItemPropsWithoutChildren<InputProps> {}

const InputEntry: React.FC<InputEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <Input {...props.entryProps} />
    </FormMateItem>
  );
};

InputEntry.displayName = getEntryDisplayName(InputEntry);

export default InputEntry;

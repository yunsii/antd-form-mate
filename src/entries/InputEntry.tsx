import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

type Value = string | undefined;

export interface InputEntryProps extends NewFormMateItemPropsWithoutChildren<Value, InputProps> {}

const plainRender: PlainRenderFn<Value, InputProps> = ({ value, entryProps }) => {
  return value;
};

const InputEntry: React.FC<InputEntryProps> = (props) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <Input {...props.entryProps} />
    </FormMateItem>
  );
};

InputEntry.displayName = getEntryDisplayName(InputEntry);

export default InputEntry;

import React from 'react';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

type Value = number | undefined;

export interface NumberEntryProps extends NewFormMateItemPropsWithoutChildren<Value, InputNumberProps> {}

const plainRender: PlainRenderFn<Value, InputNumberProps> = ({ value, entryProps }) => {
  return value;
};

const NumberEntry: React.FC<NumberEntryProps> = (props) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <InputNumber {...props.entryProps} />
    </FormMateItem>
  );
};

NumberEntry.displayName = getEntryDisplayName(NumberEntry);

export default NumberEntry;

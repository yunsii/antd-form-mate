import React from 'react';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';

import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface NumberEntryProps extends NewFormMateItemPropsWithoutChildren<InputNumberProps> {}

const NumberEntry: React.FC<NumberEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <InputNumber {...props.entryProps} />
    </FormMateItem>
  );
};

NumberEntry.displayName = `FM.${NumberEntry.name}`;

export default NumberEntry;

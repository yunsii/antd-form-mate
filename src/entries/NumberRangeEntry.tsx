import React from 'react';

import { getEntryDisplayName } from './utils';
import InputNumberRange, { InputNumberRangeProps, RangeValue } from '../components/InputNumberRange';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

export interface NumberRangeEntryProps extends NewFormMateItemPropsWithoutChildren<RangeValue, InputNumberRangeProps> {}

const plainRender: PlainRenderFn<RangeValue, InputNumberRangeProps> = ({ value, entryProps }) => {
  const { separator } = entryProps;
  if (value) {
    return value.join(separator || '~');
  }
};

const NumberRangeEntry: React.FC<NumberRangeEntryProps> = (props) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <InputNumberRange {...props.entryProps} />
    </FormMateItem>
  );
};

NumberRangeEntry.displayName = getEntryDisplayName(NumberRangeEntry);

export default NumberRangeEntry;

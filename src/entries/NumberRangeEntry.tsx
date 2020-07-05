import React from 'react';

import { getEntryDisplayName } from './utils';
import InputNumberRange, { InputNumberRangeProps } from '../components/InputNumberRange';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface NumberRangeEntryProps extends NewFormMateItemPropsWithoutChildren<InputNumberRangeProps> {}

const NumberRangeEntry: React.FC<NumberRangeEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <InputNumberRange {...props.entryProps} />
    </FormMateItem>
  );
};

NumberRangeEntry.displayName = getEntryDisplayName(NumberRangeEntry);

export default NumberRangeEntry;

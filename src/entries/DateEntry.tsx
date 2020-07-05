import React from 'react';

import { getEntryDisplayName } from './utils';
import CustomDatePicker, { CustomDatePickerProps } from '../components/CustomDatePicker';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface DateEntryProps extends NewFormMateItemPropsWithoutChildren<CustomDatePickerProps> {}

const DateEntry: React.FC<DateEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <CustomDatePicker {...props.entryProps} />
    </FormMateItem>
  );
};

DateEntry.displayName = getEntryDisplayName(DateEntry);

export default DateEntry;

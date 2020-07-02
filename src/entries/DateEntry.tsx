import React from 'react';

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

DateEntry.displayName = `FM.${DateEntry.name}`;

export default DateEntry;

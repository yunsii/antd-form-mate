import React from 'react';

import { CustomRangePicker, CustomRangePickerProps } from '../components/CustomDatePicker';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface DateRangeEntryProps extends NewFormMateItemPropsWithoutChildren<CustomRangePickerProps> {}

const DateRangeEntry: React.FC<DateRangeEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <CustomRangePicker {...props.entryProps} />
    </FormMateItem>
  );
};

DateRangeEntry.displayName = `FM.${DateRangeEntry.name}`;

export default DateRangeEntry;

import React from 'react';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface DateRangeEntryProps extends NewFormMateItemPropsWithoutChildren<RangePickerProps> {}

const DateRangeEntry: React.FC<DateRangeEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <DatePicker.RangePicker picker='date' {...props.entryProps} />
    </FormMateItem>
  );
};

DateRangeEntry.displayName = getEntryDisplayName(DateRangeEntry);

export default DateRangeEntry;

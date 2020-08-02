import React from 'react';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import { RangeValue } from 'rc-picker/lib/interface';
import { Moment } from 'moment';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

type Value = RangeValue<Moment>;

export interface DateRangeEntryProps extends NewFormMateItemPropsWithoutChildren<Value, RangePickerProps> {}

const plainRender: PlainRenderFn<Value, RangePickerProps> = ({ value, entryProps }) => {
  const { showTime, format } = entryProps as any;
  if (value) {
    return value
      .map((item) => item?.format((format as string) || (showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')))
      .join('~');
  }
};

const DateRangeEntry: React.FC<DateRangeEntryProps> = (props) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <DatePicker.RangePicker picker='date' {...props.entryProps} />
    </FormMateItem>
  );
};

DateRangeEntry.displayName = getEntryDisplayName(DateRangeEntry);

export default DateRangeEntry;

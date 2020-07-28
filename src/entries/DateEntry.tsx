import React from 'react';
import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker';
import { Moment } from 'moment';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

export interface DateEntryProps extends NewFormMateItemPropsWithoutChildren<Moment, DatePickerProps> {}

const plainRender: PlainRenderFn<Moment | undefined, DatePickerProps> = ({ value, entryProps }) => {
  const { showTime, format } = entryProps as any;
  return value?.format((format as string) || (showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'));
};

const DateEntry: React.FC<DateEntryProps> = (props) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <DatePicker picker='date' {...props.entryProps} />
    </FormMateItem>
  );
};

DateEntry.displayName = getEntryDisplayName(DateEntry);

export default DateEntry;

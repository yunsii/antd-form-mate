import React from 'react';
import { TimePicker } from 'antd';
import { TimeRangePickerProps } from 'antd/lib/time-picker';
import { RangeValue } from 'rc-picker/lib/interface';
import { Moment } from 'moment';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

type Value = RangeValue<Moment>;

export interface TimeRangeEntryProps extends NewFormMateItemPropsWithoutChildren<Value, TimeRangePickerProps> {}

const plainRender: PlainRenderFn<Value, TimeRangePickerProps> = ({ value, entryProps }) => {
  const { format } = entryProps;
  if (value) {
    return value.map((item) => item?.format((format as string) || 'HH:mm:ss')).join('~');
  }
};

const TimeEntry: React.FC<TimeRangeEntryProps> = (props) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <TimePicker.RangePicker picker='time' {...props.entryProps} />
    </FormMateItem>
  );
};

TimeEntry.displayName = getEntryDisplayName(TimeEntry);

export default TimeEntry;

import React from 'react';
import { TimePicker } from 'antd';
import { TimeRangePickerProps } from 'antd/lib/time-picker';

import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface TimeRangeEntryProps extends NewFormMateItemPropsWithoutChildren<TimeRangePickerProps> {}

const TimeEntry: React.FC<TimeRangeEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <TimePicker.RangePicker picker='time' {...props.entryProps} />
    </FormMateItem>
  );
};

TimeEntry.displayName = `FM.${TimeEntry.name}`;

export default TimeEntry;

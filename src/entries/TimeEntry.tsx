import React from 'react';
import { TimePicker } from 'antd';
import { TimePickerProps } from 'antd/lib/time-picker';

import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface TimeEntryProps extends NewFormMateItemPropsWithoutChildren<TimePickerProps> {}

const TimeEntry: React.FC<TimeEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <TimePicker {...props.entryProps} />
    </FormMateItem>
  );
};

TimeEntry.displayName = `FM.${TimeEntry.name}`;

export default TimeEntry;

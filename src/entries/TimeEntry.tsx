import React from 'react';
import { TimePicker } from 'antd';
import { TimePickerProps } from 'antd/lib/time-picker';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

export interface TimeEntryProps extends NewFormMateItemPropsWithoutChildren<TimePickerProps> {}

const plainRender: PlainRenderFn<any, TimePickerProps> = ({ value, entryProps }) => {
  const { format } = entryProps;
  return value?.format((format as string) || 'HH:mm:ss');
};

const TimeEntry = React.forwardRef<any, TimeEntryProps>((props, ref) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <TimePicker ref={ref} {...props.entryProps} />
    </FormMateItem>
  );
});

TimeEntry.displayName = getEntryDisplayName(TimeEntry);

export default TimeEntry;

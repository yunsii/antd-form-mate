import React from 'react';
import { Input } from 'antd';
import { PasswordProps } from 'antd/lib/input';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface PasswordEntryProps extends NewFormMateItemPropsWithoutChildren<PasswordProps> {}

const PasswordEntry = React.forwardRef<unknown, PasswordEntryProps>((props, ref) => {
  return (
    <FormMateItem {...props}>
      <Input.Password ref={ref} {...props.entryProps} />
    </FormMateItem>
  );
});

PasswordEntry.displayName = getEntryDisplayName(PasswordEntry);

export default PasswordEntry;

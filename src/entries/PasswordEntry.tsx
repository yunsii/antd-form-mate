import React from 'react';
import { Input } from 'antd';
import { PasswordProps } from 'antd/lib/input';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface PasswordEntryProps extends NewFormMateItemPropsWithoutChildren<PasswordProps> {}

const PasswordEntry: React.FC<PasswordEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <Input.Password {...props.entryProps} />
    </FormMateItem>
  );
};

PasswordEntry.displayName = getEntryDisplayName(PasswordEntry);

export default PasswordEntry;

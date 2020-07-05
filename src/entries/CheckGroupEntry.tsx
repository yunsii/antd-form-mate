import React from 'react';

import { getEntryDisplayName } from './utils';
import CustomCheckGroup, { CustomCheckGroupProps } from '../components/CustomCheckGroup';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface CheckGroupEntryProps extends NewFormMateItemPropsWithoutChildren<CustomCheckGroupProps> {}

const CheckGroupEntry: React.FC<CheckGroupEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <CustomCheckGroup {...props.entryProps} />
    </FormMateItem>
  );
};

CheckGroupEntry.displayName = getEntryDisplayName(CheckGroupEntry);

export default CheckGroupEntry;

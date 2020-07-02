import React from 'react';

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

CheckGroupEntry.displayName = `FM.${CheckGroupEntry.name}`;

export default CheckGroupEntry;

import React from 'react';

import CustomSelect, { CustomSelectProps } from '../components/CustomSelect';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface SelectEntryProps extends NewFormMateItemPropsWithoutChildren<CustomSelectProps> {}

const SelectEntry: React.FC<SelectEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <CustomSelect {...props.entryProps} />
    </FormMateItem>
  );
};

SelectEntry.displayName = `FM.${SelectEntry.name}`;

export default SelectEntry;

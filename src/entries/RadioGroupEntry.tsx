import React from 'react';

import CustomRadioGroup, { CustomRadioGroupProps } from '../components/CustomRadioGroup';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface RadioGroupEntryProps extends NewFormMateItemPropsWithoutChildren<CustomRadioGroupProps> {}

const RadioGroupEntry: React.FC<RadioGroupEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <CustomRadioGroup {...props.entryProps} />
    </FormMateItem>
  );
};

RadioGroupEntry.displayName = `FM.${RadioGroupEntry.name}`;

export default RadioGroupEntry;

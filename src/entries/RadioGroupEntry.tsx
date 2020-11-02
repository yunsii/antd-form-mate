import React from 'react';
import { CheckboxOptionType } from 'antd/lib/checkbox';

import { getEntryDisplayName } from './utils';
import CustomRadioGroup, { CustomRadioGroupProps } from '../components/CustomRadioGroup';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

export interface RadioGroupEntryProps extends NewFormMateItemPropsWithoutChildren<any, CustomRadioGroupProps> {}

const plainRender: PlainRenderFn<any, CustomRadioGroupProps> = ({ value, entryProps }) => {
  const { options } = entryProps;

  if (options?.length) {
    for (const item of options) {
      if (typeof item === 'string' && item === value) {
        return item;
      }
      if ((item as CheckboxOptionType).value === value) {
        return (item as CheckboxOptionType).label;
      }
    }
  }
  return value;
};

const RadioGroupEntry: React.FC<RadioGroupEntryProps> = (props) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <CustomRadioGroup {...props.entryProps} />
    </FormMateItem>
  );
};

RadioGroupEntry.displayName = getEntryDisplayName(RadioGroupEntry);

export default RadioGroupEntry;

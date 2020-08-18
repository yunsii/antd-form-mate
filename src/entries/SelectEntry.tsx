import React from 'react';
import _flatten from 'lodash/flatten';
import _find from 'lodash/find';
import _join from 'lodash/join';

import { getEntryDisplayName } from './utils';
import CustomSelect, { CustomSelectProps } from '../components/CustomSelect';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

export interface SelectEntryProps extends NewFormMateItemPropsWithoutChildren<any, CustomSelectProps> {}

const plainRender: PlainRenderFn<any, CustomSelectProps> = ({ value, entryProps }) => {
  const { options: selectOptions, mode } = entryProps;
  const getTargetItem = (_value: any) => {
    return _find(_flatten(selectOptions?.map((item) => item.options || item)), { value: _value });
  };

  if (mode === 'tags') {
    return value;
  }

  if (mode === 'multiple') {
    const targets = value.map(getTargetItem);
    return _join(
      targets.map((item: any) => item.label),
      '，'
    );
  }

  return getTargetItem(value)?.label;
};

const SelectEntry: React.FC<SelectEntryProps> = (props) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <CustomSelect {...props.entryProps} />
    </FormMateItem>
  );
};

SelectEntry.displayName = getEntryDisplayName(SelectEntry);

export default SelectEntry;

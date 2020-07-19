import React from 'react';

import { getEntryDisplayName, joinOptions, getTargetOption } from './utils';
import CustomCheckGroup, { CustomCheckGroupProps } from '../components/CustomCheckGroup';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

export interface CheckGroupEntryProps extends NewFormMateItemPropsWithoutChildren<any, CustomCheckGroupProps> {}

const plainRender: PlainRenderFn<any, CustomCheckGroupProps> = ({ value, entryProps }) => {
  const { options = [] } = entryProps;
  return joinOptions(value?.map((item: any) => getTargetOption(item, options as any)));
};

const CheckGroupEntry: React.FC<CheckGroupEntryProps> = (props) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <CustomCheckGroup {...props.entryProps} />
    </FormMateItem>
  );
};

CheckGroupEntry.displayName = getEntryDisplayName(CheckGroupEntry);

export default CheckGroupEntry;

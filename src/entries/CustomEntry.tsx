import React from 'react';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemProps } from '../components/FormMate/FormMateItem';

export interface CustomEntryProps extends NewFormMateItemProps<void> {}

const CustomEntry: React.FC<CustomEntryProps> = (props) => {
  const { children, ...rest } = props;
  return <FormMateItem {...rest}>{children}</FormMateItem>;
};

CustomEntry.displayName = getEntryDisplayName(CustomEntry);

export default CustomEntry;

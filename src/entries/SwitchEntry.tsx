import React from 'react';
import { Switch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface SwitchEntryProps extends NewFormMateItemPropsWithoutChildren<SwitchProps> {}

const SwitchEntry: React.FC<SwitchEntryProps> = (props) => {
  return (
    <FormMateItem valuePropName='checked' {...props}>
      <Switch style={{}} {...props.entryProps} />
    </FormMateItem>
  );
};

SwitchEntry.displayName = getEntryDisplayName(SwitchEntry);

export default SwitchEntry;

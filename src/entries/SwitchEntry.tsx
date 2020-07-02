import React from 'react';
import { Switch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';

import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface SwitchEntryProps extends NewFormMateItemPropsWithoutChildren<SwitchProps> {}

const SwitchEntry: React.FC<SwitchEntryProps> = (props) => {
  return (
    <FormMateItem valuePropName='checked' {...props}>
      <Switch {...props.entryProps} />
    </FormMateItem>
  );
};

SwitchEntry.displayName = `FM.${SwitchEntry.name}`;

export default SwitchEntry;

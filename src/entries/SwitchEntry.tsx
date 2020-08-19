import React from 'react';
import { Switch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';

import { getEntryDisplayName } from './utils';
import { cloneElement } from '../utils/reactNode';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface SwitchEntryProps extends NewFormMateItemPropsWithoutChildren<SwitchProps> {}

const SwitchEntry: React.FC<SwitchEntryProps> = (props) => {
  return (
    <FormMateItem
      valuePropName='checked'
      plainRender={({ value, children }) => cloneElement(children, { checked: value })}
      {...props}
    >
      <Switch style={{}} disabled={props.plain} {...props.entryProps} />
    </FormMateItem>
  );
};

SwitchEntry.displayName = getEntryDisplayName(SwitchEntry);

export default SwitchEntry;

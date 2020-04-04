import React from "react";
import { Switch } from "antd";
import { SwitchProps } from 'antd/lib/switch';

import { setSwitchValue } from "../../utils/setValue";

export interface CustomSwitchProps extends Omit<SwitchProps, 'checked'> {
  checked?: boolean | number;
}

const CustomSwitch: React.FC<CustomSwitchProps> = (props) => {
    const { checked, ...rest } = props;
    return <Switch {...rest} checked={setSwitchValue(checked)} />;
}

export default CustomSwitch;

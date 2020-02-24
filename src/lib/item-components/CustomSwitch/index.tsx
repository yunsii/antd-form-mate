import React, { Component } from "react";
import { Switch } from "antd";
import { setSwitchValue } from "../../setValue";

export interface CustomSwitchProps {
  checked?: boolean | number;
}

export default class CustomSwitch extends Component<CustomSwitchProps> {

  render() {
    const { checked, ...rest } = this.props;
    return <Switch {...rest} checked={setSwitchValue(checked)} />;
  }
}

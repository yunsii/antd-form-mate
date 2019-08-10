import React, { Component } from "react";
import { Switch } from "antd";

export interface CustomSwitchProps {
  checked?: boolean | number;
}

export default class CustomSwitch extends Component<CustomSwitchProps> {
  setValue = checked => !!checked;

  render() {
    const { checked, ...rest } = this.props;
    return <Switch {...rest} checked={this.setValue(checked)} />;
  }
}

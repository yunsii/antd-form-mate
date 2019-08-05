import React, { Component } from "react";
import { Switch } from "antd";

export default class CustomSwitch extends Component {
  setValue = checked => !!checked;

  render() {
    const { checked, ...rest } = this.props;
    return <Switch {...rest} checked={this.setValue(checked)} />;
  }
}

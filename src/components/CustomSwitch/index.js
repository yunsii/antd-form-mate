import React, { Component } from "react";
import { Switch } from "antd";

export default class CustomSwitch extends Component {
  setValue = value => !!value;

  render() {
    const { value, ...rest } = this.props;
    return <Switch {...rest} value={this.setValue(value)} />;
  }
}

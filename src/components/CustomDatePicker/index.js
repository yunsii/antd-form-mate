/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import moment from "moment";
import _isArray from "lodash/isArray";
import { DatePicker } from "antd";

// Warning: Function components cannot be given refs.
const { RangePicker } = DatePicker;

export class CustomRangePicker extends Component {
  setValue = value => {
    if (!value) return null;
    if (!(_isArray(value) && value.length >= 2)) {
      console.error("RangePicker value is error:", value);
      return null;
    }
    if (value[0] instanceof moment) return value;
    return [moment(value[0]), moment(value[1])];
  };

  render() {
    const { value, ...rest } = this.props;
    return <RangePicker {...rest} value={this.setValue(value)} />;
  }
}

export default class CustomDatePicker extends Component {
  setValue = value => {
    if (!value) return null;
    if (value instanceof moment) return value;
    return moment(value);
  };

  render() {
    const { value, ...rest } = this.props;
    return <DatePicker {...rest} value={this.setValue(value)} />;
  }
}

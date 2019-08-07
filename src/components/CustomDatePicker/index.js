/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import moment from "moment";
import _isArray from "lodash/isArray";
import { DatePicker } from "antd";

// Warning: Function components cannot be given refs.
const { RangePicker } = DatePicker;

function setDateTimeValue(value) {
  if (!value) return null;
  if (value instanceof moment) return value;
  if (typeof value === "number") {
    const currentMs = moment().valueOf();
    const currentMsLength = `${currentMs}`.length;
    if (currentMsLength === `${value}`.length) {
      return moment(value);
    }
    return moment.unix(value);
  }
  return moment(value);
}

export class CustomRangePicker extends Component {
  setValue = value => {
    if (!value) return null;
    if (!(_isArray(value) && value.length >= 2)) {
      console.error("RangePicker value is error:", value);
      return null;
    }
    if (value[0] instanceof moment) return value;
    return [setDateTimeValue(value[0]), setDateTimeValue(value[1])];
  };

  render() {
    const { value, ...rest } = this.props;
    return <RangePicker {...rest} value={this.setValue(value)} />;
  }
}

export default class CustomDatePicker extends Component {
  render() {
    const { value, ...rest } = this.props;
    return <DatePicker {...rest} value={setDateTimeValue(value)} />;
  }
}

/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import moment, { Moment } from "moment";
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

function disabledLessThanOrEqualTodayDate(current) {
  return current && current < moment().endOf('day');
}

function disabledAfterTodayDate(current) {
  return !disabledLessThanOrEqualTodayDate(current);
}

function setDisabledDate(todayAndBefore, onlyAfterToday) {
  let disabledDate: any = null;
  if (todayAndBefore && onlyAfterToday) {
    disabledDate = null;
  } else if (onlyAfterToday) {
    disabledDate = disabledLessThanOrEqualTodayDate;
  } else if (todayAndBefore) {
    disabledDate = disabledAfterTodayDate;
  }
  return disabledDate;
}

export interface CustomRangePickerProps {
  value?: string[] | number[] | Moment[];
  onlyAfterToday?: boolean;
  todayAndBefore?: boolean;
}

export class CustomRangePicker extends Component<CustomRangePickerProps> {
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
    const { value, onlyAfterToday, todayAndBefore, ...rest } = this.props;
    return (
      <RangePicker
        disabledDate={setDisabledDate(todayAndBefore, onlyAfterToday)}
        {...rest}
        value={this.setValue(value)}
      />
    );
  }
}

export interface CustomDatePickerProps {
  value?: string | number | Moment;
  onlyAfterToday?: boolean;
  todayAndBefore?: boolean;
}

export default class CustomDatePicker extends Component<CustomDatePickerProps> {
  render() {
    const { value, onlyAfterToday, todayAndBefore, ...rest } = this.props;

    return (
      <DatePicker
        disabledDate={setDisabledDate(todayAndBefore, onlyAfterToday)}
        {...rest}
        value={setDateTimeValue(value) as any}
      />
    );
  }
}

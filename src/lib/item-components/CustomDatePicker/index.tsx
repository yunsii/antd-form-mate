/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import moment from "moment";
import _isArray from "lodash/isArray";
import { DatePicker } from "antd";
import { RangePickerProps, DatePickerProps } from 'antd/lib/date-picker/interface';
import { setDatetimeValue, setDatetimeRangeValue } from '../../setValue';

const { RangePicker } = DatePicker;

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

export interface CustomRangePickerProps extends RangePickerProps {
  onlyAfterToday?: boolean;
  todayAndBefore?: boolean;
}
export class CustomRangePicker extends Component<CustomRangePickerProps> {
  render() {
    const { onlyAfterToday, todayAndBefore, value, ...rest } = this.props;
    return (
      <RangePicker
        disabledDate={setDisabledDate(todayAndBefore, onlyAfterToday)}
        {...rest}
        value={setDatetimeRangeValue(value)}
      />
    );
  }
}

export interface CustomDatePickerProps extends DatePickerProps {
  onlyAfterToday?: boolean;
  todayAndBefore?: boolean;
}
export default class CustomDatePicker extends Component<CustomDatePickerProps> {
  render() {
    const { onlyAfterToday, todayAndBefore, value, ...rest } = this.props;
    return (
      <DatePicker
        disabledDate={setDisabledDate(todayAndBefore, onlyAfterToday)}
        {...rest}
        value={setDatetimeValue(value)}
      />
    );
  }
}

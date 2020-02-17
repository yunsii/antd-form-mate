/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import moment, { Moment } from "moment";
import _isArray from "lodash/isArray";
import { DatePicker } from "antd";
import { RangePickerProps, DatePickerProps } from 'antd/lib/date-picker';
import { setDatetimeValue, setDatetimeRangeValue } from '../../setValue';

const { RangePicker } = DatePicker;

function disabledLessThanOrEqualTodayDate(current: Moment) {
  return current && current < moment().endOf('day');
}

function disabledAfterTodayDate(current: Moment) {
  return !disabledLessThanOrEqualTodayDate(current);
}

function setDisabledDate(disabledFutureDays?: boolean, disabledPastDays?: boolean) {
  let disabledDate: any = null;
  if (disabledFutureDays && disabledPastDays) {
    disabledDate = null;
  } else if (disabledFutureDays) {
    disabledDate = disabledAfterTodayDate;
  } else if (disabledPastDays) {
    disabledDate = disabledLessThanOrEqualTodayDate;
  }
  return disabledDate;
}

interface QuickDisabledProps {
  // 禁用过去的日期，包含今天
  disabledPastDays?: boolean;
  // 禁用未来的日期
  disabledFutureDays?: boolean;
}

export type CustomRangePickerProps = RangePickerProps & QuickDisabledProps;
export class CustomRangePicker extends Component<CustomRangePickerProps> {
  render() {
    const { disabledPastDays, disabledFutureDays, value, ...rest } = this.props;
    return (
      <RangePicker
        disabledDate={setDisabledDate(disabledFutureDays, disabledPastDays)}
        {...rest}
        value={setDatetimeRangeValue(value)}
      />
    );
  }
}

export type CustomDatePickerProps = DatePickerProps & QuickDisabledProps;
export default class CustomDatePicker extends Component<CustomDatePickerProps> {
  render() {
    const { disabledPastDays, disabledFutureDays, value, ...rest } = this.props;
    return (
      <DatePicker
        disabledDate={setDisabledDate(disabledFutureDays, disabledPastDays)}
        {...rest}
        value={setDatetimeValue(value)}
      />
    );
  }
}

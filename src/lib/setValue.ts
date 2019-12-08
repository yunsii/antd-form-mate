import moment, { Moment } from 'moment';
import _isArray from "lodash/isArray";
import { ComponentType } from "./props";

export function setInitialValue(type: ComponentType, value: any) {
  switch (type) {
    case 'date':
    case 'datetime':
      return setDatetimeValue(value);
    case 'date-range':
    case 'datetime-range':
      return setDatetimeRangeValue(value);
    default:
      return undefined;
  }
}

export default setInitialValue;

type DatetimeValue = undefined | Moment;
export function setDatetimeValue(value: undefined | null | number | Moment): undefined | Moment {
  let result: DatetimeValue = undefined;
  if (typeof value === "number") {
    const currentMs = moment().valueOf();
    const currentMsLength = `${currentMs}`.length;
    if (currentMsLength === `${value}`.length) {
      result = moment(value);
    }
    result = moment.unix(value);
  }
  if (typeof value === "string") {
    result = moment(value);
  }
  if (value instanceof moment) {
    result = value as Moment;
  }
  return result;
}

type DatetimeRangeValue = [undefined, undefined] | [Moment, Moment];
export function setDatetimeRangeValue(value): DatetimeRangeValue {
  if (_isArray(value) && value.length >= 2) {
    return [setDatetimeValue(value[0]), setDatetimeValue(value[1])] as DatetimeRangeValue;
  }
  return [undefined, undefined];
}

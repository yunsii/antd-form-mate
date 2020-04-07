import moment, { Moment } from 'moment';
import _isArray from 'lodash/isArray';
import _isString from 'lodash/isString';

import { UploadFile } from 'antd/lib/upload/interface';
import { ComponentType } from '../interfaces';

export function setInitialValue(type: ComponentType, value: any) {
  switch (type) {
    case 'date':
    case 'datetime':
      return setDatetimeValue(value);
    case 'date-range':
    case 'datetime-range':
      return setDatetimeRangeValue(value);
    case 'picture':
    case 'file-dragger':
      return setFileList(value);
    case 'switch':
      return setSwitchValue(value);
    default:
      return value;
  }
}

export default setInitialValue;

type DatetimeValue = undefined | Moment;
export function setDatetimeValue(value: undefined | null | number | Moment): DatetimeValue {
  if (value instanceof moment) {
    return value as Moment;
  }
  if (typeof value === 'number') {
    const currentMs = moment().valueOf();
    const currentMsLength = `${currentMs}`.length;
    if (currentMsLength === `${value}`.length) {
      return moment(value);
    }
    return moment.unix(value);
  }
  if (typeof value === 'string') {
    return moment(value);
  }
  return undefined;
}

type DatetimeRangeValue = [null, null] | [Moment, Moment];
export function setDatetimeRangeValue(value): DatetimeRangeValue {
  if (_isArray(value) && value.length >= 2) {
    return [setDatetimeValue(value[0]), setDatetimeValue(value[1])] as DatetimeRangeValue;
  }
  return [null, null];
}

function setFileNameByPath(path: string) {
  const pathSegment = path.split(/\//g);
  return pathSegment[pathSegment.length - 1];
}

export function setFileList(value?: string | any[]): UploadFile[] {
  let fileList: UploadFile[] = [];
  if (value && _isString(value)) {
    fileList = [{ uid: setFileNameByPath(value), url: value, name: setFileNameByPath(value), status: 'done' } as any];
  } else if (value && _isArray(value) && _isString(value[0])) {
    fileList = value.map(
      (item, index) =>
        ({ uid: setFileNameByPath(item), url: item, name: setFileNameByPath(item), status: 'done' } as any)
    );
  }
  return fileList;
}

export function setSwitchValue(value?: boolean | number) {
  return !!value;
}

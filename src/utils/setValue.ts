import moment, { Moment } from 'moment';

import { UploadFile } from 'antd/lib/upload/interface';

export function setInitialValue(type: any, value: any) {
  switch (type) {
    case 'FM.DateEntry':
    case 'FM.TimeEntry':
    case 'FM.DatetimeEntry':
      return setDatetimeValue(value);
    case 'FM.DateRangeEntry':
    case 'FM.TimeRangeEntry':
      return setDatetimeRangeValue(value);
    case 'FM.UploadEntry':
    case 'FM.UploadDraggerEntry':
      return setFileList(value);
    case 'FM.SwitchEntry':
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

type DatetimeRangeValue = null | [Moment, Moment];

export function setDatetimeRangeValue(value): DatetimeRangeValue {
  if (Array.isArray(value) && value.length >= 2) {
    return [setDatetimeValue(value[0]), setDatetimeValue(value[1])] as DatetimeRangeValue;
  }
  return null;
}

function setFileNameByPath(path: string) {
  const pathSegment = path.split(/\//g);
  return pathSegment[pathSegment.length - 1];
}

function matchFileItem(values: UploadFile[]) {
  for (let i = 0; i < values.length; i += 1) {
    if (
      !(
        values[i].uid &&
        typeof values[i].name === 'string' &&
        values[i].status === 'done' &&
        typeof values[i].url === 'string' &&
        values[i].url.match(/^(http|https):\/\/([\w.]+\/?)\S*/)
      )
    ) {
      return false;
    }
  }
  return true;
}

export function setFileList(value?: string | any[], setFileName?: (path: string) => string): UploadFile[] {
  let fileList: UploadFile[] = [];
  const _setFileName = setFileName || setFileNameByPath;
  if (value && typeof value === 'string') {
    fileList = [
      {
        uid: _setFileName(value),
        url: value,
        name: _setFileName(value),
        status: 'done',
      } as any,
    ];
  } else if (value && Array.isArray(value) && typeof value[0] === 'string') {
    fileList = value.map(
      (item, index) =>
        ({
          uid: _setFileName(item),
          url: item,
          name: _setFileName(item),
          status: 'done',
        } as any)
    );
  } else if (value && Array.isArray(value) && matchFileItem(value)) {
    fileList = value;
  }
  return fileList;
}

export function setSwitchValue(value?: boolean | number) {
  return !!value;
}

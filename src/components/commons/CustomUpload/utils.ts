import _template from 'lodash/template';

import { IntlType } from '../../../contexts/Intlcontext';

export function processDimensionLimit(dimensionLimit: string) {
  let result: any[] = [false, false];
  const getWidthAndHeight = (item: string) => item.split('*').map(item => parseInt(item, 10));

  if (!dimensionLimit.startsWith('<') && !dimensionLimit.startsWith('>') && !dimensionLimit.match(',')) {
    const [width, height] = getWidthAndHeight(dimensionLimit);
    result = result.map(item => ({ width, height }));
  } else if (dimensionLimit.startsWith('<')) {
    const [width, height] = getWidthAndHeight(dimensionLimit.slice(1));
    result[1] = {
      width,
      height,
    }
  } else if (dimensionLimit.startsWith('>')) {
    const [width, height] = getWidthAndHeight(dimensionLimit.slice(1));
    result[0] = {
      width,
      height,
    }
  } else {
    const [min, max] = dimensionLimit.split(',');
    const [minWidth, minHeight] = getWidthAndHeight(min);
    const [maxWidth, maxHeight] = getWidthAndHeight(max);
    result[0] = {
      width: minWidth,
      height: minHeight,
    }
    result[1] = {
      width: maxWidth,
      height: maxHeight,
    }
  }
  return result;
}

export function isLimitDimension(limits: any[], dimension: { width: number, height: number }) {
  const { width, height } = dimension;
  const isLessOrEqual = (limit) => width <= limit.width && height <= limit.height
  const isMoreOrEqual = (limit) => width >= limit.width && height >= limit.height
  if (limits[0] === false) {
    return isLessOrEqual(limits[1]);
  }
  if (limits[1] === false) {
    return isMoreOrEqual(limits[0]);
  }
  return isMoreOrEqual(limits[0]) && isLessOrEqual(limits[1]);
}

export const setMimeLimitHint = (intl: IntlType) => (accept: string) => {
  return _template(intl.getMessage('hint.mimeLimitTplt', '文件类型限制：${ limit }'))({ limit: accept });
}

export const setCountLimitHint = (intl: IntlType) => (countLimit: number) => {
  return _template(intl.getMessage('hint.countLimitTplt', '文件个数限制：${ limit }'))({ limit: countLimit });
}

export const setSizeLimitHint = (intl: IntlType) => (sizeLimit: number) => {
  let limit = `${sizeLimit} B`;
  function setUnit(power: number) {
    switch(power) {
      case 3:
        return 'GB';
      case 2:
        return 'MB';
      case 1:
        return 'KB';
      default:
        return 'B';
    }
  }
  for (let i = 3; i > 0; i--) {
    const number = sizeLimit / Math.pow(1024, i);
    if (number >= 1) {
      limit = `${number.toFixed(2)} ${setUnit(i)}`;
      break;
    }
  }
  return _template(intl.getMessage('hint.sizeLimitTplt', '文件大小限制：${ limit }'))({ limit });
}

export const setDimensionLimitHint = (intl: IntlType) => (dimensionLimit: string) => {
  return _template(intl.getMessage('hint.dimensionLimitTplt', '图片像素限制：${ limit }'))({ limit: dimensionLimit });
}

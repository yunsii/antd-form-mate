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
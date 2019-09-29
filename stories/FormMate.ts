import { config } from '../src';
export { createFormItems } from '../src';

const { setDefaultExtra, setCommenProps } = config;

setDefaultExtra({
  picture: '自定义图片默认提示',
})

setCommenProps({
  allowClear: true,
})

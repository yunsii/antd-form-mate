import { config } from '../src';
import { ComponentType } from '../src/lib/props';

const { setDefaultExtra, setCommenProps } = config;

setDefaultExtra({
  picture: '自定义图片默认提示',
});

setCommenProps((type: ComponentType) => {
  if (!(['check-group', 'textarea', 'switch'] as ComponentType[]).includes(type)) {
    return {
      allowClear: true,
    }
  }
  return null;
});

export { createFormItems } from '../src';

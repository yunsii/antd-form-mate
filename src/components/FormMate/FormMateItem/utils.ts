import { ComponentType } from '../../../interfaces';

export const setValuePropName = (type: ComponentType) => {
  if (type === 'switch') {
    return 'checked';
  }
  if (type === 'picture' || type === 'file-dragger') {
    return 'fileList';
  }
  return 'value';
};

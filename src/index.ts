import * as FormMateConfig from './config';
import * as FormMateLocale from './locale';
import * as FormMate from './antd-form-mate';

export default FormMate;
export const config = {
  setCommenStyle: FormMateConfig.setCommenStyle,
  setCommenProps: FormMateConfig.setCommenProps,
  UploadConfig: FormMateConfig.setUploadConfig,
  setPictureConfig: FormMateConfig.setPictureConfig,
};
export const locale = {
  setPicturesWallLocale: FormMateLocale.setPicturesWallLocale,
  setDraggerLocale: FormMateLocale.setDraggerLocale,
};

// export interface. reference: https://github.com/babel/babel/issues/8361
export type ComponentType = FormMate.ComponentType;
export type CustomFormItemProps = FormMate.CustomFormItemProps;
export type ItemConfig = FormMate.ItemConfig;

export { default as DatePicker, CustomRangePicker as RangePicker } from './components/CustomDatePicker';
export { default as Switch } from './components/CustomSwitch';
export { default as AMap } from './components/CutomAMap';
export { default as LocationPicker } from './components/LocationPicker';
export { default as PicturesWall } from './components/PicturesWall';
export { default as Select } from './components/Select';
export { default as Upload, CustomDragger as Dragger } from './components/Upload';
export { default as CheckGroup } from './components/CustomCheckGroup';

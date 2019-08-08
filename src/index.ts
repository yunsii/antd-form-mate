import * as FormMateConfig from './config';
import * as FormMate from './antd-form-mate';

export default FormMate;
export const config = FormMateConfig;

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

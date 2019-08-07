import * as FormMateConfig from './config';
import * as FormMate from './antd-form-mate';

export default FormMate;
export const config = FormMateConfig;

// export interface. reference: https://github.com/babel/babel/issues/8361
export type ComponentType = FormMate.ComponentType;
export type CustomFormItemProps = FormMate.CustomFormItemProps;
export type ItemConfig = FormMate.ItemConfig;

export { default as AMap } from './components/CutomAMap';

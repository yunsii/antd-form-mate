import { FormItemProps, FormInstance } from 'antd/lib/form';
import { InputNumberProps } from 'antd/lib/input-number';
import { PasswordProps, TextAreaProps, InputProps } from 'antd/lib/input';
import { SliderProps } from 'antd/lib/slider';
import { CascaderProps } from 'antd/lib/cascader';
import { NamePath } from 'rc-field-form/lib/interface';
import { CustomDatePickerProps, CustomRangePickerProps } from './components/CustomDatePicker/index';
import { CustomSwitchProps } from './components/CustomSwitch/index';
import { CustomSelectProps } from './components/CustomSelect/index';
import { PicturesWallProps } from './components/PicturesWall/index';
import { CustomDraggerProps } from './components/CustomDragger';
import { CustomCheckGroupProps } from './components/CustomCheckGroup/index';
import { CustomRadioGroupProps } from './components/CustomRadioGroup/index';
import { InputNumberRangeProps } from './components/InputNumberRange/index';

export type ComponentType =
  | 'plain'
  | 'custom'
  | 'date'
  | 'datetime'
  | 'date-range'
  | 'datetime-range'
  | 'number'
  | 'number-range'
  | 'select'
  | 'cascader'
  | 'password'
  | 'picture'
  | 'switch'
  | 'slider'
  | 'file-dragger'
  | 'check-group'
  | 'radio-group'
  /** string input, no whitespace */
  | 'textarea'
  | 'email'
  | 'string';

export type DefaultTypeHintOptions = {
  [key in ComponentType]?: any;
};

export type DefaultTypeRulesOptions = {
  [key in ComponentType]?: any;
};

export type ComponentProps =
  | CustomDatePickerProps
  | CustomRangePickerProps
  | InputNumberProps
  | InputNumberRangeProps
  | CustomSelectProps
  | CascaderProps
  | PasswordProps
  | PicturesWallProps
  | CustomSwitchProps
  | SliderProps
  | CustomDraggerProps
  | CustomCheckGroupProps
  | CustomRadioGroupProps
  /** string input, no whitespace */
  | TextAreaProps
  | InputProps;

export interface CustomFormItemProps extends Omit<FormItemProps, 'name' | 'children'> {
  dense?: boolean;
}

/**
 * `children` prop is usable with `custom` type.
 */
export interface FormMateItemProps<T = never, P = never> extends CustomFormItemProps {
  type?: ComponentType | T;
  name: NamePath;
  componentProps?: ComponentProps | P;
  children?: FormItemProps['children'];
}

export interface FormMateDynamicProps<T = never, P = never> extends FormMateItemProps<T, P> {
  render?: (form: FormInstance) => boolean | null | undefined;
}

import { FormItemProps, FormInstance } from 'antd/lib/form';
import { RowProps } from 'antd/lib/row';
import { ColProps } from 'antd/lib/col';
import { InputNumberProps } from 'antd/lib/input-number';
import { SwitchProps } from 'antd/lib/switch';
import { PasswordProps, TextAreaProps, InputProps } from 'antd/lib/input';
import { SliderProps } from 'antd/lib/slider';
import { CascaderProps } from 'antd/lib/cascader';
import { FormProps } from 'antd/lib/form';
import { CustomDatePickerProps, CustomRangePickerProps } from './components/CustomDatePicker/index';
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
  | SwitchProps
  | SliderProps
  | CustomDraggerProps
  | CustomCheckGroupProps
  | CustomRadioGroupProps
  /** string input, no whitespace */
  | TextAreaProps
  | InputProps;

export interface CustomFormItemProps extends Omit<FormItemProps, 'children'> {
  dense?: boolean;
}

/**
 * `children` prop is usable with `custom` type.
 */
export interface FormMateItemProps<T = never, P = never> extends CustomFormItemProps {
  type?: ComponentType | T;
  componentProps?: ComponentProps | P;
  children?: FormItemProps['children'];
}

export interface FormMateDynamicProps<T = never, P = never> extends FormMateItemProps<T, P> {
  render?: (form: FormInstance) => boolean | null | undefined;
}

type Filter<T, U> = T extends U ? T : never; // Remove types from T that are not assignable to U

export interface FormMateProps extends FormProps {
  renderChildren?: (children: React.ReactNode) => React.ReactNode;
  /** item: 渲染子节点，name: 表单项字段名 */
  renderItem?: (item: React.ReactNode, name: FormMateItemProps['name']) => React.ReactNode;
  postInitialValues?: (
    initialValues: Filter<FormProps['initialValues'], Object>
  ) => Filter<FormProps['initialValues'], Object>;
  grid?: {
    row?: RowProps;
    col?: ColProps | ((name: FormMateItemProps['name']) => ColProps);
  };
}

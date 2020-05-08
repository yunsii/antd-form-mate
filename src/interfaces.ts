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
import { PostProcess } from './components/FormMate/utils';

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

export type Filter<T, U> = T extends U ? T : never; // Remove types from T that are not assignable to U

export interface Grid {
  row?: RowProps;
  col?: ColProps | ((item: React.ReactNode, name: FormMateItemProps['name'], index?: number) => ColProps | void);
}

export interface FormMateProps extends Omit<FormProps, 'form'> {
  formMate?: FormMateInstance;

  renderChildren?: (children: React.ReactNode) => React.ReactNode;
  /** item: 渲染子节点，name: 表单项字段名, index: 表单项索引，如果为动态类型，index 为 undefined */
  renderItem?: (item: React.ReactNode, name: FormMateItemProps['name'], index?: number) => React.ReactNode;
  postInitialValues?: (
    initialValues: Filter<FormProps['initialValues'], Object>
  ) => Filter<FormProps['initialValues'], Object>;
  grid?: Grid;
}

export interface FormMateInstance extends FormInstance {
  setInitialValues: (initialValues: Filter<FormMateProps['initialValues'], Object>) => void;
  resetFieldsValue: () => void;
}

export interface FormMateInternalHook {
  setFieldsType: (types: any) => void;
  setPostProcess: (postProcess: PostProcess) => void;
}

export interface InternalFormMateInstance extends FormMateInstance {
  getFormMateInternalHook: (key: string) => FormMateInternalHook | null;
}

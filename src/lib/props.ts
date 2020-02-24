import { FormItemProps, FormInstance } from "antd/lib/form";
import { InputNumberProps } from "antd/lib/input-number";
import { PasswordProps, TextAreaProps, InputProps } from "antd/lib/input";
import { SliderProps } from "antd/lib/slider";
import { SwitchProps } from "antd/lib/switch";
import { NamePath } from 'rc-field-form/lib/interface';

import {
  CustomDatePickerProps,
  CustomRangePickerProps,
} from "./item-components/CustomDatePicker/index";
import { CustomSelectProps } from "./item-components/CustomSelect/index";
import { PicturesWallProps } from "./item-components/PicturesWall/index";
import { CustomDraggerProps } from "./item-components/CustomDragger";
import { CustomCheckGroupProps } from "./item-components/CustomCheckGroup/index";
import { CustomRadioGroupProps } from "./item-components/CustomRadioGroup/index";
import { ColProps } from "antd/lib/col";

export type ComponentType =
  | "dynamic"
  | "plain"
  | "custom"
  | "date"
  | "datetime"
  | "date-range"
  | "datetime-range"
  | "number"
  | "select"
  | "password"
  | "picture"
  | "switch"
  | "slider"
  | "file-dragger"
  | "check-group"
  | "radio-group"
  /** string input, no whitespace */
  | "textarea"
  | "email"
  | "string"

export type DefaultTypeHintOptions = {
  [key in ComponentType]?: any;
}

export type DefaultTypeRulesOptions = {
  [key in ComponentType]?: any;
}

export type ComponentProps =
  | CustomDatePickerProps
  | CustomRangePickerProps
  | InputNumberProps
  | CustomSelectProps
  | PasswordProps
  | PicturesWallProps
  | SwitchProps
  | SliderProps
  | CustomDraggerProps
  | CustomCheckGroupProps
  | CustomRadioGroupProps
  /** string input, no whitespace */
  | TextAreaProps
  | InputProps


export interface CustomFormItemProps extends Omit<FormItemProps, 'name' | 'children'> {
  dense?: boolean;
}

export type GenerateItemConfig = Omit<ItemConfig, 'name' | 'component' | 'generateFn'>;

export interface ItemConfig {
  type?: ComponentType;
  name: NamePath;
  formItemProps?: CustomFormItemProps;
  componentProps?: ComponentProps;

  // usable with `custom` and `dynamic` type.
  component?: FormItemProps['children'];
  // usable with `dynamic` type.
  generateFn?: (form: FormInstance) => GenerateItemConfig | null;
}

export interface Layout {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

export type WithCol = ColProps | ((config: ItemConfig) => ColProps);

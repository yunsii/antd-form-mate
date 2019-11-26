import { FormItemProps } from "antd/lib/form";
import { InputNumberProps } from "antd/lib/input-number";
import { PasswordProps, TextAreaProps, InputProps } from "antd/lib/input";
import { SliderProps } from "antd/lib/slider";
import {
  CustomRangePicker,
  CustomDatePickerProps,
  CustomRangePickerProps,
} from "./components/CustomDatePicker/index";
import { CustomSwitchProps } from "./components/CustomSwitch/index";
import { CustomSelectProps } from "./components/CustomSelect/index";
import { LocationPickerProps } from "./components/LocationPicker/index";
import { PicturesWallProps } from "./components/PicturesWall/index";
import { CustomDraggerProps } from "./components/CustomUpload/CustomDragger";
import { CustomCheckGroupProps } from "./components/CustomCheckGroup/index";
import { CustomRadioGroupProps } from "./components/CustomRadioGroup/index";
import { WrappedFormUtils, GetFieldDecoratorOptions } from "antd/lib/form/Form";
import { ColProps } from "antd/lib/col";

export type ComponentType =
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
  | "location"
  | "check-group"
  | "radio-group"
  | "hidden"
  /** string input, no whitespace */
  | "textarea"
  | "email"
  | "string"

export type DefaultExtraOptions = {
  [key in ComponentType]?: any;
}

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
  | CustomSwitchProps
  | SliderProps
  | CustomDraggerProps
  | LocationPickerProps
  | CustomCheckGroupProps
  | CustomRadioGroupProps
  /** string input, no whitespace */
  | TextAreaProps
  | InputProps


export interface CustomFormItemProps extends FormItemProps {
  dense?: boolean;
}

export interface ItemConfig {
  type?: ComponentType;
  field: string;
  formItemProps?: CustomFormItemProps;
  fieldProps?: GetFieldDecoratorOptions;
  componentProps?: ComponentProps;
  component?: JSX.Element;
}

export interface Layout {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

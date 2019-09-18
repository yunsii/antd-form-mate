import * as React from "react";
import { Form, Input, InputNumber, Slider } from "antd";
import { FormItemProps } from "antd/lib/form";
import { InputNumberProps } from "antd/lib/input-number";
import { PasswordProps, TextAreaProps, InputProps } from "antd/lib/input";
import { SliderProps } from "antd/lib/slider";
import { WrappedFormUtils, GetFieldDecoratorOptions } from "antd/lib/form/Form";
import { ColProps } from "antd/lib/col";
import CustomDatePicker, {
  CustomRangePicker,
  CustomDatePickerProps,
  CustomRangePickerProps,
} from "./components/CustomDatePicker/index";
import CustomSwitch, { CustomSwitchProps } from "./components/CustomSwitch/index";
import CustomSelect, { CustomSelectProps } from "./components/Select/index";
import LocationPicker, { LocationPickerProps } from "./components/LocationPicker/index";
import PicturesWall, { PicturesWallProps } from "./components/PicturesWall/index";
import { CustomDragger, CustomDraggerProps } from "./components/Upload/index";
import CustomCheckGroup, { CustomCheckGroupProps } from "./components/CustomCheckGroup/index";
import CustomRadioGroup, { CustomRadioGroupProps } from "./components/CustomRadioGroup/index";
import { commenStyle, commenProps } from "../config";

const { TextArea, Password } = Input;

let defaultExtra = {
  picture: "图片必须大于100*100像素",
};

let defaultTypeHint = {
  email: "请输入正确的邮箱格式",
};

let defaultTypeRules = {
  email: [
    {
      type: "email",
      message: defaultTypeHint.email
    },
  ],
};

export type DefaultExtraOptions = {
  [key in ComponentType]?: any;
}
export function setDefaultExtra(options: DefaultExtraOptions) {
  defaultExtra = {
    ...defaultExtra,
    ...options,
  }
}

export type DefaultTypeHintOptions = {
  email?: any;
}
export function setDefaultTypeHint(options: DefaultTypeHintOptions) {
  defaultTypeHint = {
    ...defaultTypeHint,
    ...options,
  }
}

export type DefaultTypeRulesOptions = {
  email?: any;
}
export function setDefaultTypeRule(options: DefaultTypeHintOptions) {
  defaultTypeHint = {
    ...defaultTypeHint,
    ...options,
  }
}

const setValuePropName = type => {
  if (type === "switch") {
    return "checked";
  }
  return "value";
};

const defaultLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 12 }
};

function renderInputComponent(inputConfig) {
  const { type, component: CustomComponent, ...componentProps } = inputConfig;
  switch (type) {
    case "custom":
      return CustomComponent;
    case "date":
      return (
        <CustomDatePicker style={commenStyle} {...commenProps} {...componentProps} />
      );
    case "datetime":
      return (
        <CustomDatePicker
          style={{ minWidth: "unset", ...commenStyle }}
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          {...commenProps}
          {...componentProps}
        />
      );
    case "datetime-range":
      return (
        <CustomRangePicker
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          style={commenStyle}
          {...commenProps}
          {...componentProps}
        />
      );
    case "date-range":
      return (
        <CustomRangePicker
          format="YYYY-MM-DD"
          style={commenStyle}
          {...commenProps}
          {...componentProps}
        />
      );
    case "number":
      return (
        <InputNumber
          placeholder="请输入"
          style={commenStyle}
          {...commenProps}
          {...componentProps}
        />
      );
    case "select":
      return <CustomSelect style={commenStyle} {...commenProps} {...componentProps} />;
    case "textarea":
      return (
        <TextArea
          style={{ ...commenStyle }}
          placeholder="请输入"
          {...componentProps}
        />
      );
    case "password":
      return (
        <Password
          style={commenStyle}
          placeholder="请输入密码"
          {...commenProps}
          {...componentProps}
        />
      );
    case "picture":
      return <PicturesWall {...commenProps} {...componentProps} />;
    case "switch":
      return <CustomSwitch {...componentProps} />;
    case "slider":
      return <Slider {...commenProps} {...componentProps} />;
    case "file-dragger":
      return <CustomDragger {...commenProps} {...componentProps} />;
    case "location":
      return <LocationPicker {...commenProps} {...componentProps} />;
    case "check-group":
      const { allowClear, ...rest } = commenProps as any;
      return <CustomCheckGroup style={commenStyle} {...rest} {...componentProps} />;
    case "radio-group":
      return <CustomRadioGroup style={commenStyle} {...commenProps} {...componentProps} />;
    default:
      return (
        <Input
          style={commenStyle}
          placeholder="请输入"
          {...commenProps}
          {...componentProps}
        />
      );
  }
}

function setDefaultTypeRules(type: ComponentType, rules) {
  let result = [...rules];
  if (defaultTypeRules[type]) {
    result = [
      ...defaultTypeRules[type],
      ...result,
    ]
  }
  return result;
}

export interface CustomFormItemProps extends FormItemProps {
  dense?: boolean;
}

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

export interface ItemConfig {
  type?: ComponentType;
  field: string;
  formItemProps?: CustomFormItemProps;
  fieldProps?: GetFieldDecoratorOptions;
  componentProps?: ComponentProps;
  component?: React.ElementType;
}

export interface Layout {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

export const createFormItems = (form: WrappedFormUtils) => (
  itemsConfig: ItemConfig[],
  globalLayout?: Layout
) => {
  return itemsConfig.map(config => {
    const {
      type = "string",
      field,
      formItemProps = {} as CustomFormItemProps,
      fieldProps = {},
      componentProps = {},
      component
    } = config;
    const {
      style = {},
      dense,
      extra,
      wrapperCol,
      labelCol,
      ...restFormItemProps
    } = formItemProps;
    const { rules = [], initialValue, ...restFieldProps } = fieldProps;
    const itemLayout = wrapperCol && labelCol ? { wrapperCol, labelCol } : null;

    let layout = itemLayout || globalLayout || defaultLayout;
    if (!itemLayout && !globalLayout && !restFormItemProps.label) {
      layout = {
        wrapperCol: { span: 24 }
      };
    }

    if (type === 'hidden') {
      form.getFieldDecorator(field, {
        initialValue,
      })
      return null;
    }

    let inputComponent: any = (
      <span className="ant-form-text">
        {initialValue}
      </span>
    )
    if (type !== 'plain') {
      inputComponent = (
        form.getFieldDecorator(field, {
          initialValue,
          valuePropName: setValuePropName(type),
          rules: setDefaultTypeRules(type, rules),
          ...restFieldProps,
        })(renderInputComponent({ ...componentProps, type, component }))
      )
    }

    return (
      <Form.Item
        key={field}
        style={dense ? { marginBottom: 0, ...style } : style}
        {...layout}
        extra={extra || defaultExtra[type]}
        {...restFormItemProps}
      >
        {inputComponent}
      </Form.Item>
    )
  }).filter(item => item);
};

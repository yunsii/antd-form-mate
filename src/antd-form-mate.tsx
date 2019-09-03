import * as React from "react";
import { Form, Input, InputNumber, Slider } from "antd";
import { FormItemProps } from "antd/lib/form";
import { WrappedFormUtils, GetFieldDecoratorOptions } from "antd/lib/form/Form";
import { ColProps } from "antd/lib/col";

import CustomDatePicker, {
  CustomRangePicker
} from "./components/CustomDatePicker/index";
import CustomSwitch from "./components/CustomSwitch/index";
import CustomSelect from "./components/Select/index";
import LocationPicker from "./components/LocationPicker/index";
import PicturesWall from "./components/PicturesWall/index";
import { CustomDragger } from "./components/Upload/index";
import CustomCheckGroup from "./components/CustomCheckGroup/index";
import CustomRadioGroup from "./components/CustomRadioGroup/index";
import { commenStyle, commenProps } from "./config";


const { TextArea, Password } = Input;
const FormContext = React.createContext<WrappedFormUtils | null>(null);
export const FormProvider = FormContext.Provider;
const FormConsumer = FormContext.Consumer;

export let defaultExtra = {
  picture: "图片必须大于100*100像素"
};

export let defaultTypeHint = {
  email: "请输入正确的邮箱格式"
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
  [key in ComponentType]: any;
}
export function setDefaultTypeHint(options: DefaultTypeHintOptions) {
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

function setDefaultCheckedTypeHint(type: ComponentType, rules) {
  let result = {};
  if (type === "email") {
    result = {
      type: "email",
      message: defaultTypeHint.email
    };
  }

  return [result, ...rules];
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
  /** string input, no whitespace */
  | "textarea"
  | "email"
  | "string"

export interface ItemConfig {
  type?: ComponentType;
  field: string;
  formItemProps?: CustomFormItemProps;
  fieldProps?: GetFieldDecoratorOptions;
  componentProps?: any;
  component?: React.ElementType;
}

export interface Layout {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

export const createFormItems = (
  itemsConfig: ItemConfig[],
  globalLayout?: Layout
) => {
  return itemsConfig.map(item => {
    const {
      type = "string",
      field,
      formItemProps = {} as CustomFormItemProps,
      fieldProps = {},
      componentProps = {},
      component
    } = item;
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

    console.log(setDefaultCheckedTypeHint(type, rules))
    return (
      <FormConsumer key={field}>
        {form => {
          if (form) {
            let item: any = (
              <span className="ant-form-text">
                {initialValue}
              </span>
            )
            if (type !== 'plain') {
              item = (
                form.getFieldDecorator(field, {
                  initialValue,
                  valuePropName: setValuePropName(type),
                  rules: setDefaultCheckedTypeHint(type, rules),
                  ...restFieldProps,
                })(renderInputComponent({ ...componentProps, type, component }))
              )
            }
            return (
              <Form.Item
                style={dense ? { marginBottom: 0, ...style } : style}
                {...layout}
                extra={extra || defaultExtra[type]}
                {...restFormItemProps}
              >
                {item}
              </Form.Item>
            )
          }
          return null;
        }}
      </FormConsumer>
    );
  });
};

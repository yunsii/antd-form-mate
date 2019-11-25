import * as React from "react";
import _get from 'lodash/get';
import { Form, Input, InputNumber, Slider } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import CustomDatePicker, { CustomRangePicker } from "./components/CustomDatePicker/index";
import CustomSwitch from "./components/CustomSwitch/index";
import CustomSelect from "./components/CustomSelect/index";
import LocationPicker from "./components/LocationPicker/index";
import PicturesWall from "./components/PicturesWall/index";
import CustomDragger from "./components/CustomUpload/CustomDragger";
import CustomCheckGroup from "./components/CustomCheckGroup/index";
import CustomRadioGroup from "./components/CustomRadioGroup/index";
import { commenProps } from "../config";
import {
  ComponentType,
  CustomFormItemProps,
  ItemConfig,
  Layout,
  DefaultExtraOptions,
  DefaultTypeHintOptions,
  DefaultTypeRulesOptions,
} from "./props";

const { TextArea, Password } = Input;

let defaultExtra = {
  picture: "图片必须大于100*100像素",
};
export function setDefaultExtra(options: DefaultExtraOptions) {
  defaultExtra = {
    ...defaultExtra,
    ...options,
  }
}

let defaultTypeHint = {
  email: "请输入正确的邮箱格式",
};
export function setDefaultTypeHint(options: DefaultTypeHintOptions) {
  defaultTypeHint = {
    ...defaultTypeHint,
    ...options,
  }
}

let defaultTypeRules = {
  email: [
    {
      type: "email",
      message: defaultTypeHint.email
    },
  ],
};
export function setDefaultTypeRule(options: DefaultTypeRulesOptions) {
  defaultTypeRules = {
    ...defaultTypeRules,
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

function setExtra(extra: any, type: ComponentType) {
  if (extra === false) {
    return undefined;
  }
  return extra || defaultExtra[type];
}

function renderInputComponent(inputConfig) {
  const { type, component: CustomComponent } = inputConfig;
  switch (type) {
    case "custom":
      return CustomComponent;
    case "date":
      return <CustomDatePicker />;
    case "datetime":
      return <CustomDatePicker style={{ minWidth: "unset" }} format="YYYY-MM-DD HH:mm:ss" showTime />;
    case "datetime-range":
      return <CustomRangePicker format="YYYY-MM-DD HH:mm:ss" showTime />;
    case "date-range":
      return <CustomRangePicker format="YYYY-MM-DD" />;
    case "number":
      return <InputNumber placeholder="请输入" />;
    case "select":
      return <CustomSelect />;
    case "textarea":
      return <TextArea placeholder="请输入" />;
    case "password":
      return <Password placeholder="请输入密码" />;
    case "picture":
      return <PicturesWall />;
    case "switch":
      return <CustomSwitch />;
    case "slider":
      return <Slider />;
    case "file-dragger":
      return <CustomDragger />;
    case "location":
      return <LocationPicker />;
    case "check-group":
      return <CustomCheckGroup />;
    case "radio-group":
      return <CustomRadioGroup />;
    default:
      return <Input placeholder="请输入" />;
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

export const createFormItems = (form: WrappedFormUtils) => (
  itemsConfig: ItemConfig[],
  globalLayout?: Layout,
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
    const { rules = [], initialValue, ...restFieldProps } = fieldProps;

    if (type === 'hidden') {
      form.getFieldDecorator(field, {
        initialValue,
      })
      return null;
    }

    const {
      style = {},
      dense,
      extra,
      wrapperCol,
      labelCol,
      ...restFormItemProps
    } = formItemProps;

    const itemLayout = wrapperCol && labelCol ? { wrapperCol, labelCol } : null;
    let layout = itemLayout || globalLayout || defaultLayout;
    if (!itemLayout && !globalLayout && !restFormItemProps.label) {
      layout = {
        wrapperCol: { span: 24 }
      };
    }

    let inputComponent: any = <span className="ant-form-text">{initialValue}</span>;

    if (type !== 'plain') {
      const renderComponent = renderInputComponent({ type, component });
      inputComponent = (
        form.getFieldDecorator(field, {
          initialValue,
          valuePropName: setValuePropName(type),
          rules: setDefaultTypeRules(type, rules),
          ...restFieldProps,
        })(React.cloneElement(renderComponent, {
          ...commenProps(type, _get(renderComponent, 'props.style')),
          ...componentProps as any,
        }))
      )
    }

    return (
      <Form.Item
        key={field}
        style={dense ? { marginBottom: 0, ...style } : style}
        {...layout}
        extra={setExtra(extra, type)}
        {...restFormItemProps}
      >
        {inputComponent}
      </Form.Item>
    )
  }).filter(item => item !== null) as JSX.Element[];
};

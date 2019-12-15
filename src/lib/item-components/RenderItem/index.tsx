import React, { useContext } from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { Form, Input, InputNumber, Slider } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { defaultLayout } from '../../../defaultConfig';
import CustomDatePicker, { CustomRangePicker } from "../CustomDatePicker/index";
import CustomSwitch from "../CustomSwitch/index";
import CustomSelect from "../CustomSelect/index";
import LocationPicker from "../LocationPicker/index";
import PicturesWall from "../PicturesWall/index";
import CustomDragger from "../CustomDragger";
import CustomCheckGroup from "../CustomCheckGroup/index";
import CustomRadioGroup from "../CustomRadioGroup/index";
import {
  ComponentType,
  CustomFormItemProps,
  ItemConfig,
  Layout,
} from "../../props";
import { ConfigContext } from '../../../config-provider/context';
import setInitialValue from '../../setValue';
import { setValuePropName } from './utils';

const { TextArea, Password } = Input;

function setInputComponent(type: ComponentType) {
  switch (type) {
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

interface RenderItemProps {
  form: WrappedFormUtils,
  config: ItemConfig,
  formLayout?: Layout,
}
export default function RenderItem({ form, config, formLayout }: RenderItemProps) {
  const {
    setCommenProps,
    commenExtra,
    commenRules,
  } = useContext(ConfigContext)
  const { getFieldDecorator } = form;
  const {
    type = "string",
    field,
    formItemProps = {} as CustomFormItemProps,
    fieldProps = {},
    componentProps = {},
    component,
  } = config;
  const { rules = [], initialValue, normalize, ...restFieldProps } = fieldProps;
  const {
    style = {},
    dense,
    extra,
    wrapperCol,
    labelCol,
    ...restFormItemProps
  } = formItemProps;

  const setLayout = () => {
    const itemLayout = wrapperCol && labelCol ? { wrapperCol, labelCol } : null;
    const layout = itemLayout || formLayout || defaultLayout;
    const noLayoutAndLabel = !itemLayout && !formLayout && !restFormItemProps.label;
    return noLayoutAndLabel ? { wrapperCol: { span: 24 } } : layout;
  }

  const setComponent = () => {
    return type === 'custom' ? component : (
      React.cloneElement(
        setInputComponent(type),
        {
          ...setCommenProps(type, _get(setInputComponent(type), 'props.style')),
          ...componentProps as any,
        }
      )
    )
  }

  function setRules() {
    return [
      ...commenRules[type] || [],
      ...rules,
    ]
  }

  const setItemComponent = () => {
    return type === 'plain' ? <span className="ant-form-text">{initialValue}</span> : getFieldDecorator(field, {
      initialValue: setInitialValue(type, initialValue),
      valuePropName: setValuePropName(type),
      rules: setRules(),
      ...restFieldProps,
    })(setComponent());
  }

  function setExtra() {
    if (extra === false || extra === null) {
      return undefined;
    }
    return extra || commenExtra[type];
  }

  return (
    <Form.Item
      key={field}
      style={dense ? { marginBottom: 0, ...style } : style}
      extra={setExtra()}
      {...setLayout()}
      {...restFormItemProps}
    >
      {setItemComponent()}
    </Form.Item>
  );
}

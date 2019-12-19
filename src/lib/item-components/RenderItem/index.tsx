import React, { useContext } from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { Form } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { CustomFormItemProps, ItemConfig, Layout } from "../../props";
import { defaultLayout } from '../../../defaultConfig';
import { ConfigContext } from '../../../config-provider/context';
import setInitialValue from '../../setValue';
import componentMap from './map';
import { setValuePropName } from './utils';

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
    componentProps,
    component,
  } = config;
  const {
    rules = [],
    initialValue,
    normalize,
    ...restFieldProps
  } = fieldProps;
  const {
    style,
    dense,
    extra,
    wrapperCol,
    labelCol,
    ...restFormItemProps
  } = formItemProps;

  function setStyle() {
    return dense ? { marginBottom: 0, ...style } : style;
  }

  function setExtra() {
    if (extra === false || extra === null) { return undefined; }
    return extra || commenExtra[type];
  }

  function setLayout() {
    const itemLayout = wrapperCol && labelCol ? { wrapperCol, labelCol } : null;
    const layout = itemLayout || formLayout || defaultLayout;
    const noLayoutAndLabel = !itemLayout && !formLayout && !restFormItemProps.label;
    return noLayoutAndLabel ? { wrapperCol: { span: 24 } } : layout;
  }

  const [Component, props] = (componentMap[type] || componentMap.default)!;

  function createComponent() {
    if (type === 'custom') { return component; }
    return (
      React.createElement(Component, {
        ...props,
        ...setCommenProps(type, _get(props, 'style')),
        ...componentProps,
      })
    );
  }

  function setRules() {
    return [
      ...commenRules[type] || [],
      ...rules,
    ];
  }

  function createInputItem() {
    if (type === 'plain') { return <span className="ant-form-text">{initialValue}</span>; }
    return getFieldDecorator(field, {
      initialValue: setInitialValue(type, initialValue),
      valuePropName: setValuePropName(type),
      rules: setRules(),
      ...restFieldProps,
    })(createComponent());
  }

  return (
    <Form.Item
      key={field}
      style={setStyle()}
      extra={setExtra()}
      {...setLayout()}
      {...restFormItemProps}
    >
      {createInputItem()}
    </Form.Item>
  );
}

import React, { useContext } from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { Form } from "antd";
import { CustomFormItemProps, ItemConfig, Layout } from "../../props";
import { defaultLayout } from '../../../defaultConfig';
import { ConfigContext } from '../../../config-provider/context';
// import setInitialValue from '../../setValue';
import componentMap from './map';
import { setValuePropName } from './utils';

interface RenderItemProps extends ItemConfig {
  formLayout?: Layout,
}
export default ({
  formLayout,

  type = "string",
  field,
  formItemProps = {} as CustomFormItemProps,
  componentProps,
  component,
}: RenderItemProps) => {
  const { setCommenProps, commenExtra, commenRules } = useContext(ConfigContext);

  const {
    style,
    dense,
    extra,
    wrapperCol,
    labelCol,
    rules,
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

  if (type === 'plain') {
    return (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues[field] !== currentValues[field]}
      >
        {({ getFieldValue }) => (
          <Form.Item
            name={field}
            style={setStyle()}
            extra={setExtra()}
            {...setLayout()}
            {...restFormItemProps}
          >
            <div className="ant-form-text">{getFieldValue(field)}</div>
          </Form.Item>
        )}
      </Form.Item>
    )
  }

  const [itemComponent, props] = (componentMap[type] || componentMap.default)!;

  function createElement() {
    if (type === 'custom') { return component; }
    return (
      React.createElement(itemComponent, {
        ...props,
        ...setCommenProps(type, _get(props, 'style')),
        ...componentProps,
      })
    );
  }

  function setRules() {
    return [
      ...commenRules[type] || [],
      ...rules || [],
    ];
  }

  return (
    <Form.Item
      key={field}
      name={field}
      style={setStyle()}
      extra={setExtra()}
      {...setLayout()}
      {...restFormItemProps}
      valuePropName={setValuePropName(type)}
      rules={setRules()}
    >
      {createElement()!}
    </Form.Item>
  );
}

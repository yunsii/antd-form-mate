import React, { useContext } from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { Form } from "antd";
import { FormInstance } from "antd/lib/form";
import { CustomFormItemProps, ItemConfig, Layout } from "../../props";
import { defaultLayout } from '../../../defaultConfig';
import { ConfigContext } from '../../../config-context/context';
// import setInitialValue from '../../setValue';
import getComponent from './map';
import { setValuePropName } from './utils';

interface RenderItemProps extends ItemConfig {
  formLayout?: Layout,
}
const RenderItem: React.FC<RenderItemProps> = ({
  formLayout,

  type = "string",
  formItemProps = {} as CustomFormItemProps,
  componentProps,
  component,
  generateFn,
  name,
}) => {
  const { setCommonProps, commonExtra, commonRules } = useContext(ConfigContext);

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
    return extra || commonExtra[type];
  }

  function setLayout() {
    const itemLayout = wrapperCol && labelCol ? { wrapperCol, labelCol } : null;
    const layout = itemLayout || formLayout || defaultLayout;
    const noLayoutAndLabel = !itemLayout && !formLayout && !restFormItemProps.label;
    return noLayoutAndLabel ? { wrapperCol: { span: 24 } } : layout;
  }

  if (type === 'dynamic') {
    return (
      <Form.Item
        noStyle
        shouldUpdate={restFormItemProps.shouldUpdate}
      >
        {generateFn ?
          ((form: FormInstance) => {
            const generateConfig = generateFn(form);
            if (!generateConfig) { return null; }
            return (
              <RenderItem
                {...generateConfig}
                name={name}
                formLayout={formLayout}
              />
            );
          }) as any : component!}
      </Form.Item>
    )
  }

  if (type === 'plain') {
    return (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => _get(prevValues, name!) !== _get(currentValues, name!)}
      >
        {({ getFieldValue }: FormInstance) => {
          return (
            <Form.Item
              name={name}
              style={setStyle()}
              extra={setExtra()}
              {...setLayout()}
              {...restFormItemProps}
            >
              <div className="ant-form-text">{getFieldValue(name!)}</div>
            </Form.Item>
          )
        }}
      </Form.Item>
    )
  }

  const typedComponent = getComponent(type);

  function createElement() {
    if (type === 'custom') { return component; }
    return (
      React.cloneElement(typedComponent, {
        ...setCommonProps(type, _get(typedComponent.props, 'style')),
        ...componentProps,
      })
    );
  }

  function setRules() {
    return [
      ...commonRules[type] || [],
      ...rules || [],
    ];
  }

  return (
    <Form.Item
      name={name}
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

export default RenderItem;

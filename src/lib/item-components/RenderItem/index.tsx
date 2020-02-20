import React, { useContext } from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import _find from 'lodash/find';
import { Form } from "antd";
import { FormInstance } from "antd/lib/form";
import { CustomFormItemProps, ItemConfig, Layout, WithCol } from "../../props";
import { defaultItemLayout } from '../../../default-config';
import { ConfigContext } from '../../../config-context/context';
// import setInitialValue from '../../setValue';
import getComponent from '../../map';
import { setValuePropName } from './utils';
import { renderCol } from '../../utils';
import { useIntl } from '../../../intl-context';

interface RenderItemProps {
  config: ItemConfig;
  formLayout?: Layout;
  withCol?: WithCol;
}
const RenderItem: React.FC<RenderItemProps> = ({
  config: {
    type = "string",
    formItemProps = {} as CustomFormItemProps,
    componentProps,
    component,
    generateFn,
    name,
  },
  formLayout,
  withCol,
}) => {
  const intl = useIntl();
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
    const layout = itemLayout || formLayout || defaultItemLayout;
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

            const wrapperConfig = {
              name,
              ...generateConfig
            }
            const formItem = (
              <RenderItem
                config={wrapperConfig}
                formLayout={formLayout}
              />
            );
            return renderCol(wrapperConfig, withCol)(formItem);
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
    let result = [
      ...commonRules[type] || [],
      ...rules || [],
    ]

    if (restFormItemProps.required && !_find(result, { required: true })) {
      result = [
        {
          required: true,
          message: `${restFormItemProps.label} ${intl.getMessage('message.isRequired', '必填')}`,
        },
        ...result,
      ]
    }

    return result;
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

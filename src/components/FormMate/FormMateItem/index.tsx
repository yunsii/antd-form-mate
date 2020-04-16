import React, { useContext } from 'react';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import _find from 'lodash/find';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormItemProps } from 'antd/lib/form/FormItem';

import { FormMateItemProps, ComponentType } from '../../../interfaces';
import { ConfigContext } from '../../../contexts/ConfigContext/context';
import { useIntl } from '../../../contexts/Intlcontext';
// import { renderCol } from '../../FormMate/utils';
import getComponent from '../../../map';
import { FormMateItemDisplayName } from '../../../constants/components';
import { setValuePropName } from './utils';

const FormMateItem = <T, P = {}>({
  type = 'string',
  name,
  componentProps,
  children,
  ...restFormItemProps
}: FormMateItemProps<T, P>) => {
  const intl = useIntl();
  const { setCommonProps, commonExtra, commonRules } = useContext(ConfigContext);

  const { style, dense, extra, wrapperCol, labelCol, rules, ...rest } = restFormItemProps;

  function setStyle() {
    return dense ? { marginBottom: 0, ...style } : style;
  }

  if (!name) {
    /** 如果没有 `name` ，尚可使用 `dense` 属性 */
    return (
      <Form.Item style={setStyle()} {...restFormItemProps}>
        {children}
      </Form.Item>
    );
  }

  function setExtra() {
    if (extra === false || extra === null) {
      return undefined;
    }
    return extra || commonExtra[type as ComponentType];
  }

  if (type === 'plain') {
    return (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => _get(prevValues, name!) !== _get(currentValues, name!)}
      >
        {({ getFieldValue }: FormInstance) => {
          return (
            <Form.Item name={name} style={setStyle()} extra={setExtra()} {...rest}>
              <div className='ant-form-text'>{getFieldValue(name!)}</div>
            </Form.Item>
          );
        }}
      </Form.Item>
    );
  }

  const typedComponent = getComponent(type as ComponentType) as JSX.Element;

  function createElement(): FormItemProps['children'] {
    if (type === 'custom') {
      return children;
    }
    return React.cloneElement(typedComponent, {
      ...setCommonProps(type as ComponentType, _get(typedComponent.props, 'style')),
      ...componentProps,
    }) as FormItemProps['children'];
  }

  function setRules() {
    let result = [...(commonRules[type as any] || []), ...(rules || [])];

    if (rest.required && !_find(result, { required: true })) {
      result = [
        {
          required: true,
          message: `${rest.label} ${intl.getMessage('message.isRequired', '必填')}`,
        },
        ...result,
      ];
    }

    return result;
  }

  return (
    <Form.Item
      name={name}
      style={setStyle()}
      extra={setExtra()}
      {...rest}
      valuePropName={setValuePropName(type as ComponentType)}
      rules={setRules()}
    >
      {createElement()}
    </Form.Item>
  );
};

FormMateItem.displayName = FormMateItemDisplayName;

export default FormMateItem;

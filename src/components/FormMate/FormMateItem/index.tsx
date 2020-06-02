import React, { useContext } from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormItemProps } from 'antd/lib/form/FormItem';

import { FormMateItemProps, ComponentType } from '../../../interfaces';
import { ConfigContext } from '../../../contexts/ConfigContext/context';
import FormMateContext from '../../../contexts/FormMateContext';
import { useIntl } from '../../../contexts/Intlcontext';
import getComponent from '../../../map';
import { FormMateItemDisplayName } from '../../../constants/components';
import { setValuePropName } from './utils';
import defaultPlainRender from '../../../utils/plainRender';

const FormMateItem = <T, P = {}>({
  type = 'string',
  name,
  componentProps,
  children,
  ...restFormItemProps
}: FormMateItemProps<T, P>) => {
  const intl = useIntl();
  const { setCommonProps, commonExtra, commonRules } = useContext(ConfigContext);
  const { type: contextType, plainRender } = useContext(FormMateContext);

  const { style, dense, extra, rules, ...rest } = restFormItemProps;

  function getType() {
    return (contextType || type) as ComponentType;
  }

  function getStyle() {
    return dense ? { marginBottom: 0, ...style } : style;
  }

  if (!name) {
    /** 如果没有 `name` ，尚可使用 `dense` 属性 */
    return (
      <Form.Item style={getStyle()} {...restFormItemProps}>
        {children}
      </Form.Item>
    );
  }

  function setExtra() {
    if (extra === false || extra === null) {
      return undefined;
    }
    return extra || commonExtra[getType()];
  }

  if (getType() === 'plain') {
    return (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => _get(prevValues, name!) !== _get(currentValues, name!)}
      >
        {({ getFieldValue }: FormInstance) => {
          const itemValue = getFieldValue(name!);

          const _plainRender = () => {
            /** 自定义组件时，注入 `__renderType__` 属性，考虑不周，谨慎使用 */
            if (type === 'custom' && React.isValidElement(children)) {
              return React.cloneElement(children, {
                __renderType__: 'plain',
              });
            }

            /** 优先使用自定义渲染 */
            const result = plainRender && plainRender(type as ComponentType, itemValue, (componentProps = {}));

            if (result) {
              return result;
            }

            return defaultPlainRender(type as any, itemValue, componentProps || {});
          };
          return (
            <Form.Item name={name} style={getStyle()} extra={setExtra()} {...rest}>
              <div className='ant-form-text'>{_plainRender()}</div>
            </Form.Item>
          );
        }}
      </Form.Item>
    );
  }

  const useCommonStyle = () => {
    if (getType() === 'switch') {
      return false;
    }
    // if (children) {
    //   return false;
    // }
    return true;
  };

  const typedComponent = getComponent(getType()) as JSX.Element;

  function createElement(): FormItemProps['children'] {
    if (getType() === 'custom') {
      return children;
    }
    return React.cloneElement(typedComponent, {
      ...setCommonProps(getType(), _get(typedComponent.props, 'style'), useCommonStyle()),
      ...componentProps,
    }) as FormItemProps['children'];
  }

  function setRules() {
    let result = [...(commonRules[getType()] || []), ...(rules || [])];

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
      style={getStyle()}
      extra={setExtra()}
      {...rest}
      valuePropName={setValuePropName(getType())}
      rules={setRules()}
    >
      {createElement()}
      {/* {children} */}
    </Form.Item>
  );
};

FormMateItem.displayName = FormMateItemDisplayName;

export default FormMateItem;

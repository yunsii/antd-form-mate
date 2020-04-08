import React from 'react';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import _keys from 'lodash/keys';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form';

import FormMateContext from '../../contexts/FormMateContext';
import { FormMateDynamicDisplayName } from '../../constants/components';
import { getChildName } from './utils';
import setInitialValue from '../../utils/setValue';
// import { setInitialValue } from './setValue';

export interface FormMateProps extends FormProps {
  renderChildren?: (children: React.ReactNode) => React.ReactNode;
  /** item: 渲染子节点，name: 子节点组件名称，通常为 `FormMateItem` */
  renderItem?: (item: React.ReactNode, name: string | null) => React.ReactNode;
}

export const FormMate = (props: FormMateProps) => {
  const { initialValues, renderChildren, renderItem, children, ...rest } = props;

  const fieldsType = {};

  const renderItems = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.props.name) {
      fieldsType[child.props.name] = child.props.type;
    }

    // 如果为动态类型字段，默认隐藏，显示的时候再调用 `renderItem` ，通过 `FormMateContext` 实现
    if (getChildName(child) === FormMateDynamicDisplayName) {
      return child;
    }
    return renderItem ? renderItem(child, getChildName(child)) : child;
  });

  const processInitialValues = () => {
    const result = {};
    _keys(initialValues).forEach((item) => {
      result[item] = setInitialValue(fieldsType[item], initialValues?.[item]);
    });
    return result;
  };

  return (
    <FormMateContext.Provider
      value={{
        renderItem,
      }}
    >
      <Form initialValues={processInitialValues()} {...rest}>
        {renderChildren ? renderChildren(renderItems) : children}
      </Form>
    </FormMateContext.Provider>
  );
};

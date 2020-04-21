import React from 'react';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import _keys from 'lodash/keys';
import { Form } from 'antd';

import FormMateContext from '../../contexts/FormMateContext';
import { FormMateItemDisplayName, FormMateDynamicDisplayName } from '../../constants/components';
import { getChildName } from './utils';
import setInitialValue from '../../utils/setValue';
import { FormMateProps } from '../../interfaces';

function isFormItem(child: React.ReactNode): child is JSX.Element {
  return (
    React.isValidElement(child) && [FormMateItemDisplayName, FormMateDynamicDisplayName].includes(getChildName(child))
  );
}

const isFormDynamic = (child: React.ReactNode) => {
  return React.isValidElement(child) && FormMateDynamicDisplayName === getChildName(child);
};

export const FormMate = (props: FormMateProps) => {
  const { initialValues, renderChildren, renderItem, children, postInitialValues, ...rest } = props;

  const fieldsType = {};

  const renderItems = React.Children.map(children, (child) => {
    if (isFormItem(child)) {
      fieldsType[child.props.name] = child.props.type;

      // 如果为动态类型字段，默认隐藏，显示的时候再调用 `renderItem` ，通过 `FormMateContext` 实现
      if (isFormDynamic(child)) {
        return child;
      }
    }

    // TODO: loop is FormMateWrapper to set fieldsType;
    return renderItem ? renderItem(child, getChildName(child)) : child;
  });

  const processInitialValues = () => {
    const result = {};
    _keys(initialValues).forEach((item) => {
      result[item] = setInitialValue(fieldsType[item], initialValues?.[item]);
    });
    return postInitialValues?.(result) || result;
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

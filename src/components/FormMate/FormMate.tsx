import React from 'react';
import { Form, Row, Col } from 'antd';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import _keys from 'lodash/keys';

import FormMateContext from '../../contexts/FormMateContext';
import { isFormItem, isFormDynamic, getFormItemName } from './utils';
import setInitialValue from '../../utils/setValue';
import { FormMateProps, FormMateItemProps } from '../../interfaces';

export const FormMate = (props: FormMateProps) => {
  const { initialValues, renderChildren, renderItem, children, postInitialValues, grid, ...rest } = props;

  const _renderChildren = grid ? (_children: React.ReactNode) => <Row {...grid.row}>{_children}</Row> : renderChildren;
  const _renderItem = grid
    ? (child: React.ReactNode, name: FormMateItemProps['name']) => (
        <Col {...(_isFunction(grid.col) ? grid.col(name) : grid.col)}>{child}</Col>
      )
    : renderItem;

  const fieldsType = {};

  const renderItems = React.Children.map(children, (child) => {
    if (isFormItem(child)) {
      fieldsType[child.props.name] = child.props.type;
    }

    // 如果为动态类型字段，默认隐藏，显示的时候再调用 `renderItem` ，通过 `FormMateContext` 实现
    if (isFormDynamic(child)) {
      return child;
    }

    return _renderItem ? _renderItem(child, getFormItemName(child)) : child;
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
        renderItem: _renderItem,
      }}
    >
      <Form initialValues={processInitialValues()} {...rest}>
        {_renderChildren ? _renderChildren(renderItems) : children}
      </Form>
    </FormMateContext.Provider>
  );
};

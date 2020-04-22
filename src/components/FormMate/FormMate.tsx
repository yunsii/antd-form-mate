import React, { useRef } from 'react';
import { Form, Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import _keys from 'lodash/keys';

import FormMateContext from '../../contexts/FormMateContext';
import { isFormItem, isFormDynamic, getFormItemName, Store, processInitialValues } from './utils';
import { FormMateProps, FormMateItemProps, FormMateInstance } from '../../interfaces';

export const FormMate = React.forwardRef<FormMateInstance, FormMateProps>((props, ref) => {
  const { initialValues, renderChildren, renderItem, children, postInitialValues, grid, form, ...rest } = props;
  const [internalForm] = Form.useForm(form);
  const formRef = useRef<FormInstance>(null);

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

  const processedInitialValues = initialValues && processInitialValues(initialValues, fieldsType, postInitialValues);

  const storeRef = useRef<FormMateProps['initialValues']>(processedInitialValues);

  React.useImperativeHandle(
    ref,
    () =>
      ({
        ...formRef.current,

        setInitialValue: (values: Store) => {
          if (storeRef.current) {
            return;
          }

          const store = processInitialValues(values, fieldsType, postInitialValues);
          internalForm.setFieldsValue(store);

          storeRef.current = store;
        },
        resetFieldsValue: () => {
          internalForm.setFieldsValue(storeRef.current || {});
        },
      } as any)
  );

  return (
    <FormMateContext.Provider
      value={{
        renderItem: _renderItem,
      }}
    >
      <Form ref={formRef} form={internalForm} initialValues={processedInitialValues} {...rest}>
        {_renderChildren ? _renderChildren(renderItems) : children}
      </Form>
    </FormMateContext.Provider>
  );
});

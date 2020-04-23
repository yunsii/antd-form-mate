import React, { useRef, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';

import { INTERNAL_HOOK_MARK } from '../../constants/components';
import FormMateContext from '../../contexts/FormMateContext';
import { isFormItem, isFormDynamic, getFormItemName, useFormMate } from './utils';
import { FormMateProps, FormMateItemProps, FormMateInstance, InternalFormMateInstance } from '../../interfaces';

export const FormMate = React.forwardRef<FormMateInstance, FormMateProps>((props, ref) => {
  const { initialValues, renderChildren, renderItem, children, postInitialValues, grid, formMate, ...rest } = props;
  const [internalForm] = useFormMate(formMate);
  const formRef = useRef<FormInstance>(null);

  const _renderChildren = grid ? (_children: React.ReactNode) => <Row {...grid.row}>{_children}</Row> : renderChildren;
  const _renderItem = grid
    ? (child: React.ReactNode, name: FormMateItemProps['name']) => (
      <Col {...(typeof grid.col === 'function' ? grid.col(name) : grid.col)}>{child}</Col>
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

  const { setFieldsType, setPostProcess } = (internalForm as InternalFormMateInstance).getFormMateInternalHook(
    INTERNAL_HOOK_MARK
  )!;

  setFieldsType(fieldsType);
  if (postInitialValues) {
    setPostProcess(postInitialValues);
  }

  useEffect(() => {
    initialValues && internalForm.setInitialValues(initialValues);
  }, []);

  React.useImperativeHandle(ref, () => internalForm);

  return (
    <FormMateContext.Provider
      value={{
        renderItem: _renderItem,
      }}
    >
      <Form ref={formRef} form={internalForm} {...rest}>
        {_renderChildren ? _renderChildren(renderItems) : children}
      </Form>
    </FormMateContext.Provider>
  );
});

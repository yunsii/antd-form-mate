import React, { useRef } from 'react';
import { Form, Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';

import { INTERNAL_HOOK_MARK } from '../../constants/components';
import FormMateContext from '../../contexts/FormMateContext';
import {
  isFormItem,
  isFormDynamic,
  getFormItemName,
  useFormMate,
} from './utils';
import {
  FormMateProps,
  FormMateItemProps,
  FormMateInstance,
  InternalFormMateInstance,
} from '../../interfaces';

export const FormMate = React.forwardRef<FormMateInstance, FormMateProps>(
  (props, ref) => {
    const {
      renderChildren,
      renderItem,
      children,
      postInitialValues,
      grid,
      formMate,
      type,
      plainRender,
      ...rest
    } = props;
    const [internalForm] = useFormMate(formMate);
    const formRef = useRef<FormInstance>(null);

    const _renderChildren = grid
      ? (_children: React.ReactNode) => <Row {...grid.row}>{_children}</Row>
      : renderChildren;
    const _renderItem = (() => {
      if (grid) {
        return (
          child: React.ReactNode,
          name: FormMateItemProps['name'],
          index: number
        ) => {
          if (typeof grid.col === 'function') {
            /** 如果 grid.col 函数无返回值，直接渲染 child ，可避免渲染无效节点与 Col 组件结合占位 */
            if (grid.col(child, name, index)) {
              return <Col {...grid.col(child, name, index)}>{child}</Col>;
            }
            return child;
          }
          return <Col {...grid.col}>{child}</Col>;
        };
      }
      return renderItem;
    })();

    const fieldsType = {};
    const formItems = React.Children.map(children, (child, index) => {
      if (isFormItem(child) && child.props.name) {
        fieldsType[child.props.name] = child.props.type;
      }

      // 如果为动态类型字段，默认隐藏，显示的时候再调用 `renderItem` ，通过 `FormMateContext` 实现
      if (isFormDynamic(child)) {
        return child;
      }

      return _renderItem
        ? _renderItem(child, getFormItemName(child), index)
        : child;
    });

    const {
      setFieldsType,
      setPostProcess,
    } = (internalForm as InternalFormMateInstance).getFormMateInternalHook(
      INTERNAL_HOOK_MARK
    )!;

    setFieldsType(fieldsType);
    if (postInitialValues) {
      setPostProcess(postInitialValues);
    }

    React.useImperativeHandle(ref, () => internalForm);

    return (
      <FormMateContext.Provider
        value={{
          renderItem: _renderItem,
          type,
          plainRender,
        }}
      >
        <Form ref={formRef} form={internalForm} {...rest}>
          {_renderChildren ? _renderChildren(formItems) : formItems}
        </Form>
      </FormMateContext.Provider>
    );
  }
);

import React from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form';

import RenderItem from "../RenderItem";
import FormMateItem from './FormMateItem';
import { ItemConfig, Layout, WithCol } from "../../interfaces";
import { renderCol } from './utils';
// import { setInitialValue } from './setValue';

const createFormItems = (
  itemsConfig: ItemConfig[],
  formLayout?: Layout,
  withCol?: WithCol,
) => (
    itemsConfig.map((config) => {
      const formItem = (
        <RenderItem
          key={`${config.name}`}
          formLayout={formLayout}
          config={config}
          withCol={withCol}
        />
      )

      return renderCol(config, withCol)(formItem);
    })
  );

export default createFormItems;

function getChildName(child: React.ReactNode) {
  if (React.isValidElement(child) && !_isString(child)) {
    if (_isString(child.type)) { return child.type; }

    return child.type.name;
  }
  return null;
}

function getChildType(child: React.ReactNode) {
  if (React.isValidElement(child) && !_isString(child)) {
    return child.props.type;
  }
  return null;
}

export interface FormMateProps extends FormProps {
  // items: ItemConfig[];
  // itemsLayout?: Layout;
  // withCol?: WithCol;
  renderChildren?: (children: React.ReactNode) => React.ReactNode;
  renderItem?: (item: React.ReactNode, name: string | null) => React.ReactNode;
}

export const FormMate = (props: FormMateProps) => {
  const {
    initialValues,
    // items,
    // itemsLayout,
    // withCol,
    renderChildren,
    renderItem,
    children,
    ...rest
  } = props;

  const renderItems = React.Children.map(children, (child) => {
    // TODO: 动态展示的字段需要在显示的时候调用 renderItem ，初步估计通过 Context 实现
    if (getChildType(child) === 'dynamic') {
      return child;
    }
    return renderItem ? renderItem(child, getChildName(child)) : child;
  });

  return (
    <Form
      initialValues={initialValues}  // TODO: setInitialValue
      {...rest}
    >
      {renderChildren ? renderChildren(renderItems) : children}
    </Form>
  )
}

FormMate.useForm = Form.useForm;
FormMate.Item = FormMateItem;
// FormMate.List = Form.List;
FormMate.Provider = Form.Provider;
FormMate.create = Form.create;

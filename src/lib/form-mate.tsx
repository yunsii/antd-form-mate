import React from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { WrappedFormUtils } from "antd/lib/form/Form";
import RenderItem from "./item-components/RenderItem";
import { ItemConfig, Layout } from "./props";

export const createFormItems = (form: WrappedFormUtils) => (
  itemsConfig: ItemConfig[],
  formLayout?: Layout,
) => {
  const { getFieldDecorator } = form || {} as any;
  if (!_isFunction(getFieldDecorator)) { throw new TypeError('GetFieldDecorator is not function.'); }

  return itemsConfig.map(config => {
    const {
      type = "string",
      field,
      fieldProps = {},
    } = config;
    const { initialValue } = fieldProps;

    if (type === 'hidden') {
      getFieldDecorator(field, { initialValue });
      return null;
    }

    return (
      <RenderItem
        key={field}
        form={form}
        config={config}
        formLayout={formLayout}
      />
    )
  }).filter(item => item) as JSX.Element[];
};

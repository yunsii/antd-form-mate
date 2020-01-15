import React from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { WrappedFormUtils } from "antd/lib/form/Form";
import RenderItem from "./item-components/RenderItem";
import { ItemConfig, Layout } from "./props";

export default (form: WrappedFormUtils) => (
  itemsConfig: ItemConfig[],
  formLayout?: Layout,
) => {
  if (!_isFunction(_get(form, 'getFieldDecorator'))) { throw new TypeError('GetFieldDecorator is not function.'); }
  const { getFieldDecorator } = form;

  return itemsConfig.map(config => {
    const {
      type = "string",
      field,
      fieldProps,
    } = config;

    if (type === 'hidden') {
      getFieldDecorator(field, { initialValue: _get(fieldProps, 'initialValue') });
      return null;
    }

    return (
      <RenderItem
        key={field}
        form={form}
        formLayout={formLayout}
        {...config}
      />
    )
  }).filter(item => item) as JSX.Element[];
};

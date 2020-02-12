import React from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import RenderItem from "./item-components/RenderItem";
import { ItemConfig, Layout } from "./props";

export default (
  itemsConfig: ItemConfig[],
  formLayout?: Layout,
) => {
  return itemsConfig.map(config => {
    const {
      field,
    } = config;

    return (
      <RenderItem
        key={field}
        formLayout={formLayout}
        {...config}
      />
    )
  }).filter(item => item) as JSX.Element[];
};

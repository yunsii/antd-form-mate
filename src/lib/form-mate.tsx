import React from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import RenderItem from "./item-components/RenderItem";
import { ItemConfig, Layout } from "./props";

export default (
  itemsConfig: ItemConfig[],
  formLayout?: Layout,
) => (
    itemsConfig.map((config) => {
      return (
        <RenderItem
          key={`${config.name}`}
          formLayout={formLayout}
          {...config}
        />
      )
    })
  );

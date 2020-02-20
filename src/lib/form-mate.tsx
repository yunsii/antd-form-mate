import React from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import RenderItem from "./item-components/RenderItem";
import { ItemConfig, Layout, WithCol } from "./props";
import { renderCol } from './utils';

export default (
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

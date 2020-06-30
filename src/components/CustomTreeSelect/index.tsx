import React, { forwardRef } from 'react';
import { TreeSelect } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { TreeNodeProps } from 'rc-tree-select/lib/TreeNode';
import { TreeSelectProps } from 'antd/lib/tree-select';

import { cloneElement } from '../../utils/reactNode';

import AddonWrapper from '../AddonWrapper';
import styles from './index.less';

export interface CustomTreeSelectProps extends Omit<TreeSelectProps<any>, 'options'> {
  options?: TreeNodeProps[];
  addonAfter?: React.ReactNode;
  onReload?: () => void;
}

export default forwardRef<TreeSelect<any>, CustomTreeSelectProps>((props, ref) => {
  const { options, addonAfter, onReload, ...rest } = props;

  const renderOptions = (items: TreeNodeProps[]) => {
    return items.map((item) => {
      const { options, value, label, ...itemRest } = item;
      if (options) {
        return (
          <TreeSelect.TreeNode key={`${item.label}`} value={value} title={item.label} {...itemRest}>
            {renderOptions(options)}
          </TreeSelect.TreeNode>
        );
      }

      return <TreeSelect.TreeNode key={item.value} value={value} title={item.label} {...itemRest} />;
    });
  };

  const renderSelect = () => (
    <TreeSelect {...rest} ref={ref}>
      {options && renderOptions(options)}
    </TreeSelect>
  );

  if (!onReload) {
    return renderSelect();
  }

  return (
    <AddonWrapper addonAfter={addonAfter || <ReloadOutlined onClick={onReload} />}>
      {cloneElement(renderSelect(), { className: styles['addon-tree-select'] })}
    </AddonWrapper>
  );
});

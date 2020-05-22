import React, { forwardRef } from 'react';
import { Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { SelectProps } from 'antd/lib/select';
import { OptionsType } from 'rc-select/lib/interface';
import { cloneElement } from '../../utils/reactNode';

import AddonWrapper from '../AddonWrapper';
import styles from './index.less';

export interface CustomSelectProps extends SelectProps<any> {
  options?: OptionsType;
  addonAfter?: React.ReactNode;
  onReload?: () => void;
}

export default forwardRef<Select, CustomSelectProps>((props, ref) => {
  const { options, addonAfter, onReload, ...rest } = props;

  const renderOptions = (items: OptionsType) => {
    return items.map((item) => {
      const { options, ...itemRest } = item;
      if (options) {
        return (
          <Select.OptGroup key={`${item.label}`} {...itemRest}>
            {renderOptions(options)}
          </Select.OptGroup>
        );
      }

      return (
        <Select.Option key={item.value} value={item.value} {...itemRest}>
          {item.label}
        </Select.Option>
      );
    });
  };

  const renderSelect = () => (
    <Select {...rest} ref={ref}>
      {options && renderOptions(options)}
    </Select>
  );

  if (!onReload) {
    return renderSelect();
  }

  return (
    <AddonWrapper
      addonAfter={
        addonAfter || (
          <ReloadOutlined onClick={onReload} />
        )
      }
    >
      {cloneElement(renderSelect(), { className: styles['addon-select'] })}
    </AddonWrapper>
  );
});

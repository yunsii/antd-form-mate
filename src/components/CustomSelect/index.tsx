import React, { forwardRef } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { OptionsType } from 'rc-select/lib/interface';

export interface CustomSelectProps extends SelectProps<any> {
  options?: OptionsType;
}

export default forwardRef<Select, CustomSelectProps>((props, ref) => {
  const { options, ...rest } = props;

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

  return (
    <Select {...rest} ref={ref}>
      {options && renderOptions(options)}
    </Select>
  );
});

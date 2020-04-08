import React, { forwardRef } from 'react';
import { Select, Spin } from 'antd';
import { OptionsType } from 'rc-select/lib/interface';

export interface CustomSelectProps {
  options?: OptionsType;
  disabledStyle?: React.CSSProperties;
  loading?: boolean;
  style?: React.CSSProperties;
  placeholder?: string;
}

export default forwardRef<Select, CustomSelectProps>((props, ref) => {
  const { options, loading, disabledStyle = { backgroundColor: 'rgba(0, 0, 0, 0.25)' }, ...rest } = props;

  const renderOptions = (items: OptionsType) => {
    return items.map((item) => {
      const { options, ...rest } = item;
      if (options) {
        return (
          <Select.OptGroup label={item.label} key={`${item.label}`} {...rest}>
            {renderOptions(options)}
          </Select.OptGroup>
        );
      }

      return (
        <Select.Option
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          {...rest}
          style={item.disabled ? disabledStyle : {}}
        >
          {item.label}
        </Select.Option>
      );
    });
  };

  return (
    <Spin spinning={loading || false}>
      <Select {...rest} ref={ref}>
        {options && renderOptions(options)}
      </Select>
    </Spin>
  );
});

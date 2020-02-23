import React, { forwardRef } from "react";
import { Select, Spin } from "antd";
import { OptionProps } from 'rc-select/lib/Option';
import { OptGroupProps } from 'rc-select/lib/OptGroup';

export interface CustomSelectProps {
  groupOptions?: OptGroupProps[];
  options?: OptionProps[];
  disabledStyle?: React.CSSProperties;
  loading?: boolean;
  style?: React.CSSProperties;
  placeholder?: string;
}

export default forwardRef<Select, CustomSelectProps>((props, ref) => {
  const {
    options,
    groupOptions,
    loading,
    disabledStyle = { backgroundColor: "rgba(0, 0, 0, 0.25)" },
    ...rest
  } = props;

  const renderOptions = (items: OptionProps[]) => (
    items.map(item => (
      <Select.Option
        key={item.value}
        value={item.value}
        disabled={item.disabled}
        style={item.disabled ? disabledStyle : {}}
      >
        {item.label}
      </Select.Option>
    ))
  )

  return (
    <Spin spinning={loading || false}>
      <Select
        {...rest}
        ref={ref}
      >
        {groupOptions && groupOptions.map(item => {
          return (
            <Select.OptGroup label={item.label} key={item.label}>
              {renderOptions(item.options)}
            </Select.OptGroup>
          )
        })}
        {options && renderOptions(options)}
      </Select>
    </Spin>
  );
})

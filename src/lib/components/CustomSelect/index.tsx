import React, { PureComponent } from "react";
import { Select, Spin } from "antd";

const { Option } = Select;

export type Option = {
  text: any;
  value: any;
  disabled?: boolean;
}

export type GroupOption = {
  text: any;
  options: Option[],
}

export interface CustomSelectProps {
  groupOptions?: GroupOption[];
  options?: Option[];
  disabledStyle?: React.CSSProperties;
  loading?: boolean;
}

class CustomSelect extends PureComponent<CustomSelectProps> {
  render() {
    const {
      options,
      groupOptions,
      loading,
      disabledStyle = { backgroundColor: "rgba(0, 0, 0, 0.25)" },
      ...rest
    } = this.props;

    const renderOptions = (items: Option[]) => (
      items.map(item => (
        <Option
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          style={item.disabled ? disabledStyle : {}}
        >
          {item.text}
        </Option>
      ))
    )

    return (
      <Spin spinning={loading || false}>
        <Select
          placeholder="请选择"
          {...rest}
        >
          {groupOptions && groupOptions.map(item => {
            return (
              <Select.OptGroup label={item.text} key={item.text}>
                {renderOptions(item.options)}
              </Select.OptGroup>
            )
          })}
          {options && renderOptions(options)}
        </Select>
      </Spin>
    );
  }
}

export default CustomSelect;

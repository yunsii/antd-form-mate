import React, { PureComponent } from "react";
import { Select, Spin } from "antd";

const { Option } = Select;

export type Option = {
  text: any;
  value: any;
  [k: string]: any;
}
export interface CustomSelectProps {
  options: Option[],
  loading?: boolean;
}

class CustomSelect extends PureComponent<CustomSelectProps> {
  render() {
    const {
      options,
      loading,
      ...rest
    } = this.props;
    const disabledStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.25)"
    };
    return (
      <Spin spinning={loading || false}>
        <Select
          placeholder="请选择"
          {...rest}
        >
          {options &&
            options.map(item => (
              <Option
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                style={item.disabled ? disabledStyle : {}}
              >
                {item.text}
              </Option>
            ))}
        </Select>
      </Spin>
    );
  }
}

export default CustomSelect;

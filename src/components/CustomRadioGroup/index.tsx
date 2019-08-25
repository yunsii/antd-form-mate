import React from 'react';
import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio';
import { CheckboxOptionType } from 'antd/lib/checkbox';

export interface Option extends CheckboxOptionType {
  key?: any;
  label: never
  text: string;
}

export interface CustomRadioGroupProps extends RadioGroupProps {
}

export default class CustomRadioGroup extends React.Component<CustomRadioGroupProps> {
  render() {
    const { options = [], ...rest } = this.props;
    return (
      <Radio.Group {...rest}>
        {options && (options as Option[]).map((item) => {
          const { value, ...rest } = item;
          return (
            <Radio key={item.value} value={item.value} {...rest}>{item.text}</Radio>
          )
        })}
      </Radio.Group>
    )
  }
}

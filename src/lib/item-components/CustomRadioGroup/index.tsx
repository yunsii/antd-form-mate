import React from 'react';
import { Radio, Row, Col } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio';
import { CheckboxOptionType } from 'antd/lib/checkbox';

export interface Option extends CheckboxOptionType {
  key?: any;
  label: never
  text: string;
}

export interface CustomRadioGroupProps extends RadioGroupProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
}

export default class CustomRadioGroup extends React.Component<CustomRadioGroupProps> {
  render() {
    const { cols, options = [], ...rest } = this.props;
    if (!cols) {
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
    const span = 24 / cols;
    return (
      <Radio.Group {...rest}>
        <Row>
          {options && (options as Option[]).map((item) => {
            const { value, ...rest } = item;
            return (
              <Col key={`${item.value}`} span={span}>
                <Radio value={item.value} {...rest}>{item.text}</Radio>
              </Col>
            )
          })}
        </Row>
      </Radio.Group>
    )
  }
}

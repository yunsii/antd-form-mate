import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import { CheckboxGroupProps, CheckboxOptionType } from 'antd/lib/checkbox';

export interface Option extends CheckboxOptionType {
  label: never;
  text: string;
}

export interface CustomCheckGroupProps extends CheckboxGroupProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
}

export default class CustomCheckGroup extends React.Component<CustomCheckGroupProps> {
  render() {
    const { cols, options = [], ...rest } = this.props;
    if (!cols) {
      return (
        <Checkbox.Group {...rest}>
          {options && (options as Option[]).map((item) => {
            const { value, ...itemRest } = item;
            return <Checkbox key={`${item.value}`} value={item.value} {...itemRest}>{item.text}</Checkbox>
          })}
        </Checkbox.Group>
      )
    }
    const span = 24 / cols;
    return (
      <Checkbox.Group {...rest}>
        <Row>
          {options && (options as Option[]).map((item) => {
            const { value, ...rest } = item;
            return (
              <Col key={`${item.value}`} span={span}>
                <Checkbox value={item.value} {...rest}>{item.text}</Checkbox>
              </Col>
            )
          })}
        </Row>
      </Checkbox.Group>
    )
  }
}

import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import _isString from 'lodash/isString';

export interface CustomCheckGroupProps extends CheckboxGroupProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
}

export default class CustomCheckGroup extends React.Component<CustomCheckGroupProps> {
  render() {
    const { cols, options = [], ...rest } = this.props;
    if (!cols) {
      return <Checkbox.Group options={options} {...rest} />;
    }
    const span = 24 / cols;
    return (
      <Checkbox.Group {...rest}>
        <Row>
          {options &&
            options.map((item) => {
              if (_isString(item)) {
                return (
                  <Col>
                    <Checkbox value={item}>{item}</Checkbox>
                  </Col>
                );
              }
              const { value, ...rest } = item;
              return (
                <Col key={`${item.value}`} span={span}>
                  <Checkbox value={item.value} {...rest}>
                    {item.label}
                  </Checkbox>
                </Col>
              );
            })}
        </Row>
      </Checkbox.Group>
    );
  }
}

import React from 'react';
import { Radio, Row, Col } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio';

export interface CustomRadioGroupProps extends RadioGroupProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
}

export default class CustomRadioGroup extends React.Component<CustomRadioGroupProps> {
  render() {
    const { cols, options = [], ...rest } = this.props;
    if (!cols) {
      return <Radio.Group options={options} {...rest} />;
    }
    const span = 24 / cols;
    return (
      <Radio.Group {...rest}>
        <Row>
          {options &&
            options.map((item) => {
              if (typeof item === 'string') {
                return (
                  <Col>
                    <Radio value={item}>{item}</Radio>
                  </Col>
                );
              }
              const { value, ...rest } = item;
              return (
                <Col key={`${item.value}`} span={span}>
                  <Radio value={item.value} {...rest}>
                    {item.label}
                  </Radio>
                </Col>
              );
            })}
        </Row>
      </Radio.Group>
    );
  }
}

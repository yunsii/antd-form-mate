import React, { useState } from 'react';
import { Input, InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';
import { useUpdateEffect } from '../../hooks'

import { useIntl } from '../../../intl-context';

export type CustomInputNumberProps = Omit<InputNumberProps, "style" | "value" | "onChange">

const separatorWidth = 32;
const inputWidth = `calc(50% - ${separatorWidth / 2}px)`;

export type NumberRangeValue = undefined | [number, number];

export interface InputNumberRangeProps {
  value?: NumberRangeValue;
  onChange?: (value?: NumberRangeValue) => void;
  separator?: string;
  number1Props?: CustomInputNumberProps;
  number2Props?: CustomInputNumberProps;
}

export const InputNumberRange: React.FC<InputNumberRangeProps> = (props) => {
  const intl = useIntl();
  const { onChange, separator, number1Props, number2Props } = props;

  const [value1, setValue1] = useState<number>();
  const [value2, setValue2] = useState<number>();

  useUpdateEffect(() => {
    if (value1 && value2) {
      onChange?.([value1, value2]);
    } else {
      onChange?.();
    }
  }, [value1, value2]);

  return (
    <Input.Group compact>
      <InputNumber
        placeholder={intl.getMessage("placeholder.number", "请输入")}
        {...number1Props}
        style={{
          width: inputWidth,
          textAlign: 'center',
        }}
        value={value1}
        onChange={value => { setValue1(value) }}
      />
      <Input
        style={{
          width: separatorWidth,
          borderLeft: 0,
          pointerEvents: 'none',
          backgroundColor: '#fff',
        }}
        placeholder={separator || "~"}
        disabled
      />
      <InputNumber
        placeholder={intl.getMessage("placeholder.number", "请输入")}
        {...number2Props}
        style={{
          width: inputWidth,
          textAlign: 'center',
          borderLeft: 0,
        }}
        value={value2}
        onChange={value => { setValue2(value) }}
      />
    </Input.Group>
  );
}

export default InputNumberRange;

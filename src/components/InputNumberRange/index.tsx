import React, { useEffect } from 'react';
import { Input, InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';
import _isNumber from 'lodash/isNumber';

import { useIntl } from '../../contexts/Intlcontext';
import styles from './index.less';

export type CustomInputNumberProps = Omit<InputNumberProps, 'value' | 'onChange'>;

const separatorWidth = 36;
const inputWidth = `calc(50% - ${separatorWidth / 2}px)`;

export type NumberRangeValue = undefined | [number, number];

export interface InputNumberRangeProps {
  value?: NumberRangeValue;
  onChange?: (value?: NumberRangeValue) => void;
  separator?: string;
  placeholder?: [string, string];
  number1Props?: CustomInputNumberProps;
  number2Props?: CustomInputNumberProps;
}

export const InputNumberRange: React.FC<InputNumberRangeProps> = (props) => {
  const intl = useIntl();
  const { value, onChange, separator, placeholder, number1Props, number2Props } = props;

  const setValue1 = (v1: number | undefined) => {
    if (!_isNumber(v1)) {
      onChange?.(undefined);
    } else {
      onChange?.([v1, value?.[1] && value[1] >= v1 ? value[1] : v1]);
    }
  };

  const setValue2 = (v2: number | undefined) => {
    if (!_isNumber(v2)) {
      onChange?.(undefined);
    } else {
      onChange?.([value?.[0] && value[0] <= v2 ? value[0] : v2, v2]);
    }
  };

  useEffect(() => {
    if (!_isNumber(value?.[0]) && !_isNumber(value?.[1])) {
      onChange?.(undefined);
    }
  }, [value]);

  return (
    <Input.Group compact>
      <InputNumber
        placeholder={placeholder?.[0] || intl.getMessage('placeholder.number', '请输入')}
        {...number1Props}
        style={{
          width: inputWidth,
          ...number1Props?.style,
        }}
        value={value?.[0]}
        onChange={(_value) => {
          setValue1(_value);
        }}
      />
      <InputNumber
        style={{
          width: separatorWidth,
        }}
        tabIndex={-1}
        className={styles.separator}
        placeholder={separator || '~'}
      />
      <InputNumber
        placeholder={placeholder?.[1] || intl.getMessage('placeholder.number', '请输入')}
        {...number2Props}
        style={{
          width: inputWidth,
          ...number2Props?.style,
        }}
        value={value?.[1]}
        onChange={(_value) => {
          setValue2(_value);
        }}
      />
    </Input.Group>
  );
};

export default InputNumberRange;

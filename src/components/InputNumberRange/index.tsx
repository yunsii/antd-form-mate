import React, { useRef } from 'react';
import { Input, InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';

import { useIntl } from '../../contexts/Intlcontext';
import styles from './index.less';

export type CustomInputNumberProps = Omit<InputNumberProps, 'value' | 'onChange'>;

const separatorWidth = 36;
const inputWidth = `calc(50% - ${separatorWidth / 2}px)`;

export interface NumberRangeValue {
  min?: number;
  max?: number;
}

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
  const foucsRef = useRef<boolean>(false);

  const setValue1 = (v1: number | undefined) => {
    onChange?.({
      min: v1,
      max: value?.max,
    });
  };

  const setValue2 = (v2: number | undefined) => {
    onChange?.({
      min: value?.min,
      max: v2,
    });
  };

  const handleBlur = () => {
    foucsRef.current = false;

    const timer = setTimeout(() => {
      if (!foucsRef.current && value?.min && value?.max && value.min > value.max) {
        onChange?.({
          min: value.max,
          max: value.min,
        });
      }
      clearTimeout(timer);
    });
  };

  return (
    <Input.Group
      compact
      onFocus={() => {
        foucsRef.current = true;
      }}
      onBlur={handleBlur}
    >
      <InputNumber
        placeholder={placeholder?.[0] || intl.getMessage('placeholder.number', '请输入')}
        {...number1Props}
        style={{
          width: inputWidth,
          ...number1Props?.style,
        }}
        value={value?.min}
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
        value={value?.max}
        onChange={(_value) => {
          setValue2(_value);
        }}
      />
    </Input.Group>
  );
};

export default InputNumberRange;

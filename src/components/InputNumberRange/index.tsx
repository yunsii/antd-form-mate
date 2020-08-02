import React, { useRef } from 'react';
import { Input, InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';

import { useIntl } from '../../contexts/Intlcontext';
import styles from './index.less';

export type CustomInputNumberProps = Omit<InputNumberProps, 'value' | 'onChange'>;

const separatorWidth = 36;
const inputWidth = `calc(50% - ${separatorWidth / 2}px)`;

export type NumberValue<T> = T | null;
export type RangeValue = [NumberValue<number>, NumberValue<number>] | null;

export interface InputNumberRangeProps {
  value?: RangeValue;
  onChange?: (value?: RangeValue) => void;
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
    onChange?.([v1 || null, value?.[1] || null]);
  };

  const setValue2 = (v2: number | undefined) => {
    onChange?.([value?.[0] || null, v2 || null]);
  };

  const handleBlur = () => {
    foucsRef.current = false;

    const timer = setTimeout(() => {
      if (!foucsRef.current && value?.[0] && value?.[1] && value[0] > value[1]) {
        onChange?.([value[1], value[0]]);
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
        value={value?.[0] || undefined}
        onChange={(_value) => {
          setValue1(_value as any);
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
        value={value?.[1] || undefined}
        onChange={(_value) => {
          setValue2(_value as any);
        }}
      />
    </Input.Group>
  );
};

export default InputNumberRange;

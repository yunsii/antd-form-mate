import React, { useState } from 'react';
import { Input, InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';
import _get from 'lodash/get';
import _isNumber from 'lodash/isNumber';

import { useUpdateEffect } from '../../hooks'
import { useIntl } from '../../../intl-context';
import styles from './index.less';

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
  const { value, onChange, separator, number1Props, number2Props } = props;

  const getValue1 = () => _get(value, "[0]");
  const getValue2 = () => _get(value, "[1]");

  const [value1, setValue1] = useState<number | undefined>(getValue1());
  const [value2, setValue2] = useState<number | undefined>(getValue2());

  // 与外部数据同步，当 value 为受控状态时，同步到内部状态中
  useUpdateEffect(() => {
    if (_isNumber(getValue1()) && _isNumber(getValue2())) {
      setValue1(getValue1());
      setValue2(getValue2());
    }
  }, [value]);

  // 内部数据同步，当两个值有变化时，如果两个值都有效，触发 `onChange` ，返回数组；否则返回 undefined
  useUpdateEffect(() => {
    if (_isNumber(value1) && _isNumber(value2)) {
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
        onChange={_value => { setValue1(_value) }}
      />
      <Input
        style={{
          width: separatorWidth,
        }}
        className={styles.separator}
        placeholder={separator || "~"}
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
        onChange={_value => { setValue2(_value) }}
      />
    </Input.Group>
  );
}

export default InputNumberRange;

import React, { useState, useEffect } from 'react';
import { Popover, Space, Spin } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import FormMate from '../../../src';
import { FormMateItemProps, FormMateInstance } from '../../../src/interfaces';

import styles from './index.less';

export interface PopoverInputProps<T, R = T> {
  item: FormMateItemProps;
  initialValue: T;
  render?: (value: T) => React.ReactChild;
  run?: (value: R, close: () => void) => Promise<void> | void;
  onClose?: () => void;
  resetOnClose?: boolean;

  formMate?: FormMateInstance;
}

export default <T, R>(props: PopoverInputProps<T, R>) => {
  const { item, formMate, initialValue, render, run, onClose, resetOnClose = false } = props;

  const [interanlFormMate] = FormMate.useFormMate(formMate);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    formMate?.setInitialValues({
      [item.name as string]: initialValue,
    });
  }, [initialValue]);

  const handleOk = async () => {
    const values = await interanlFormMate.validateFields();
    setLoading(true);
    await run?.(values[item.name as string], () => setVisible(false));
    setLoading(false);
  };

  const handleClose = () => {
    onClose?.();
    setVisible(false);
    if (resetOnClose) {
      formMate?.resetFieldsValue();
    }
  };

  return (
    <Popover
      visible={visible}
      destroyTooltipOnHide
      content={
        <Spin spinning={loading}>
          <FormMate formMate={interanlFormMate} layout='inline'>
            <FormMate.Item {...item} dense />
            <FormMate.Item>
              <Space>
                <CheckOutlined className={styles.icon} onClick={handleOk} />
                <CloseOutlined className={styles.icon} onClick={handleClose} />
              </Space>
            </FormMate.Item>
          </FormMate>
        </Spin>
      }
    >
      <span
        onMouseOver={() => {
          setVisible(true);
        }}
        className={styles.value}
      >
        {render?.(initialValue) || initialValue}
      </span>
    </Popover>
  );
};

import * as React from 'react';
import { Button, Space } from 'antd';

import FormMate from '../../src';

export default () => {
  const [formMate] = FormMate.useFormMate();

  const handleFinish = () => {
    const rawValues = formMate.getFieldsValue(true);
    console.log('Received raw values of form: ', rawValues);
    // 过滤，得到当前显示组件的字段值
    const values = formMate.getFieldsValue(undefined, () => true);
    console.log('Received values of form: ', values);
  };

  const handleFinishFailed = (errors) => {
    console.log('Errors:', errors);
  };

  return (
    <FormMate
      formMate={formMate}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      // initialValues={initialValues}
      onValuesChange={(changedValues, allValues) => {
        console.log('onValuesChange', changedValues, allValues);
      }}
      style={{
        maxWidth: 900,
        margin: '0 auto',
        paddingTop: 20,
      }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      onReset={() => {
        formMate.resetFieldsValue();
      }}
    >
      <FormMate.Item type='number' name='number' label='数字' />
      <FormMate.Item type='number-range' name='number-range' label='数字区间' />
      <FormMate.Item wrapperCol={{ span: 12, offset: 8 }}>
        <Space>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
          <Button htmlType='reset'>重置</Button>
        </Space>
      </FormMate.Item>
    </FormMate>
  );
};

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
      renderItem={(item, name) => {
        console.log(name)
        return name !== 'name' ? item : undefined;
      }}
    >
      <FormMate.Item
        type='string'
        name='name'
        label='姓名'
        rules={[{ required: true, message: '请输入姓名！' }]}
        componentProps={{
          onChange: (event: any) => {
            formMate.setFieldsValue({
              name: event.target.value,
              textarea: event.target.value,
              hidden: event.target.value,
            });
          },
        }}
      />
      <FormMate.Item
        type='email'
        name='email'
        label='邮箱'
        rules={[
          {
            required: true,
            message: '这是必填的',
          },
        ]}
      />
      <FormMate.Item type='password' name='password' label='密码' />
      <FormMate.Item type='textarea' name='textarea' label='文本框' extra='与`姓名`字段联动' />
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

import * as React from 'react';
import { Button, Space } from 'antd';

import FormMate from '../../src';

const { useEffect } = React;

const BasicForm: React.FC = () => {
  const [formMate] = FormMate.useFormMate();

  const initialValues = {
    plain: 'plain',
    dynamic: '2020-04-07',
  };

  useEffect(() => {
    formMate.setInitialValues(initialValues);
  }, []);

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
      // layout='vertical'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      onReset={() => {
        formMate.resetFieldsValue();
      }}
    >
      <FormMate.Item type='plain' name='plain' label='纯文本' required />
      <FormMate.Item type='slider' name='slider' label='滑动输入条' />
      <FormMate.Item type='switch' name='switch' label='开关' extra='打开开关展示隐藏字段' />
      <FormMate.Dynamic
        type='date'
        name='dynamic'
        label='dynamic'
        required
        render={({ getFieldValue }) => {
          return getFieldValue('switch') === true;
        }}
      />
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

export default BasicForm;

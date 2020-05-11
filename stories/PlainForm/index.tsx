import * as React from 'react';
import { Button, Space } from 'antd';

import FormMate from '../../src';
import moment from 'moment';

export default () => {
  const [formMate] = FormMate.useFormMate();

  React.useEffect(() => {
    formMate.setInitialValues({
      plain1: '今天，',
      plain2: `${moment().format('YYYY-MM-DD')}，`,
      plain3: '也是元气满满的一天！',
    });
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
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      onReset={() => {
        formMate.resetFieldsValue();
      }}
    >
      <FormMate.Item type='plain' name='plain1' label='纯文本1' />
      <FormMate.Item type='plain' name='plain2' label='纯文本2' />
      <FormMate.Item type='plain' name='plain3' label='纯文本3' />
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

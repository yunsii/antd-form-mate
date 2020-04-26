import * as React from 'react';
// import { action } from '@storybook/addon-actions';
import moment from 'moment';
import { Button, Space, Divider } from 'antd';

import FormMate, { ConfigProvider } from '../../src';
import { ComponentType } from '../../src/interfaces';

const { useEffect } = React;
const dateFormat = 'YYYY-MM-DD';

const BasicForm: React.FC = () => {
  const [formMate] = FormMate.useFormMate();

  const initialValues = {
    hidden: 1,
    formatDate: moment().format(dateFormat),
    unix: 1565151166,
    ms: 1565151166124,
    'date-period': ['2019-01-01 12:00:00', '2019-08-07 10:00:00'],
    'datetime-period': ['2019-01-01', '2019-08-07'],
    select: 'earth',
    switch: 0,
    dynamic: '2020-04-07',

    name2: 'name2',
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
    <ConfigProvider
      setCommonProps={setCommonProps}
      commonExtra={{
        string: 'commen extra of string',
      }}
    >
      <FormMate
        formMate={formMate}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        // initialValues={initialValues}
        onValuesChange={(changedValues, allValues) => {
          console.log('onValuesChange', changedValues, allValues);
        }}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '24px 16px 0',
        }}
        // layout='vertical'
        grid={{
          row: {
            gutter: 16,
          },
          col: (name) => {
            if (['date-period', 'datetime-period'].includes(name as string)) {
              return {
                sm: 24,
                md: 12,
                lg: 16,
              };
            }
            return {
              sm: 24,
              md: 12,
              lg: 8,
            };
          },
        }}
        onReset={() => {
          formMate.resetFieldsValue();
        }}
      >
        <FormMate.Item type='date-range' name='date-period' label='日期区间' />
        <FormMate.Item type='date' name='formatDate' label='格式化日期' />
        <FormMate.Item type='datetime-range' name='datetime-period' label='日期时间区间' />
        <FormMate.Item type='date' name='ms' label='毫秒时间戳' />
        <FormMate.Item type='date' name='unix' label='unix 时间戳' />
        <FormMate.Item type='number' name='number' label='数字' />
        <FormMate.Item type='password' name='password' label='密码' />
        <FormMate.Item type='slider' name='slider' label='滑动输入条' />
        <FormMate.Item
          type='string'
          name='name'
          label='姓名'
          rules={[{ required: true, message: '请输入姓名！' }]}
          componentProps={{
            onChange: (event: any) => {
              formMate.setFieldsValue({
                name: event.target.value,
                hidden: event.target.value,
              });
            },
          }}
        />
        <FormMate.Dynamic
          type='date'
          name='dynamic'
          label='dynamic'
          required
          render={({ getFieldValue }) => {
            return getFieldValue('name') === 'form';
          }}
        />
        <FormMate.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
            <Button htmlType='reset'>重置</Button>
          </Space>
        </FormMate.Item>
      </FormMate>
      <Divider />
      <FormMate
        formMate={formMate}
        grid={{
          row: {
            gutter: 16,
          },
          col: {
            sm: 24,
            md: 12,
            lg: 8,
          },
        }}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '24px 16px 0',
        }}
      >
        <FormMate.Item name='name2' label='name2' />
        <FormMate.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
            <Button htmlType='reset'>重置</Button>
          </Space>
        </FormMate.Item>
      </FormMate>
    </ConfigProvider>
  );
};

const setCommonProps = (type: ComponentType) => {
  if (!(['check-group', 'textarea', 'switch'] as ComponentType[]).includes(type)) {
    return {
      allowClear: true,
    };
  }
  return null;
};

export default BasicForm;

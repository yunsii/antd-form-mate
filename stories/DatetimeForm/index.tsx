import * as React from 'react';
// import { action } from '@storybook/addon-actions';
import moment from 'moment';
import { Button, Space } from 'antd';

import FormMate from '../../src';

const { useEffect } = React;
const dateFormat = 'YYYY-MM-DD';
const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';

export default () => {
  console.log('render DateForm');
  const [formMate] = FormMate.useFormMate();
  const [, forceUpdate] = React.useState();

  const initialValues = {
    formatDate: moment().format(dateFormat),
    unix: 1565151166,
    ms: 1565151166124,
    time: moment().unix(),
    datetime: moment().format(datetimeFormat),
    dateRange: ['2019-01-01 12:00:00', '2019-08-07 10:00:00'],
    timeRange: [moment().unix(), moment().add(3, 'hours').unix()],
    datetimeRange: ['2019-01-01', '2019-08-07'],
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
      <FormMate.Item type='date' name='formatDate' label='格式化日期' />
      <FormMate.Item type='date' name='unix' label='unix 时间戳' />
      <FormMate.Item type='date' name='ms' label='毫秒时间戳' />
      <FormMate.Item type='time' name='time' label='时间' />
      <FormMate.Item type='time-range' name='timeRange' label='时间范围' />
      <FormMate.Item
        type='datetime'
        name='datetime'
        label='日期时间'
        componentProps={{
          disabledPastDays: true,
        }}
      />
      <FormMate.Item type='date-range' name='dateRange' label='日期区间' />
      <FormMate.Item
        type='datetime-range'
        name='datetimeRange'
        label='日期时间区间'
      />
      <FormMate.Item wrapperCol={{ span: 12, offset: 8 }}>
        <Space>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
          <Button htmlType='reset'>重置</Button>
          <Button onClick={() => forceUpdate({})}>强制刷新</Button>
        </Space>
      </FormMate.Item>
    </FormMate>
  );
};

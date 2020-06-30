import * as React from 'react';
import { Button, Space } from 'antd';

import FormMate from '../../src';
import { checkOptions, selectOptions, cascaderOptions } from './options';
import { delay } from '../utils';

const { useEffect } = React;

export default () => {
  const [formMate] = FormMate.useFormMate();
  const [loading, setLoading] = React.useState(false);

  const initialValues = {
    checks: ['earth'],
    radio: 'earth',
    select: 'earth',
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

  const handleLoading = async () => {
    setLoading(true);
    await delay(2000);
    setLoading(false);
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
      // grid={{
      //   row: { gutter: 16 },
      //   col: (item, name, index) => {
      //     if (item) {
      //       return {};
      //     }
      //     return undefined;
      //   },
      // }}
      onReset={() => {
        formMate.resetFieldsValue();
      }}
    >
      <FormMate.Item
        type='radio-group'
        name='radio'
        label='单选'
        componentProps={{
          options: checkOptions,
          onChange: (value) => {
            console.log(value);
          },
          cols: 2,
        }}
      />
      <FormMate.Item
        type='check-group'
        name='checks'
        label='多选'
        componentProps={{
          options: checkOptions,
          cols: 2,
        }}
      />
      <FormMate.Item
        type='select'
        name='select'
        label='选择'
        componentProps={{
          options: selectOptions,
          style: { minWidth: 160 },
        }}
      />
      <FormMate.Item
        type='select'
        name='select1'
        label='选择'
        componentProps={{
          options: selectOptions,
          loading,
          onReload: () => {
            handleLoading();
          },
          style: { minWidth: 160 },
        }}
      />
      <FormMate.Item
        type='tree-select'
        name='treeSelect'
        label='树选择'
        componentProps={{
          options: selectOptions,
          loading,
          onReload: () => {
            handleLoading();
          },
          style: { minWidth: 160 },
        }}
      />
      <FormMate.Item
        type='cascader'
        name='cascader'
        label='级联'
        componentProps={{
          options: cascaderOptions,
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

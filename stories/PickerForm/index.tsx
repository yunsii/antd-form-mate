import * as React from 'react';
import { Button, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import FormMate from '../../src';

const { useEffect } = React;

export default () => {
  const [formMate] = FormMate.useFormMate();

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
      <FormMate.Item
        type='radio-group'
        name='radio'
        label='单选'
        componentProps={{
          options: [
            {
              label: '地球',
              value: 'earth',
            },
            {
              label: '银河',
              value: 'galaxy',
            },
          ],
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
          options: [
            {
              label: '地球',
              value: 'earth',
            },
            {
              label: '银河',
              value: 'galaxy',
            },
          ],
          cols: 2,
        }}
      />
      <FormMate.Item
        type='select'
        name='select'
        label='选择'
        componentProps={{
          suffixIcon: <ReloadOutlined />,
          options: [
            {
              label: '星系',
              options: [
                {
                  label: '地球',
                  value: 'earth',
                },
                {
                  label: '银河',
                  value: 'galaxy',
                  disabled: true,
                },
              ],
            },
            {
              label: '水果',
              options: [
                {
                  label: '香蕉',
                  value: 'banana',
                },
                {
                  label: '苹果',
                  value: 'apple',
                },
              ],
            },
          ],
          // options: [
          //   {
          //     label: '地球',
          //     value: 'earth',
          //   },
          //   {
          //     label: '银河',
          //     value: 'galaxy',
          //   },
          // ],
        }}
      />
      <FormMate.Item
        type='cascader'
        name='cascader'
        label='级联'
        componentProps={{
          options: [
            {
              label: '蔬菜',
              value: 'vegetable',
              children: [
                {
                  label: '土豆',
                  value: 'potato',
                },
                {
                  label: '白菜',
                  value: 'cabbage',
                },
              ],
            },
            {
              label: '水果',
              value: 'fruit',
              children: [
                {
                  label: '香蕉',
                  value: 'banana',
                },
                {
                  label: '苹果',
                  value: 'apple',
                },
              ],
            },
          ],
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

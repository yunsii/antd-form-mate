import * as React from 'react';
// import { action } from '@storybook/addon-actions';
import moment from 'moment';
import { Button, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import FormMate, { ConfigProvider } from '../../src';
import { ComponentType } from '../../src/interfaces';

const { useEffect } = React;
const dateFormat = 'YYYY-MM-DD';
const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';

const BasicForm: React.FC = () => {
  const [formMate] = FormMate.useFormMate();

  const initialValues = {
    hidden: 1,
    plain: 'plain',
    checks: ['earth'],
    radio: 'earth',
    formatDate: moment().format(dateFormat),
    unix: 1565151166,
    ms: 1565151166124,
    datetime: moment().format(datetimeFormat),
    'date-period': ['2019-01-01 12:00:00', '2019-08-07 10:00:00'],
    'datetime-period': ['2019-01-01', '2019-08-07'],
    select: 'earth',
    switch: 0,
    'number-range': [0, 4],
    dynamic: '2020-04-07',

    name2: 'name2'
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
          paddingTop: 20,
        }}
        // layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        grid={{
          col: {
            sm: 24,
            md: 12,
            lg: 8,
          },
        }}
        onReset={() => {
          formMate.resetFieldsValue();
        }}
      >
        <FormMate.Item type='plain' name='plain' label='纯文本' required />
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
            cols: 3,
          }}
        />
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
        <FormMate.Item type='date' name='formateDate' label='格式化日期' />
        <FormMate.Item type='date' name='unix' label='unix 时间戳' />
        <FormMate.Item type='date' name='ms' label='毫秒时间戳' />
        <FormMate.Item
          type='datetime'
          name='datetime'
          label='日期时间'
          componentProps={{
            disabledPastDays: true,
          }}
        />
        <FormMate.Item type='date-range' name='date-period' label='日期区间' />
        <FormMate.Item type='datetime-range' name='datetime-period' label='日期时间区间' />
        <FormMate.Item type='number' name='number' label='数字' />
        <FormMate.Item type='number-range' name='number-range' label='数字区间' />
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
        <FormMate.Item type='textarea' name='textarea' label='文本框' extra='与`姓名`字段联动' />
        <FormMate.Item type='password' name='password' label='密码' />
        <FormMate.Item type='switch' name='switch' label='开关' />
        <FormMate.Item type='slider' name='slider' label='滑动输入条' />
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
        <FormMate.Dynamic
          type='date'
          name='dynamic'
          label='dynamic'
          required
          render={({ getFieldValue }) => {
            return getFieldValue('name') === 'form';
          }}
        />
        <FormMate.Item wrapperCol={{ span: 12, offset: 8 }}>
          <Space>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
            <Button htmlType='reset'>重置</Button>
            <Button
              onClick={() => {
                formMate.setFieldsValue({
                  'number-range': [4, 6.4],
                });
              }}
            >
              其他
            </Button>
          </Space>
        </FormMate.Item>
      </FormMate>
      <FormMate
        formMate={formMate}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        grid={{
          col: {
            sm: 24,
            md: 12,
            lg: 8,
          },
        }}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          paddingTop: 20,
        }}
      >
        <FormMate.Item name='name2' label='name2' />
        <FormMate.Item wrapperCol={{ span: 12, offset: 8 }}>
          <Space>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
            <Button htmlType='reset'>重置</Button>
            <Button
              onClick={() => {
                formMate.setFieldsValue({
                  'number-range': [4, 6.4],
                });
              }}
            >
              其他
            </Button>
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

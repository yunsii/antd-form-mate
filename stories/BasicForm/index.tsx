import * as React from 'react';
// import { action } from '@storybook/addon-actions';
import moment from 'moment';
import { Form, Button } from 'antd';
import { createFormItems } from '../FormMate';
import { ItemConfig, ComponentType } from '../../src/lib/props';
import { ConfigProvider } from '../../src';

const { useState, useEffect } = React;
const dateFormat = 'YYYY-MM-DD';
const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';

const BasicForm: React.FC = (props) => {
  const [form] = Form.useForm();
  const initialValues = {
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
  };

  const getFormItems = (detail: any = {}): ItemConfig[] => {
    const [text, setText] = useState<string>();

    useEffect(() => {
      form.setFieldsValue({
        name: text,
        textarea: text,
      })
    }, [text]);

    return [
      // {
      //   type: 'hidden',
      //   field: 'hidden',
      //   // fieldProps: {
      //   //   initialValue: 1,
      //   // },
      // },
      {
        type: 'plain',
        field: 'plain',
        formItemProps: {
          label: '纯文本',
        },
      },
      {
        type: 'check-group',
        field: 'checks',
        formItemProps: {
          label: '多选',
        },
        componentProps: {
          options: [
            {
              text: '地球',
              value: 'earth',
            },
            {
              text: '银河',
              value: 'galaxy',
            },
          ],
          cols: 3,
        },
      },
      {
        type: 'radio-group',
        field: 'radio',
        formItemProps: {
          label: '单选',
        },
        componentProps: {
          options: [
            {
              text: '地球',
              value: 'earth',
            },
            {
              text: '银河',
              value: 'galaxy',
            },
          ],
          disabled: true,
          onChange: (value) => {
            console.log(value);
          },
          cols: 2,
        },
      },
      {
        type: 'date',
        field: 'formatDate',
        formItemProps: {
          label: '格式化日期',
        },
        componentProps: {
          onChange: value => console.log(value),
        },
      },
      {
        type: 'date',
        field: 'unix',
        formItemProps: {
          label: 'unix 时间戳',
        },
        componentProps: {
          onChange: value => console.log(value),
        },
      },
      {
        type: 'date',
        field: 'ms',
        formItemProps: {
          label: '毫秒时间戳',
        },
        componentProps: {
          onChange: value => console.log(value),
        },
      },
      {
        type: 'datetime',
        field: 'datetime',
        formItemProps: {
          label: '日期时间',
        },
        componentProps: {
          onlyAfterToday: true,
        }
      },
      {
        type: 'date-range',
        field: 'date-period',
        formItemProps: {
          label: '日期区间',
        },
      },
      {
        type: 'datetime-range',
        field: 'datetime-period',
        formItemProps: {
          label: '日期时间区间',
        },
      },
      {
        type: 'number',
        field: 'number',
        formItemProps: {
          label: '数字',
        },
      },
      {
        type: 'select',
        field: 'select',
        formItemProps: {
          label: '选择',
        },
        componentProps: {
          groupOptions: [
            {
              text: '星系',
              options: [
                {
                  text: '地球',
                  value: 'earth',
                },
                {
                  text: '银河',
                  value: 'galaxy',
                },
              ],
            },
            {
              text: '水果',
              options: [
                {
                  text: '香蕉',
                  value: 'banana',
                },
                {
                  text: '苹果',
                  value: 'apple',
                },
              ],
            },
          ],
          // options: [
          //   {
          //     text: '地球',
          //     value: 'earth',
          //   },
          //   {
          //     text: '银河',
          //     value: 'galaxy',
          //   },
          // ],
        },
      },
      {
        type: 'textarea',
        field: 'textarea',
        formItemProps: {
          label: '文本框',
          extra: '与`姓名`字段联动',
        },
        componentProps: {
          autoSize: { minRows: 2, maxRows: 6 },
          onChange: (event: any) => setText(event.target.value),
        },
      },
      {
        type: 'password',
        field: 'password',
        formItemProps: {
          label: '密码',
        },
      },
      {
        type: 'switch',
        field: 'switch',
        formItemProps: {
          label: '开关',
        },
      },
      {
        type: 'slider',
        field: 'slider',
        formItemProps: {
          label: '滑动输入条',
        },
      },
      {
        type: 'email',
        field: 'email',
        formItemProps: {
          label: '邮箱',
          rules: [{ required: true, message: '请输入邮箱！' }],
        },
      },
      {
        type: 'string',
        field: 'name',
        formItemProps: {
          label: '姓名',
          rules: [{ required: true, message: '请输入姓名！' }],
        },
        componentProps: {
          onChange: (event: any) => setText(event.target.value),
        },
      },
    ];
  }

  const handleFinish = (values) => {
    console.log('Received values of form: ', values);
  }

  const handleFinishFailed = (errors) => {
    console.log('Errors:', errors);
  }

  return (
    <ConfigProvider
      setCommenProps={setCommenProps}
      commenExtra={{
        string: 'commen extra of string',
      }}
    >
      <Form
        style={{ marginTop: 20 }}
        form={form}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        initialValues={initialValues}
      >
        {createFormItems(getFormItems())}
        <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
          <Button
            type="primary"
            htmlType="submit"
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}

const setCommenProps = (type: ComponentType) => {
  if (!(['check-group', 'textarea', 'switch'] as ComponentType[]).includes(type)) {
    return {
      allowClear: true,
    }
  }
  return null;
};

export default BasicForm;

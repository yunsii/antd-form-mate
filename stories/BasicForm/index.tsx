import * as React from 'react';
// import { action } from '@storybook/addon-actions';
import moment from 'moment';
import { Form, Button, Row, Col } from 'antd';
import { createFormItems } from '../FormMate';
import { ItemConfig, ComponentType } from '../../src/lib/props';
import { ConfigProvider } from '../../src';

const { useState, useEffect } = React;
const dateFormat = 'YYYY-MM-DD';
const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';

const BasicForm: React.FC = () => {
  const [form] = Form.useForm();
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
  };
  const [text, setText] = useState<string>();

  useEffect(() => {
    form.setFieldsValue({
      name: text,
      textarea: text,
      hidden: text,
    })
  }, [text]);

  const formItems: ItemConfig[] = [
    {
      type: 'plain',
      name: 'plain',
      formItemProps: {
        label: '纯文本',
        required: true,
      },
    },
    {
      type: 'check-group',
      name: 'checks',
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
      name: 'radio',
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
      name: 'formatDate',
      formItemProps: {
        label: '格式化日期',
      },
      componentProps: {
        onChange: value => console.log(value),
      },
    },
    {
      type: 'date',
      name: 'unix',
      formItemProps: {
        label: 'unix 时间戳',
      },
      componentProps: {
        onChange: value => console.log(value),
      },
    },
    {
      type: 'date',
      name: 'ms',
      formItemProps: {
        label: '毫秒时间戳',
      },
      componentProps: {
        onChange: value => console.log(value),
      },
    },
    {
      type: 'datetime',
      name: 'datetime',
      formItemProps: {
        label: '日期时间',
      },
      componentProps: {
        disabledPastDays: true,
      }
    },
    {
      type: 'date-range',
      name: 'date-period',
      formItemProps: {
        label: '日期区间',
      },
    },
    {
      type: 'datetime-range',
      name: 'datetime-period',
      formItemProps: {
        label: '日期时间区间',
      },
    },
    {
      type: 'number',
      name: 'number',
      formItemProps: {
        label: '数字',
      },
    },
    {
      type: 'select',
      name: 'select',
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
      name: 'textarea',
      formItemProps: {
        label: '文本框',
        extra: '与`姓名`字段联动',
      },
      componentProps: {
        autoSize: { minRows: 1, maxRows: 6 },
        onChange: (event: any) => setText(event.target.value),
      },
    },
    {
      type: 'password',
      name: 'password',
      formItemProps: {
        label: '密码',
      },
    },
    {
      type: 'switch',
      name: 'switch',
      formItemProps: {
        label: '开关',
      },
    },
    {
      type: 'slider',
      name: 'slider',
      formItemProps: {
        label: '滑动输入条',
      },
    },
    {
      type: 'email',
      name: 'email',
      formItemProps: {
        label: '邮箱',
        // required: true,
        rules: [
          {
            required: true,
            message: '这是必填的',
          },
        ]
      },
    },
    {
      type: 'string',
      name: 'name',
      formItemProps: {
        label: '姓名',
        required: true,
      },
      componentProps: {
        onChange: (event: any) => setText(event.target.value),
      },
    },
    {
      type: 'dynamic',
      name: 'dynamic',
      formItemProps: {
        shouldUpdate: true,
      },
      generateFn: ({ getFieldValue }) => {
        if (getFieldValue('name') === 'form') {
          return {
            type: 'date',
            formItemProps: {
              label: 'dynamic',
            },
          }
        }
        return null;
      },
    },
  ];

  const handleFinish = () => {
    // 过滤，得到当前显示组件的字段值
    const values = form.getFieldsValue(undefined, () => true);
    console.log('Received values of form: ', values);
  }

  const handleFinishFailed = (errors) => {
    console.log('Errors:', errors);
  }

  return (
    <ConfigProvider
      setCommonProps={setCommonProps}
      commonExtra={{
        string: 'commen extra of string',
      }}
    >
      <Form
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          paddingTop: 20,
        }}
        form={form}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        initialValues={initialValues}
        onValuesChange={(changedValues, allValues) => {
          console.log(changedValues, allValues);
        }}
      >
        <Row>
          {createFormItems(formItems).map((item, index) => {
            if (formItems[index].type === 'dynamic' && !formItems[index].generateFn!(form)) { return item; }
            return (
              <Col
                key={`${formItems[index].name}`}
                sm={24}
                md={12}
                lg={8}
              >
                {item}
              </Col>
            )
          })}
          <Col
            sm={24}
            md={12}
            lg={8}
          >
            <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
              >
                提交
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ConfigProvider>
  )
}

const setCommonProps = (type: ComponentType) => {
  if (!(['check-group', 'textarea', 'switch'] as ComponentType[]).includes(type)) {
    return {
      allowClear: true,
    }
  }
  return null;
};

export default BasicForm;

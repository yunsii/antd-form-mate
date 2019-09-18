import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import moment, { Moment } from 'moment';
import { Form, Button } from 'antd';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
import { createFormItems, config } from '../src';
import { ItemConfig } from '../src/lib/form-mate';
import AMap from '../src/lib/components/CutomAMap';
import PicturesWall from './PictureWall';

const { useState } = React;
const { setDefaultExtra, setCommenProps } = config;

setDefaultExtra({
  picture: '自定义图片默认提示',
})

setCommenProps({
  allowClear: true,
})

const dateFormat = 'YYYY-MM-DD';
const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';

function extraDateFieldProps(initialValue, format = dateFormat) {
  return {
    initialValue,
    normalize: (value, prevValue, allValues) => {
      // console.log(value, prevValue, allValues);
      if (value instanceof moment) {
        return (value as any).format(format);
      }
      return value;
    },
  }
}

function extraDateRangeFieldProps(initialValue, format = dateFormat) {
  return {
    initialValue,
    normalize: (value, prevValue, allValues) => {
      // console.log(value, prevValue, allValues);
      if (value && Array.isArray(value) && value[0] instanceof moment) {
        return [(value[0] as Moment).format(format), value[1].format(format)];
      }
      return value;
    },
  }
}

export interface FormProps {
  form: any
}

class BasicForm extends React.Component<FormProps, null> {
  setFormItemsConfig = (detail: any = {}, mode?: string): ItemConfig[] => {
    return [
      {
        type: 'hidden',
        field: 'hidden',
        fieldProps: {
          initialValue: 1,
        },
      },
      {
        type: 'check-group',
        field: 'checks',
        formItemProps: {
          label: '多选',
        },
        fieldProps: {
          initialValue: ['earth'],
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
          onChange: (value) => {
            console.log(value);
          },
          cols: 3,
        },
      },
      {
        type: 'radio-group',
        field: 'radio',
        formItemProps: {
          label: '单选',
        },
        fieldProps: {
          initialValue: 'earth',
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
        fieldProps: {
          ...extraDateFieldProps(moment().format(dateFormat))
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
        fieldProps: {
          initialValue: 1565151166,
          normalize: (value, prevValue, allValues) => {
            // console.log(value, prevValue, allValues);
            if (value instanceof moment) {
              return (value as any).unix();
            }
            return value;
          },
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
        fieldProps: {
          initialValue: 1565151166124,
          normalize: (value, prevValue, allValues) => {
            // console.log(value, prevValue, allValues);
            if (value instanceof moment) {
              return (value as any).valueOf();
            }
            return value;
          },
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
        fieldProps: {
          ...extraDateFieldProps(moment().format(datetimeFormat), datetimeFormat)
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
        fieldProps: {
          ...extraDateRangeFieldProps(['2019-01-01 12:00:00', '2019-08-07 10:00:00']),
        },
      },
      {
        type: 'datetime-range',
        field: 'datetime-period',
        formItemProps: {
          label: '日期时间区间',
        },
        fieldProps: {
          ...extraDateRangeFieldProps(['2019-01-01', '2019-08-07']),
        },
      },
      {
        type: 'number',
        field: 'number',
        formItemProps: {
          label: '数字',
        },
        fieldProps: {
          initialValue: detail.number,
        },
      },
      {
        type: 'select',
        field: 'select',
        formItemProps: {
          label: '选择',
        },
        fieldProps: {
          initialValue: 'earth',
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
        },
      },
      {
        type: 'textarea',
        field: 'textarea',
        formItemProps: {
          label: '文本框',
        },
        fieldProps: {
          initialValue: detail.textarea,
        },
        componentProps: {
          autosize: { minRows: 2, maxRows: 6 },
        },
      },
      {
        type: 'password',
        field: 'password',
        formItemProps: {
          label: '密码',
        },
        fieldProps: {
          initialValue: detail.password,
        },
      },
      {
        type: 'switch',
        field: 'switch',
        formItemProps: {
          label: '开关',
        },
        fieldProps: {
          initialValue: 0,
          normalize: value => value ? 1 : 0,
        },
      },
      {
        type: 'slider',
        field: 'slider',
        formItemProps: {
          label: '滑动输入条',
        },
        fieldProps: {
          initialValue: detail.slider,
        },
      },
      {
        type: 'email',
        field: 'email',
        formItemProps: {
          label: '邮箱',
        },
        fieldProps: {
          initialValue: detail.email,
          rules: [{ required: true, message: '请输入邮箱！' }],
        },
      },
      {
        type: 'string',
        field: 'name',
        formItemProps: {
          label: '姓名',
        },
        fieldProps: {
          initialValue: detail.name,
          rules: [{ required: true, message: '请输入姓名！' }],
        },
      },
    ];
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { form } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
        {createFormItems(form)(this.setFormItemsConfig({}))}
        <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={action('click submit')}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const BasicFormDemo = Form.create()(BasicForm as any);

storiesOf('ant-form-mate', module)
  .add('basic', () => <BasicFormDemo />);

class AdvancedFormPro extends React.Component<FormProps, null> {
  setFormItemsConfig = (detail: any = {}, mode?: string): ItemConfig[] => {
    return [
      {
        type: 'picture',
        field: 'picture',
        formItemProps: {
          label: '图片',
          // extra: '图片像素仅限520*360',
          // extra: '图片像素不大于520*360',
          // extra: '图片像素不小于520*360',
          extra: '图片像素不小于520*360，且不大于1920*1080',
        },
        fieldProps: {
          initialValue: detail.picture,
        },
        componentProps: {
          filesCountLimit: 2,
          accept: 'image/*',
          // dimensionLimit: '520*360',
          // dimensionLimit: '<520*360',
          dimensionLimit: '>520*360',
          // dimensionLimit: '520*360,1920*1080',
          // checkImage: ({ name }) => {
          //   if (/[A-Za-z0-9]*/.test(name.split('.')[0])) {
          //     return '文件名称仅限字母数字';
          //   }
          //   return;
          // },
        },
      },
      {
        type: 'file-dragger',
        field: 'file',
        formItemProps: {
          label: '文件',
        },
        fieldProps: {
          initialValue: detail.file,
        },
        componentProps: {
          accept: '.txt',
        }
      },
      {
        type: 'location',
        field: 'location',
        formItemProps: {
          label: '地址',
        },
        fieldProps: {
          initialValue: detail.location,
        },
      },
    ];
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { form } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
        {createFormItems(form)(this.setFormItemsConfig({}))}
        <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={action('click submit')}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const AdvancedFormProDemo = Form.create()(AdvancedFormPro as any);

storiesOf('ant-form-mate', module)
  .add('advanced', () => <AdvancedFormProDemo />);


function AMapDemo(props) {
  const [position, setPosition] = useState();
  return (
    <AMap
      wrapperStyle={{ height: '100vh' }}
      position={position}
      onClick={(longitude, latitude) => setPosition({ longitude, latitude })}
    />
  )
}

storiesOf('custom components', module)
  .add('amap', () => <AMapDemo />);

storiesOf('antd official components', module)
  .add('PictureWall', () => <PicturesWall />);

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import * as moment from 'moment';
import { Form, Button } from 'antd';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormMate, { config, AMap } from '../src';

const { FormProvider, createFormItems, setDefaultExtra } = FormMate;
const { setCommenProps } = config;

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
        return [value[0].format(format), value[1].format(format)];
      }
      return value;
    },
  }
}

export interface FormProps {
  form: any
}

class BasicForm extends React.Component<FormProps, null> {
  setFormItemsConfig = (detail: any = {}, mode?: string) => {
    return [
      {
        type: 'date',
        field: 'date',
        formItemProps: {
          label: '日期',
        },
        fieldProps: {
          ...extraDateFieldProps(moment().format(dateFormat))
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
      },
      {
        type: 'datetime-range',
        field: 'period',
        formItemProps: {
          label: '有效期',
        },
        fieldProps: {
          ...extraDateRangeFieldProps(['2019-01-01 00:00:00', moment().format(datetimeFormat)]),
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
          initialValue: detail.select,
        },
        componentProps: {
          options: [
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
        type: 'default/string',
        field: 'name',
        formItemProps: {
          label: '姓名',
        },
        fieldProps: {
          initialValue: detail.name,
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
        <FormProvider value={form}>
          {createFormItems(this.setFormItemsConfig({}))}
        </FormProvider>
        <Form.Item wrapperCol={{ span: 13, offset: 7 }}>
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
  setFormItemsConfig = (detail: any = {}, mode?: string) => {
    return [
      {
        type: 'picture',
        field: 'picture',
        formItemProps: {
          label: '图片',
        },
        fieldProps: {
          initialValue: detail.picture,
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
        <FormProvider value={form}>
          {createFormItems(this.setFormItemsConfig({}))}
        </FormProvider>
        <Form.Item wrapperCol={{ span: 13, offset: 7 }}>
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

storiesOf('custom components', module)
  .add('amap', () => <AMap wrapperStyle={{ height: '100vh' }} />);
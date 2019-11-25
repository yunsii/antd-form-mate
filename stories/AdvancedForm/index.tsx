import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { Form, Button } from 'antd';
import { createFormItems } from '../../src';
import { ItemConfig } from '../../src/lib/props';
import { FormProps } from '../interfaces';

class AdvancedForm extends React.Component<FormProps, null> {
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
          // extra: '图片像素不小于520*360，且不大于1920*1080',
          // extra: false,
        },
        fieldProps: {
          // initialValue: detail.picture,
          initialValue: 'https://s2.ax1x.com/2019/09/25/uEvPxI.png',
        },
        componentProps: {
          filesCountLimit: 2,
          accept: 'image/*',
          // dimensionLimit: '520*360',
          // dimensionLimit: '<520*360',
          // dimensionLimit: '>520*360',
          // dimensionLimit: '520*360,1920*1080',
          // checkImage: ({ name }) => {
          //   if (/[A-Za-z0-9]*/.test(name.split('.')[0])) {
          //     return '文件名称仅限字母数字';
          //   }
          //   return;
          // },

          onChange: (file) => {
            console.log(file);
          }
        },
      },
      {
        type: 'file-dragger',
        field: 'file',
        formItemProps: {
          label: '文件',
        },
        fieldProps: {
          // initialValue: detail.file,
          initialValue: 'https://s2.ax1x.com/2019/09/25/uEvPxI.png',
        },
        componentProps: {
          accept: 'image/*',
          filesCountLimit: 2,
        }
      },
      {
        type: 'location',
        field: 'location',
        formItemProps: {
          label: '地址',
        },
        fieldProps: {
          initialValue: { position: { longitude: 114.104624, latitude: 22.554863 }, formattedAddress: "广东省深圳市罗湖区桂园街道红岭2118号大院建设集团大厦" },
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

export default Form.create()(AdvancedForm as any);



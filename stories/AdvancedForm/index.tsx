import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { Form, Button } from 'antd';

import FormMate, { ConfigProvider, getBase64 } from '../../src';

function delay(ms: number) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, ms);
  });
}

const initialValues = {
  picture: [
    'https://s2.ax1x.com/2019/09/25/uEvPxI.png',
    'https://infeng.github.io/react-viewer/bbbc41dac417d9fb4b275223a6a6d3e8.jpg',
  ],
  file: [
    'https://s2.ax1x.com/2019/09/25/uEvPxI.png',
    'https://infeng.github.io/react-viewer/bbbc41dac417d9fb4b275223a6a6d3e8.jpg',
  ],
  location: {
    position: { longitude: 114.104624, latitude: 22.554863 },
    formattedAddress: '广东省深圳市罗湖区桂园街道红岭2118号大院建设集团大厦',
  },
};

class AdvancedForm extends React.Component {
  handleFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  handleFinishFailed = (errors) => {
    console.log('Errors:', errors);
  };

  render() {
    return (
      <ConfigProvider
        commonExtra={{
          picture: '自定义图片默认提示',
        }}
        uploadFn={async (file) => {
          await delay(2000);
          await getBase64(file);
          return '';
        }}
      >
        <FormMate
          style={{ paddingTop: 20 }}
          onFinish={this.handleFinish}
          onFinishFailed={this.handleFinishFailed}
          initialValues={initialValues}
          postInitialValues={(values) => {
            values.file.map((item, index) => {
              item.name = 'custom_name_' + (index + 1);
              return item;
            });

            return values;
          }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 12,
          }}
        >
          <FormMate.Item
            type='picture'
            name='picture'
            label='图片'
            componentProps={{
              filesCountLimit: 4,
              // fileSizeLimit: 500 * 1024,
              // accept: 'image/*',
              // dimensionLimit: '520*360',
              // dimensionLimit: '<520*360',
              // dimensionLimit: '>520*360',
              // dimensionLimit: '520*360,1920*1080',
              // checkImage: ({ name }) => {
              //   console.log(name);
              //   if (/[A-Za-z0-9]*/.test(name.split('.')[0])) {
              //     return '文件名称仅限字母数字';
              //   }
              //   return;
              // },

              onChange: (file) => {
                console.log(file);
              },
            }}
          />
          <FormMate.Item
            type='file-dragger'
            name='file'
            label='文件'
            componentProps={{
              // accept: 'image/*',
              filesCountLimit: 2,
              // onPreview: (file) => { console.log(file) }
            }}
          />
          <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
            <Button type='primary' htmlType='submit' onClick={action('click submit')}>
              提交
            </Button>
          </Form.Item>
        </FormMate>
      </ConfigProvider>
    );
  }
}

export default AdvancedForm;

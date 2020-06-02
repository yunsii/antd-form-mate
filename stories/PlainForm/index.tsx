import * as React from 'react';
import { Button, Space } from 'antd';

import FormMate from '../../src';
import moment from 'moment';
import { ComponentType } from '../../src/interfaces';

export default () => {
  const [formMate] = FormMate.useFormMate();
  const [type, setType] = React.useState<ComponentType | undefined>();

  React.useEffect(() => {
    formMate.setInitialValues({
      date: moment().valueOf(),
      dateRange: [moment().valueOf(), moment().valueOf()],
      number: 48,
      selectSingle: 'earth',
      selectMultiple: ['earth'],
      textarea: '今天也是元气满满的一天',
      password: 'password',
      picture: [
        'https://s2.ax1x.com/2019/09/25/uEvPxI.png',
        'https://infeng.github.io/react-viewer/bbbc41dac417d9fb4b275223a6a6d3e8.jpg',
      ],
      switch: true,
      slider: 48,
      fileDragger: [
        'https://s2.ax1x.com/2019/09/25/uEvPxI.png',
        'http://blog.bizcloudsoft.com/wp-content/uploads/Google-MapReduce%E4%B8%AD%E6%96%87%E7%89%88_1.0.pdf',
      ],
      string: '今天是元气满满的一天',
      checkGroup: ['earth'],
      radioGroup: 'earth',
      numberRange: {
        min: 1,
        max: 3,
      },
      cascader: ['fruit', 'apple'],
    });
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
      type={type}
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
      wrapperCol={{ span: 16 }}
      onReset={() => {
        formMate.resetFieldsValue();
      }}
      grid={{
        col: {
          span: 12,
        },
      }}
    >
      <FormMate.Item type='date' name='date' label='日期' />
      <FormMate.Item type='date-range' name='dateRange' label='日期范围' />
      <FormMate.Item type='number' name='number' label='数值' />
      <FormMate.Item
        type='select'
        name='selectSingle'
        label='选择框（单选）'
        componentProps={{
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
        type='select'
        name='selectMultiple'
        label='选择框（多选）'
        componentProps={{
          mode: 'multiple',
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
      <FormMate.Item type='textarea' name='textarea' label='文本框' />
      <FormMate.Item type='password' name='password' label='密码' />
      <FormMate.Item type='picture' name='picture' label='图片上传' />
      <FormMate.Item type='switch' name='switch' label='开关' />
      <FormMate.Item type='slider' name='slider' label='滑动' />
      <FormMate.Item type='file-dragger' name='fileDragger' label='拖拽上传' />
      <FormMate.Item type='string' name='string' label='纯文本' />
      <FormMate.Item
        type='check-group'
        name='checkGroup'
        label='多选框'
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
        type='radio-group'
        name='radioGroup'
        label='单选框'
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
      <FormMate.Item type='number-range' name='numberRange' label='数值范围' />
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
          <Button
            onClick={() => {
              type !== 'plain' ? setType('plain') : setType(undefined);
            }}
          >
            {type !== 'plain' ? '全部设为 `plain` 类型' : '还原'}
          </Button>
        </Space>
      </FormMate.Item>
    </FormMate>
  );
};

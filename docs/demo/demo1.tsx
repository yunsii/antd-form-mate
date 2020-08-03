import React, { useState, useEffect } from 'react';
import { Button, Input, Space } from 'antd';
import FM from 'antd-form-mate';

import { cascaderOptions, checkOptions, selectOptions } from './options';

export default () => {
  const [values, setValues] = useState<Object>({});
  const [plain, setPlain] = useState(false);

  const [fm] = FM.useFormMate();

  useEffect(() => {
    fm.setInitialValues({
      Plain: 'Plain',
      Cascader: ['vegetable', 'potato'],
      Switch: 1,
    });
  }, []);

  return (
    <div>
      <FM
        style={{ maxWidth: 800 }}
        onFinish={setValues}
        formMate={fm}
        grid={{
          row: {
            gutter: 16,
          },
          col: {
            xs: 12,
          },
        }}
      >
        <FM.Cascader
          name='Cascader'
          label='Cascader'
          plain={plain}
          entryProps={{
            options: cascaderOptions,
          }}
        />
        <FM.CheckGroup
          name='CheckGroup'
          label='CheckGroup'
          plain={plain}
          entryProps={{
            options: checkOptions,
          }}
        />
        <FM.Custom name='Custom' label='Custom'>
          <Input />
        </FM.Custom>
        <FM.Date name='Date' label='Date' />
        <FM.Date
          name='Datetime'
          label='Datetime'
          plain={plain}
          entryProps={{
            showTime: true,
          }}
        />
        <FM.DateRange name='DateRange' label='DateRange' plain={plain} />
        <FM.DateRange
          name='DatetimeRange'
          label='DatetimeRange'
          plain={plain}
          entryProps={{
            showTime: true,
          }}
        />
        <FM.Input name='Input' label='Input' plain={plain} />
        <FM.Input
          name='DynamicInput'
          label='DynamicInput'
          dynamicRender={(form) => form.getFieldValue('Input') === 'hello'}
        />
        <FM.Number name='Number' label='Number' plain={plain} />
        <FM.NumberRange name='NumberRange' label='NumberRange' plain={plain} />
        <FM.Password name='Password' label='Password' />
        <FM.Plain name='Plain' label='Plain' />
        <FM.RadioGroup
          name='RadioGroup'
          label='RadioGroup'
          plain={plain}
          entryProps={{
            options: checkOptions,
          }}
        />
        <FM.Select name='Select' label='Select' entryProps={{ options: selectOptions }} />
        <FM.Slider name='Slider' label='Slider' />
        <FM.Switch name='Switch' label='Switch' />
        <FM.TextArea name='TextArea' label='TextArea' />
        <FM.Time name='Time' label='Time' />
        <FM.TimeRange name='TimeRange' label='TimeRange' />
        <FM.Upload name='Upload' label='Upload' />
        <FM.UploadDragger name='UploadDragger' label='UploadDragger' />
        <FM.Item>
          <Space direction='horizontal'>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
            <Button onClick={() => setPlain(!plain)}>Plain</Button>
          </Space>
        </FM.Item>
      </FM>
      <div style={{ whiteSpace: 'pre-wrap' }}>values: {JSON.stringify(values, undefined, 2)}</div>
    </div>
  );
};

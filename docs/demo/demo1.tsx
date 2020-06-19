import React, { useState } from 'react';
import { Button } from 'antd';
import FormMate from 'antd-form-mate';

export default () => {
  const [values, setValues] = useState<Object>({});

  return (
    <div>
      <FormMate style={{ maxWidth: 400 }} onFinish={setValues}>
        <FormMate.Item name='name' label='Name' />
        <FormMate.Item type='email' name='email' label='Email' />
        <FormMate.Item>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
        </FormMate.Item>
      </FormMate>
      <div style={{ whiteSpace: 'pre-wrap' }}>values: {JSON.stringify(values, undefined, 2)}</div>
    </div>
  );
};

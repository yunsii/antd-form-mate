import * as React from 'react';
import { Form } from 'antd';
import EditableTable from '../../src/lib/components/EditableTable';

export default Form.create()((props) => {
  const { form } = props;
  return (
    <EditableTable
      rowKey='id'
      form={form}
      columns={[
        {
          title: '姓名',
          dataIndex: 'name',
          formItemConfig: {
            type: 'string',
            fieldProps: {
              initialValue: "xxx",
            }
          },
        },
        {
          title: '性别',
          dataIndex: 'gender',
          formItemConfig: {
            type: 'string',
            fieldProps: {
              rules: [
                {
                  max: 7,
                }
              ],
              initialValue: "女",
            }
          },
        },
        {
          title: '生日',
          dataIndex: 'birthday',
          formItemConfig: {
            type: 'date'
          },
        },
      ]}
      initialData={[
        {
          id: 123,
          gender: "男",
          name: 'xys',
        },
        {
          id: 23,
          gender: "女",
          name: 'theprimone',
        },
      ]}
    />
  )
})

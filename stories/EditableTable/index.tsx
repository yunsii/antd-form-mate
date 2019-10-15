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
          title: '索引',
          dataIndex: 'id',
          formItemConfig: {
            type: 'string',
            fieldProps: {
              rules: [
                {
                  max: 7,
                }
              ],
              initialValue: "ASDF",
            }
          },
        },
        {
          title: '姓名',
          dataIndex: 'name',
          formItemConfig: {
            type: 'string'
          },
        },
      ]}
      initialData={[
        {
          id: "DQFDQW",
          name: 'xys',
        },
        {
          id: "SDGEDA",
          name: 'theprimone',
        },
      ]}
    />
  )
})

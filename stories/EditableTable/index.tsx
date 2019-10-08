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
        },
        {
          title: '姓名',
          dataIndex: 'name',
        },
      ]}
      initialData={[
        {
          id: 12,
          name: 'xys',
        },
      ]}
    />
  )
})

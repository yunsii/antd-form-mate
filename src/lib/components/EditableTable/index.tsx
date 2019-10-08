/* eslint-disable react/no-multi-comp */
import React, { PureComponent, useContext } from 'react';
import { Table, Form, Spin } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { TableProps, ColumnProps } from 'antd/lib/table';
import { createFormItems } from '../../form-mate';

const EditableTableContext = React.createContext({} as WrappedFormUtils);
const EditableTableProvider = EditableTableContext.Provider;

function EditableCell(props) {
  const form = useContext(EditableTableContext);
  const renderCell = () => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      inputConfig = {},
      ...restProps
    } = props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {createFormItems(form)([
              {
                ...inputConfig,
                field: dataIndex,
                initialValue: record[dataIndex],
              },
            ])}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };

  return renderCell();
}

export interface EditableTableProps<T> extends TableProps<T> {
  form: WrappedFormUtils;
  columns: ColumnProps<T>[];
  initialData: T[];
}

export interface EditableTableState<T> {
  initialData: T[];
  data: T[];
  editingKey: number;
  count: number;
}

function initialState(props: EditableTableProps<any>) {
  const { initialData = [] } = props;
  return {
    initialData: initialData as any[],
    data: initialData as any[],
    editingKey: -1,
    count: initialData.length,
  }
}

class EditableTable extends PureComponent<EditableTableProps<any>, EditableTableState<any>> {
  static getDerivedStateFromProps(props: EditableTableProps<any>, state: EditableTableState<any>) {
    const { initialData } = props;
    const { initialData: initialDataInState } = state;
    if (Array.isArray(initialDataInState) && initialDataInState.length) {
      return {
        initialData,
        data: initialData,
        count: initialData.length,
      }
    }
    return null;
  }

  state = initialState(this.props);

  handleAdd = () => {
    const { data, count } = this.state;
    this.setState({
      data: [
        ...data,
        {
          key: count,
        },
      ],
      editingKey: count,
      count: count + 1,
    });
  };

  handleDelete = (id, key) => {
    const { data } = this.state;
    const doDelete = () => {
      this.setState({
        data: data.filter(item => item.key !== key),
      });
    };
    // if (id) {
    //   dispatch({
    //     type: 'product/deleteBatch',
    //     id,
    //     callback: response => {
    //       if (!response) doDelete();
    //     },
    //   });
    //   return;
    // }
    doDelete();
  };

  handleEditableSave = row => {
    console.log(row);
    const { data } = this.state;
    const newData = [...data];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    console.log('-> row newData', newData);
    this.setState({ data: newData });
  };

  isEditing = record => record.key === this.state.editingKey;

  cancel = (key, record) => {
    if (!record.id) {
      const { data } = this.state;
      this.setState({
        data: data.filter(item => item.id),
        editingKey: -1,
      });
      return;
    }
    const { form } = this.props;
    form.validateFields(error => {
      if (error) return;
      this.setState({ editingKey: -1 });
    });
  };

  save(key) {
    const { form } = this.props;
    form.validateFields((error, row) => {
      if (error) return;
      console.log(row);
      // eslint-disable-next-line react/destructuring-assignment
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: -1 });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: -1 });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const { form, columns } = this.props;
    const { data, initialData } = this.state;
    console.log(initialData);

    const components = {
      body: {
        cell: EditableCell,
      },
    };

    return (
      <Spin spinning={!initialData.length}>
        <EditableTableProvider value={form}>
          <Table
            rowClassName={(_, index) => {
              if (index % 2) {
                return 'table-row';
              }
              return '';
            }}
            components={components}
            bordered
            dataSource={data}
            columns={columns}
            pagination={false}
          />
        </EditableTableProvider>
      </Spin>
    );
  }
}

export default EditableTable;

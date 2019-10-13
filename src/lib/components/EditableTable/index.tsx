/* eslint-disable react/no-multi-comp */
import React, { PureComponent, useContext } from 'react';
import { Table, Form, Spin, Button } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { TableProps, ColumnProps } from 'antd/lib/table';
import { createFormItems, ItemConfig } from '../../form-mate';
import { addDivider } from '../../../utils';

const EditableTableContext = React.createContext({} as WrappedFormUtils);
const EditableTableProvider = EditableTableContext.Provider;

export type FormItemConfig = Pick<ItemConfig, "type" | "fieldProps" | "componentProps" | "component">

export interface EditableColumnProps<T> extends ColumnProps<T> {
  formItemConfig?: FormItemConfig;
}

export interface EditableCellProps<T> {
  editing?: boolean;
  record: T;
  formItemConfig: FormItemConfig,
  dataIndex: string,
  title: string,
  children: any;
}

function EditableCell(props: EditableCellProps<any>) {
  const form = useContext(EditableTableContext);
  const renderCell = () => {
    const {
      editing,
      dataIndex,
      title,
      formItemConfig = {},
      record,
      children,
      ...restProps
    } = props;
    console.log(editing);
    const { fieldProps, ...restFormItemConfig } = formItemConfig;
    return (
      <td {...restProps}>
        {editing && dataIndex ? (
          <Form.Item style={{ margin: 0 }}>
            {createFormItems(form)([
              {
                ...restFormItemConfig,
                field: dataIndex,
                fieldProps: {
                  ...fieldProps,
                  initialValue: record[dataIndex],
                },
                formItemProps: {
                  dense: true,
                }
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
  columns: EditableColumnProps<T>[];
  initialData: T[];
}

export interface EditableTableState<T> {
  initialData: T[];
  data: T[];
  editingKey: number | null;
  count: number;
}

function initialState(props: EditableTableProps<any>) {
  const { initialData = [] } = props;
  return {
    initialData: initialData as any[],
    data: initialData as any[],
    editingKey: null,
    count: initialData.length,
  }
}

class EditableTable extends PureComponent<EditableTableProps<any>, EditableTableState<any>> {
  static getDerivedStateFromProps(props: EditableTableProps<any>, state: EditableTableState<any>) {
    const { initialData } = props;
    const { initialData: initialDataInState } = state;
    if (Array.isArray(initialDataInState) && !initialDataInState.length) {
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

  isEditing = record => record.id === this.state.editingKey;

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

  parseColumns = (columns: EditableColumnProps<any>[]) => {
    console.log(columns);
    return columns.map(col => {
      if (!col.formItemConfig) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          formItemConfig: col.formItemConfig,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
  }

  renderColumns = () => {
    const { columns } = this.props;
    const { editingKey } = this.state;
    const renderOption = ({ text, onClick }) => <a onClick={onClick}>{text}</a>
    const setInitOptionsConfig = (record) => {
      return [
        {
          text: '编辑',
          onClick: () => {
            this.setState({ editingKey: record.id });
          },
        },
        {
          text: '删除',
          onClick: () => { },
        },
      ]
    }
    const setEditOptionsConfig = (record) => {
      let result = setInitOptionsConfig(record);
      result.splice(0, 1,
        {
          text: '保存',
          onClick: () => { },
        },
        {
          text: '取消',
          onClick: () => {
            this.setState({ editingKey: null });
          },
        },
      )
      return result;
    }
    return [
      ...columns,
      {
        title: '操作',
        render: (value, record) => {
          if (editingKey === null) {
            return addDivider(setInitOptionsConfig(record).map(renderOption));
          }
          return addDivider(setEditOptionsConfig(record).map(renderOption));
        }
      }
    ]
  }

  render() {
    const { form } = this.props;
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
          <Button type='primary' style={{ margin: '12px 0' }}>新建</Button>
          <Table
            rowKey='id'
            rowClassName={(_, index) => {
              if (index % 2) {
                return 'table-row';
              }
              return '';
            }}
            components={components}
            bordered
            dataSource={data}
            columns={this.parseColumns(this.renderColumns())}
            pagination={false}
          />
        </EditableTableProvider>
      </Spin>
    );
  }
}

export default EditableTable;

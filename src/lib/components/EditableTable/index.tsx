/* eslint-disable react/no-multi-comp */
import React, { PureComponent, useContext } from 'react';
import { Table, Form, Spin, Button } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { TableProps, ColumnProps } from 'antd/lib/table';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import { createFormItems, ItemConfig } from '../../form-mate';
import { addDivider } from '../../../utils';
import styles from './index.less';

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

function setInitialRecord(columns: EditableColumnProps<any>[]) {
  const result = {};
  columns.forEach(element => {
    const initialValue = _get(element, 'formItemConfig.fieldProps.initialValue');
    if (element.dataIndex && initialValue) {
      result[element.dataIndex] = initialValue;
    }
  });
  return result;
}

function setInitialData(initialData) {
  return initialData.map((item, index) => {
    return {
      ...item,
      key: index + 1,
    }
  })
}

function initialState(props: EditableTableProps<any>) {
  const { initialData = [], columns } = props;
  return {
    initialData: setInitialData(initialData) as any[],
    data: setInitialData(initialData) as any[],
    editingKey: null,
    count: initialData.length,
    initialRecord: setInitialRecord(columns),
  }
}

class EditableTable extends PureComponent<EditableTableProps<any>, EditableTableState<any>> {
  static getDerivedStateFromProps(props: EditableTableProps<any>, state: EditableTableState<any>) {
    const { initialData } = props;
    const { initialData: initialDataInState } = state;
    if (Array.isArray(initialDataInState) && !initialDataInState.length) {
      return {
        initialData,
        data: setInitialData(initialData),
        count: setInitialData(initialData).length,
      }
    }
    return null;
  }

  state = initialState(this.props);

  handleAdd = () => {
    const { data, count, initialRecord } = this.state;
    console.log(initialRecord);
    this.setState({
      data: [
        ...data,
        {
          key: count + 1,
          ...initialRecord,
        },
      ],
      editingKey: count + 1,
      count: count + 1,
    });
  };

  handleDelete = (record) => {
    const { data } = this.state;
    const doDelete = () => {
      this.setState({
        data: data.filter(item => item.key !== record.key),
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

  isEditingRecord = record => record.key === this.state.editingKey;

  handleCancel = (record) => {
    if (!record.id) {
      const { data } = this.state;
      this.setState({
        data: data.filter(item => item.id),
        editingKey: null,
      });
      return;
    }
    const { form } = this.props;
    form.validateFields(error => {
      if (error) return;
      this.setState({ editingKey: null });
    });
  };

  handleSave = (key) => {
    const { form } = this.props;
    form.validateFields((error, row) => {
      if (error) return;
      console.log(row);
      const { data } = this.state;
      // eslint-disable-next-line react/destructuring-assignment
      const newData = _cloneDeep(data);
      const item = newData[key - 1];
      newData.splice(key - 1, 1, {
        ...item,
        ...row,
      });
      this.setState({ data: newData, editingKey: null });
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  parseColumns = (columns: EditableColumnProps<any>[]) => {
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
          editing: this.isEditingRecord(record),
        }),
      };
    });
  }

  renderColumns = () => {
    const { columns } = this.props;
    const { editingKey } = this.state;
    const renderOption = ({ text, onClick }) => {
      if (!onClick) {
        return <span key={text} className={styles.notAllow}>{text}</span>
      }
      return (
        <a key={text} onClick={onClick}>{text}</a>
      )
    }
    const setInitOptionsConfig = (record) => {
      let result = [
        {
          text: '编辑',
          onClick: () => {
            this.setState({ editingKey: record.key });
          },
        },
        {
          text: '删除',
          onClick: () => this.handleDelete(record),
        },
      ];
      if (editingKey && editingKey !== record.key) {
        return result.map(item => ({ text: item.text }));
      }
      return result;
    }
    const setEditOptionsConfig = (record) => {
      let result: any = setInitOptionsConfig(record);
      result.splice(0, 1,
        {
          text: '保存',
          onClick: () => this.handleSave(record.key),
        },
        {
          text: '取消',
          onClick: () => this.handleCancel(record),
        },
      )
      return result;
    }
    return [
      ...columns,
      {
        title: '操作',
        render: (value, record) => {
          if (editingKey === null || editingKey !== record.key) {
            return addDivider(setInitOptionsConfig(record).map(renderOption));
          }
          return addDivider(setEditOptionsConfig(record).map(renderOption));
        }
      }
    ]
  }

  render() {
    const { form } = this.props;
    const { data, initialData, editingKey } = this.state;

    const components = {
      body: {
        cell: EditableCell,
      },
    };

    return (
      <Spin spinning={!initialData.length}>
        <EditableTableProvider value={form}>
          <Button
            type='primary'
            style={{ margin: '12px 0' }}
            onClick={this.handleAdd}
            disabled={!!editingKey}
          >
            新建
          </Button>
          <Table
            rowKey='key'
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

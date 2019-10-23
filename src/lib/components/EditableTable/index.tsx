/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import { Table, Spin, Button } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { TableProps, ColumnProps } from 'antd/lib/table';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import { ItemConfig } from '../../form-mate';
import { addDivider } from '../../../utils';
import { setRenderForColumn } from './utils';
import styles from './index.less';
import { EditableTableContext } from './FormContext';
import EditableCell from './EditableCell';

const EditableTableProvider = EditableTableContext.Provider;

export type FormItemConfig = Pick<ItemConfig, "type" | "fieldProps" | "componentProps" | "component">

export type OmittedTableProps<T> = Omit<TableProps<T>, 'onChange'>

export interface DefaultRecordParams { id: number | string }

export interface EditableColumnProps<T> extends ColumnProps<T> {
  formItemConfig?: FormItemConfig;
}

export interface EditableTableProps<T> extends OmittedTableProps<T> {
  form: WrappedFormUtils;
  columns: EditableColumnProps<T>[];
  initialData: T[];
  onCreate: (fieldsValue: T & { key: number }) => Promise<boolean | void>;
  onUpdate: (fieldsValue: T & { key: number }) => Promise<boolean | void>;
  onDelete: (record: T & { key: number }) => Promise<boolean | void>;
}

export interface EditableTableState<T> {
  initialData: (T & { key: number })[];
  data: (T & { key: number })[];
  initialRecordValues: T;
  editingKey: number | null;
  count: number;
  tableLoading: boolean;
}

function setEditInitialValues<T>(columns: EditableColumnProps<T>[]) {
  const result = {};
  columns.forEach(element => {
    const initialValue = _get(element, 'formItemConfig.fieldProps.initialValue');
    if (element.dataIndex && initialValue) {
      result[element.dataIndex] = initialValue;
    }
  });
  return result as T;
}

function setInitialData<T>(initialData: T[]) {
  return initialData.map((item, index) => {
    return {
      ...item,
      key: index + 1,
    }
  })
}

function initialState<T>(props: EditableTableProps<T>) {
  const { initialData = [], columns } = props;
  return {
    initialData: setInitialData(initialData),
    data: setInitialData(initialData),
    editingKey: null,
    count: initialData.length,
    initialRecordValues: setEditInitialValues(columns),
    tableLoading: false,
  }
}

export default class EditableTable<T extends DefaultRecordParams> extends PureComponent<EditableTableProps<T>, EditableTableState<T>> {
  static defaultProps = {
    loading: false,
    onCreate: () => true,
    onUpdate: () => true,
    onDelete: () => true,
  }

  static getDerivedStateFromProps<T extends DefaultRecordParams>(props: EditableTableProps<T>, state: EditableTableState<T>) {
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

  handleLoading = async (func: () => Promise<boolean | void>) => {
    this.setState({
      tableLoading: true,
    });
    const result = await func();
    this.setState({
      tableLoading: false,
    });
    return result;
  }

  handleAdd = () => {
    const { data, count, initialRecordValues } = this.state;
    console.log(initialRecordValues);
    this.setState({
      data: [
        ...data,
        {
          key: count + 1,
          ...initialRecordValues,
        },
      ],
      editingKey: count + 1,
      count: count + 1,
    });
  };

  handleDelete = async (record: T & { key: number }) => {
    const { onDelete } = this.props;
    const { data } = this.state;

    const isOk = await this.handleLoading(async () => await onDelete(record));
    if (isOk !== false) {
      this.setState({
        data: data.filter(item => item.key !== record.key),
      });
    }
  };

  isEditingRecord = (record: T & { key: number }) => record.key === this.state.editingKey;

  handleCancel = (record: T) => {
    if (!record.id) {
      const { data } = this.state;
      this.setState({
        data: data.filter(item => item.id),
        editingKey: null,
      });
      return;
    }
    this.setState({ editingKey: null });
  };

  handleSave = (key: number) => {
    const { form, onCreate, onUpdate } = this.props;
    form.validateFields(async (error, fieldsValue) => {
      if (error) return;
      console.log(fieldsValue);
      const { data } = this.state;
      const newData = _cloneDeep(data);
      const targetIndex = _findIndex(newData, item => item.key === key);
      const targetItem = newData[targetIndex];
      const newRecord = {
        ...targetItem,
        ...fieldsValue,
      };
      const { id } = newRecord;
      let isOk: boolean | void = true;
      if (id !== undefined) {
        isOk = await this.handleLoading(async () => await onUpdate(newRecord));
      } else {
        isOk = await this.handleLoading(async () => await onCreate(newRecord));
      }

      if (isOk !== false) {
        newData.splice(targetIndex, 1, newRecord);
        this.setState({ data: newData, editingKey: null });
      }
    });
  }

  edit(key: number) {
    this.setState({ editingKey: key });
  }

  parseColumns = (columns: EditableColumnProps<T>[]) => {
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

    const renderOption = ({ text, onClick }: { text: string, onClick: any }) => {
      if (!onClick) {
        return <span key={text} className={styles.notAllow}>{text}</span>
      }
      return (
        <a key={text} onClick={onClick}>{text}</a>
      )
    }

    const setInitOptionsConfig = (record: T & { key: number }) => {
      let result: { text: string; onClick: (() => void) | undefined }[] = [
        {
          text: '编辑',
          onClick: () => { this.setState({ editingKey: record.key }) },
        },
        {
          text: '删除',
          onClick: () => { this.handleDelete(record) },
        },
      ];
      if (editingKey && editingKey !== record.key) {
        return result.map(item => ({ text: item.text, onClick: undefined }));
      }
      return result;
    }

    const setEditOptionsConfig = (record: T & { key: number }) => {
      let result = setInitOptionsConfig(record);
      result.splice(0, 1,
        {
          text: '保存',
          onClick: () => { this.handleSave(record.key) },
        },
        {
          text: '取消',
          onClick: () => { this.handleCancel(record) },
        },
      )
      return result;
    }

    return [
      ...columns.map(setRenderForColumn),
      {
        title: '操作',
        render: (_: void, record: T & { key: number }) => {
          if (editingKey === null || editingKey !== record.key) {
            return addDivider(setInitOptionsConfig(record).map(renderOption));
          }
          return addDivider(setEditOptionsConfig(record).map(renderOption));
        }
      }
    ]
  }

  render() {
    const { form, loading } = this.props;
    const { data, initialData, editingKey, tableLoading } = this.state;

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
            loading={loading || tableLoading}
          />
        </EditableTableProvider>
      </Spin>
    );
  }
}

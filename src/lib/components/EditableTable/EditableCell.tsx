/* eslint-disable react/no-multi-comp */
import React, { useContext } from 'react';
import { Form } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import { createFormItems } from '../../../index';
import { ItemConfig } from '../../props';
import { EditableTableContext } from './FormContext';

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

export default function EditableCell<T>(props: EditableCellProps<T>) {
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

/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Form } from 'antd';
import { ColumnType } from 'antd/lib/table';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import { createFormItems } from '../../../index';
import { ItemConfig } from '../../props';

export type FormItemConfig = Pick<ItemConfig, "type" | "componentProps" | "component">

export interface EditableColumnProps<T> extends ColumnType<T> {
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
    return (
      <td {...restProps}>
        {editing && dataIndex ? (
          <Form.Item style={{ margin: 0 }}>
            {createFormItems([
              {
                ...formItemConfig,
                field: dataIndex,
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

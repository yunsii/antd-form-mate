<h1 align="center">antd-form-mate</h1>

<div align="center">

基于 ant design 的表单组件，配置化实现表单功能。

[![GitHub license](https://img.shields.io/github/license/theprimone/antd-form-mate.svg)](https://github.com/theprimone/antd-form-mate/blob/master/LICENSE)
[![npm Version](https://img.shields.io/npm/v/antd-form-mate.svg)](https://www.npmjs.com/package/antd-form-mate)
[![GitHub stars](https://img.shields.io/github/stars/theprimone/antd-form-mate.svg)](https://github.com/theprimone/antd-form-mate/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/theprimone/antd-form-mate.svg)](https://github.com/theprimone/antd-form-mate/issues)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/theprimone/antd-form-mate.svg)](https://github.com/theprimone/antd-form-mate/commits/master)

</div>

![antd-form-mate-basic.png](https://i.loli.net/2019/12/19/B6mUZEedoihkGfM.png)

**[在线预览 ->](http://theprimone.github.io/antd-form-mate)**

## 安装

```shell
npm i -S antd-form-mate
```

## 开发

基于 [Storybook](https://storybook.js.org/docs/guides/guide-react/) 开发调试。

```shell
$ git clone https://github.com/theprimone/antd-form-mate.git
$ cd antd-form-mate
$ npm install
$ npm start
```
## 使用

由于没有打包发布的经验，所以在 3.0.0 之前的版本除了一些未知的 bug 外，可能会存在一些兼容性问题。此次重构到 3.0.0 后，后续发包当慎重起见。

### 可配置类型

|    | 类型               | 备注          |
|----|--------------------|--------------|
| 1  | `custom`          | 自定义组件类型      |
| 2  | `date`            |              |
| 3  | `datetime`        |              |
| 4  | `date-range`     | 日期范围         |
| 5  | `datetime-range` | 日期时间范围       |
| 6  | `number`          |              |
| 7  | `select`          |              |
| 8  | `textarea`        |              |
| 9  | `password`        |              |
| 10 | `picture`         |              |
| 11 | `switch`          |              |
| 12 | `slider`          | 滑动输入         |
| 13 | `file-dragger`   |              |
| 14 | `string`          | **默认类型** |
| 15 | `location`        | 地址录入，基于高德地图  |
| 16 | `check-group`    | 多选框          |
| 17 | `radio-group`    | 单选框          |
| 18 | `hidden`          | 隐藏字段         |

### API

#### 表单项

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 上述类型 | [`ComponentType`](/src/lib/props.ts#L19) | `'string'` |
| `field` | 字段名 | `string` | - |
| `formItemProps` | Form.Item 支持的属性，新增 `dense` 属性使得 Form.Item 的 `marginBottom` 为 0 | 扩展 [FormItemProps](https://ant.design/components/form-cn/#Form.Item) | - |
| `fieldProps` | 字段值属性  | [GetFieldDecoratorOptions](https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-%E5%8F%82%E6%95%B0) | - |
| `componentProps` | 额外的组件属性 | [`ComponentProps`](/src/lib/props.ts#L50) | - |
| `component` | 自定义的组件，仅当 `type` 为 `'custom'` 时可用 | `JSX.Element` | - |

### 基础用法

```tsx
import * as React from 'react';
import { Form, Button } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { createFormItems } from 'antd-form-mate';
import { ItemConfig } from 'antd-form-mate/dist/lib/form-mate';

export interface FormProps {
  form: WrappedFormUtils;
}

const BasicForm: React.FC<FormProps> = (props) => {
  const { form } = props;
  
  const getFormItems = (detail: any = {}): ItemConfig[] => {
    return [
      {
        type: 'hidden',
        field: 'hidden',
        fieldProps: {
          initialValue: 1,
        },
      },
      {
        type: 'string',
        field: 'name',
        formItemProps: {
          label: '姓名',
        },
        fieldProps: {
          initialValue: detail.name,
          rules: [{ required: true, message: '请输入姓名！' }],
        },
      },
    ];
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { form } = props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  return (
    <Form style={{ marginTop: 20 }}>
      {createFormItems(form)(getFormItems())}
      <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
        <Button
          type="primary"
          onClick={handleSubmit}
        >
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Form.create()(BasicForm as any);
```

### 全局配置

表单全局配置可见 [`ConfigProvider`](/src/config-provider/index.tsx#L33) ，使用可参考 [`stories/BasicForm/index.tsx`](/stories/BasicForm/index.tsx#299)

### 备注

另，内部使用的[部分组件和函数](/src/index.ts)已导出。

未尽事宜，可参考 [index.stories.tsx](/stories/index.stories.tsx) 。

## EditableTable

结合前一节配置化表单实现的可编辑表格

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `form` | `Form.create()` 注入的表单对象 | WrappedFormUtils | - |
| `columns` | 扩展列模型 | [`EditableColumnProps`](/src/lib/components/EditableTable/index.tsx#L24) | - |
| `initialData` | 表格初始化数据 | `T[]` | - |
| `onCreate` | 点击保存后该记录无 `id` 触发该事件  | `(fieldsValue: T & { key: number }) => Promise<boolean \| void>` | - |
| `onUpdate` | 点击保存后该记录有 `id` 触发该事件 | `(fieldsValue: T & { key: number }) => Promise<boolean \| void>` | - |
| `onDelete` | 删除点击事件，仅当该记录有 `id` 时触发 | `(record: T & { key: number }) => Promise<boolean \| void>` | - |
| `onDataChange` | 表格数据更新事件，切忌用于更新同一数据源的 `initialData` ，否者会导致表格无法正常编辑。更新 `initialData` 应只用于不同对象之间。 | `(data: T[]) => void` | - |
| `onCancel` | 取消编辑点击事件 | `(prevRecord: T & { key: number }, record: T & { key: number }) => void` | - |
| `onRecordAdd` | 当添加一条记录时，需要写入额外的默认值时可调用该方法 | `(initialRecord: T, prevData: T[]) => T` | - |
| `editingKey` | 获取正在编辑的 `key` | `React.ElementType` | - |
| `loading` | 加载中状态 | `boolean` | - |

#### 关于 `key`

内部使用自增变量作为每条记录的 `key` ，故反复删除添加仍能保证 `key` 的唯一性。

### 基础用法

参考 [EditableTable/index.tsx](/stories/EditableTable/index.tsx) 。

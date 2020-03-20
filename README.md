<h1 align="center">antd-form-mate</h1>

<div align="center">

基于 ant design 的表单组件，配置化实现表单功能。

[![GitHub license](https://img.shields.io/github/license/zpr1g/antd-form-mate.svg)](https://github.com/zpr1g/antd-form-mate/blob/master/LICENSE)
[![npm Version](https://img.shields.io/npm/v/antd-form-mate.svg)](https://www.npmjs.com/package/antd-form-mate)
[![GitHub stars](https://img.shields.io/github/stars/zpr1g/antd-form-mate.svg)](https://github.com/zpr1g/antd-form-mate/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/zpr1g/antd-form-mate.svg)](https://github.com/zpr1g/antd-form-mate/issues)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/zpr1g/antd-form-mate.svg)](https://github.com/zpr1g/antd-form-mate/commits/master)

</div>

![antd-form-mate-basic.png](https://i.loli.net/2020/02/20/lOFpTMW75JukNZC.png)

**[在线预览 ->](http://zpr1g.github.io/antd-form-mate)**

## 安装

```shell
npm i -S antd-form-mate
```

## 开发

基于 [Storybook](https://storybook.js.org/docs/guides/guide-react/) 开发调试。

```shell
$ git clone https://github.com/zpr1g/antd-form-mate.git
$ cd antd-form-mate
$ npm install
$ npm start
```
## 使用

由于没有打包发布的经验，所以在 3.0.0 之前的版本除了一些未知的 bug 外，可能会存在一些兼容性问题。此次重构到 3.0.0 后，后续发包当慎重起见。

### 内建类型

|    | 类型               | 备注          |
|----|--------------------|--------------|
| 1  | `custom`          | 自定义组件类型，通过 `component` 属性传入组件 |
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
| 15 | `check-group`    | 多选框          |
| 16 | `radio-group`    | 单选框          |
| 17 | `dynamic`          | 条件渲染         |
| 18 | `number-range`     | 数字区间         |
| 19 | `cascader`       | 级联选择         |

除此之外，可通过 [`registerComponent`](/src/index.ts#L11) 方法注册组件实现类型扩展或重写除 `custom` 和 `dynamic` 类型外的组件。

#### 表单实战总结

1. 对于**特殊类型**的字段值在设置初始值时可构造为组件内部的所需的值类型，以便后续表单值的统一处理，避免一些繁琐的判断。特殊类型像日期时间（ `moment` ）、选择（ `(string | number)[]` ）、文件（ `{ uid: string, name: string url: string, status: "done" }[]` ）、开关（ `boolean` ）等，

### API

#### 表单项

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 上述类型 | [`ComponentType`](/src/lib/props.ts#L19) | `'string'` |
| `name` | 字段名 | [`NamePath`](https://next.ant.design/components/form-cn/#NamePath) | - |
| `formItemProps` | Form.Item 支持的属性，新增 `dense` 属性使得 Form.Item 的 `marginBottom` 为 0 | 扩展 [FormItemProps](https://ant.design/components/form-cn/#Form.Item) | - |
| `componentProps` | 额外的组件属性 | [`ComponentProps`](/src/lib/props.ts#L50) | - |
| `component` | 自定义的组件，仅当 `type` 为 `'custom' \| 'dynamic'` 时可用 | FormItemProps['children'] | - |
| `generateFn` | 自定义的组件，仅当 `type` 为 `'dynamic'` 时可用，快速实现本组件支持的其他类型组件的动态渲染 | `(form: FormInstance) => GenerateItemConfig \| null` | - |

此外，每个表单项都有[默认布局](/src/defaultConfig.ts#L6)，如果没有 `label` 属性，输入部分会撑满容器。

### 基础用法

```tsx
import * as React from 'react';
import { Form, Button } from 'antd';
import { createFormItems } from 'antd-form-mate';
import { ItemConfig } from 'antd-form-mate/dist/lib/form-mate';


const BasicForm: React.FC = (props) => {
  const [form] = Form.useForm();

  const initialValues = {
    'hidden': 1,
  }
  
  const getFormItems = (): ItemConfig[] => {
    return [
      {
        type: 'string',
        name: 'name',
        formItemProps: {
          label: '姓名',
          rules: [{ required: true, message: '请输入姓名！' }],
        },
      },
    ];
  }

  const handleFinish = (values) => {
    console.log('Received values of form: ', values);
  }

  const handleFinishFailed = (errors) => {
    console.log('Errors:', errors);
  }

  return (
    <Form 
      style={{ marginTop: 20 }}
      form={form}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      initialValues={initialValues}
    >
      {createFormItems(getFormItems())}
      <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
        <Button
          type="primary"
          htmlType="submit"
        >
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BasicForm;
```

### 全局配置

表单全局配置可见 [`ConfigProvider`](/src/config-context/index.tsx#L20) ，使用可参考 [`stories/BasicForm/index.tsx`](/stories/BasicForm/index.tsx#L285)

### 备注

另，内部使用的[部分组件和函数](/src/index.ts)已导出。

未尽事宜，可参考 [index.stories.tsx](/stories/index.stories.tsx) 。

## 模块

### 组件

将注册新类型的模块称为组件。

|    | 仓库 | 说明 |
| -- | ---- | ---- |
| 1  | [antd-form-mate-location](https://github.com/zpr1g/antd-form-mate-location) | 高德地图地理位置录入 |

## 扩展

将基于本组件实现新功能的模块称为扩展。

|    | 仓库 | 说明 |
| -- | ---- | ---- |
| 1  | [antd-form-mate-editable](https://github.com/zpr1g/antd-form-mate-editable) | 可编辑表格 |

## To Do

- [x] [antd-form-mate-v4](https://github.com/zpr1g/antd-form-mate/projects/1)

## 升级

### 从 v3 到 v4

根据官方的表单升级说明——[从 v3 到 v4](https://next.ant.design/components/form/v3-cn)，也对本组件进行了相应的重构，v3 版本时，可不使用 `Form` 组件包裹生成的表单项，新版本充分利用了 `Form` 组件管理数据。下面总结几点本组件从 v3 到 v4 的注意事项：

1. 移除 `hidden` 类型，新版表单组件通过 `initialValues` 统一配置初始值，当需要隐藏类型的字段时，直接添加到 `initialValues` 即可。
2. 新增 `dynamic` 类型，可根据条件动态渲染某个字段。结合 `generateFn` 属性，可以快速实现本组件支持的其他类型组件的动态渲染。具体可参考 [`stories/BasicForm/index.tsx`](/stories/BasicForm/index.tsx#L253) 。
3. 移除 `afmLocale` 属性，通过 `IntlProvider` 配置国际化。
4. 移除扩展 `DatePicker` 中的 `onlyAfterToday` 和 `todayAndBefore` 属性，使用 `disabledPastDays` 和 `disabledFutureDays` 代替。
5. 重命名 `pictureFormateLimit` 属性为 `pictureAccept` ，并将默认值设为 `'image/*'` 。
6. 移除默认文件大小为 500M 的限制。
7. 修正笔误，配置全局属性中的 `commen` 改为 `common`
8. 移除默认的 `extra` 属性：

```js
export const defaultExtra = {
  picture: "请上传图片",
};
```

9. 新增 `registerComponent` 功能，可通过注册组件实现类型扩展或重写已有类型的组件。此外通过这种方式将 `location` 类型组件剥离到 [antd-form-mate-location](https://github.com/zpr1g/antd-form-mate-location) ，可单独安装使用。
10. 新增 `withCol` 属性，可直接让每个组件被 `Col` 组件包裹。特别的，当同时使用了 `withCol` 功能 、 `dynamic` 类型和 `component` 字段时，切记返回组件时一定要使用 `Col` 组件包裹，因此，该场景下尽可能的使用 `generateFn` 即可避免这样繁琐的问题（如果内建组件没有需要的组件，可以试试 `registerComponent` ）。之所以这样是由于该函数由 `Form` 组件去执行，当主动去调用时，`form` 的实例还没与 `Form` 绑定，会报警告：

```
Warning: Instance created by `useForm` is not connect to any Form element. Forget to pass `form` prop?
```

11. 移除上传组件的 `countLimitHint` ，`sizeLimitHint` 和 `imageLimitHint` ，使用国际化的 `hint` 字段实现。
12. 移除 `EditableTable` 组件和 `addDivider` 工具方法。剥离到 [antd-form-mate-editable](https://github.com/zpr1g/antd-form-mate-editable) ，单独安装使用。
13. 替换 `select` ， `check-group` 和 `radio-group` 中选项的 `text` 字段，使用默认的 `label` 字段。

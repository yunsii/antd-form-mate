<h1 align="center">antd-form-mate</h1>

<div align="center">

基于 ant design 的表单组件，配置化实现表单功能。

[![GitHub license](https://img.shields.io/github/license/theprimone/antd-form-mate.svg)](https://github.com/theprimone/antd-form-mate/blob/master/LICENSE)
[![npm Version](https://img.shields.io/npm/v/antd-form-mate.svg)](https://www.npmjs.com/package/antd-form-mate)
[![GitHub stars](https://img.shields.io/github/stars/theprimone/antd-form-mate.svg)](https://github.com/theprimone/antd-form-mate/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/theprimone/antd-form-mate.svg)](https://github.com/theprimone/antd-form-mate/issues)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/theprimone/antd-form-mate.svg)](https://github.com/theprimone/antd-form-mate/commits/master)

</div>

![basic.png](https://s2.ax1x.com/2019/08/05/eRsRjH.png)
<p align="center">基础表单项</p>

![advanced.png](https://s2.ax1x.com/2019/08/05/eRs2ge.png)
<p align="center">高级表单项</p>

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

### 可配置类型

1. `custom` 自定义组件类型
2. `date` 日期
3. `datetime` 日期时间
3. `date-range` 日期范围
4. `datetime-range` 日期时间范围
5. `number`
6. `select`
7. `textarea`
8. `password`
9. `picture`
10. `switch`
11. `slider` 滑动输入
12. `file-dragger`
13. `string` **默认类型**
14. `location` 地址录入，基于高德地图
15. `check-group` 多选框
16. `radio-group` 单选框
17. `hidden` 隐藏字段

### API

### 表单项

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 上述类型 | [`ComponentType`](./src/antd-form-mate.tsx#L181) | `'string'` |
| `field` | 字段名 | `string` | - |
| `formItemProps` | Form.Item 支持的配置，新增 `dense` 属性配置 Form.Item `marginBottom` 为 0 | 扩展 [FormItemProps](https://ant.design/components/form-cn/#Form.Item) | - |
| `fieldProps` | 字段值配置  | [GetFieldDecoratorOptions](https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-%E5%8F%82%E6%95%B0) | - |
| `componentProps` | 额外的组件配置 | [`ComponentProps`](./src/antd-form-mate.tsx#L203) | - |
| `component` | 自定义的组件，仅当 `type` 为 `'custom'` 时可用 | `React.ElementType` | - |

### 基础用法

```tsx
import { Form, Button } from 'antd';
import { createFormItems } from 'antd-form-mate';
import { ItemConfig } from 'antd-form-mate/dist/lib/form-mate';

export interface FormProps {
  form: any
}

class BasicForm extends React.Component<FormProps, null> {
  setFormItemsConfig = (detail: any = {}): ItemConfig[] => {
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { form } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
        {createFormItems(form)(this.setFormItemsConfig({}))}
        <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={action('click submit')}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(BasicForm as any);
```

未尽事宜，可参考 [index.stories.tsx](/stories/index.stories.tsx) 。

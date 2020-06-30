import React from 'react';
import { Input, InputNumber, Slider, Cascader, Switch, TimePicker } from 'antd';
import CustomDatePicker, {
  CustomRangePicker,
} from './components/CustomDatePicker/index';
import CustomSelect from './components/CustomSelect/index';
import CustomTreeSelect from './components/CustomTreeSelect/index';
import PicturesWall from './components/PicturesWall/index';
import CustomDragger from './components/CustomDragger';
import CustomCheckGroup from './components/CustomCheckGroup/index';
import CustomRadioGroup from './components/CustomRadioGroup/index';
import InputNumberRange from './components/InputNumberRange';
import { ComponentType, ComponentProps } from './interfaces';

import { InjectIntl } from './components/FormMate/utils';

const registeredComponents = new Map<any, React.ReactNode>();

export function registerComponent(type: string, component: JSX.Element) {
  registeredComponents.set(type, component);
}

registerComponent('date', <CustomDatePicker />);
registerComponent('time', <TimePicker />);
registerComponent('datetime', <CustomDatePicker showTime />);
registerComponent('date-range', <CustomRangePicker format='YYYY-MM-DD' />);
registerComponent('time-range', <TimePicker.RangePicker picker='time' />);
registerComponent(
  'datetime-range',
  <CustomRangePicker format='YYYY-MM-DD HH:mm:ss' showTime />
);
registerComponent(
  'number',
  <InjectIntl
    propName='placeholder'
    intlPath='placeholder.number'
    intlDefaultMessage='请输入'
  >
    <InputNumber />
  </InjectIntl>
);
registerComponent('number-range', <InputNumberRange />);
registerComponent(
  'select',
  <InjectIntl
    propName='placeholder'
    intlPath='placeholder.select'
    intlDefaultMessage='请选择'
  >
    <CustomSelect />
  </InjectIntl>
);
registerComponent(
  'tree-select',
  <InjectIntl
    propName='placeholder'
    intlPath='placeholder.select'
    intlDefaultMessage='请选择'
  >
    <CustomTreeSelect />
  </InjectIntl>
);
registerComponent(
  'textarea',
  <InjectIntl
    propName='placeholder'
    intlPath='placeholder.textarea'
    intlDefaultMessage='请输入'
  >
    <Input.TextArea />
  </InjectIntl>
);
registerComponent(
  'password',
  <InjectIntl
    propName='placeholder'
    intlPath='placeholder.password'
    intlDefaultMessage='请输入密码'
  >
    <Input.Password />
  </InjectIntl>
);
registerComponent('picture', <PicturesWall />);
registerComponent('switch', <Switch />);
registerComponent('slider', <Slider />);
registerComponent('file-dragger', <CustomDragger />);
registerComponent('check-group', <CustomCheckGroup />);
registerComponent('radio-group', <CustomRadioGroup />);
registerComponent('picture', <PicturesWall />);
registerComponent(
  'string',
  <InjectIntl
    propName='placeholder'
    intlPath='placeholder.string'
    intlDefaultMessage='请输入'
  >
    <Input />
  </InjectIntl>
);
registerComponent(
  'cascader',
  <InjectIntl
    propName='placeholder'
    intlPath='placeholder.select'
    intlDefaultMessage='请选择'
  >
    <Cascader />
  </InjectIntl>
);

export type ComponentMap = {
  [key in ComponentType]?: [
    React.ComponentClass | React.FC | React.ExoticComponent,
    ComponentProps?
  ];
};

const getComponent = (type: ComponentType) => {
  const result = registeredComponents.get(type);
  return result || registeredComponents.get('string');
};

export default getComponent;

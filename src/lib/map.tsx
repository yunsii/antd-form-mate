import React from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { Input, InputNumber, Slider, Switch } from "antd";
import CustomDatePicker, { CustomRangePicker } from "./item-components/CustomDatePicker/index";
import CustomSelect from "./item-components/CustomSelect/index";
import PicturesWall from "./item-components/PicturesWall/index";
import CustomDragger from "./item-components/CustomDragger";
import CustomCheckGroup from "./item-components/CustomCheckGroup/index";
import CustomRadioGroup from "./item-components/CustomRadioGroup/index";
import {
  ComponentType,
  ComponentProps,
} from "./props";

import { InjectIntl } from './utils';

const registeredComponents = new Map();

export function registerComponent(type: string, component: JSX.Element) {
  registeredComponents.set(type, component);
}

registerComponent('date', <CustomDatePicker />);
registerComponent('datetime', <CustomDatePicker showTime />);
registerComponent('date-range', <CustomRangePicker format='YYYY-MM-DD' />);
registerComponent('datetime-range', <CustomRangePicker format='YYYY-MM-DD HH:mm:ss' showTime />);
registerComponent('number', (
  <InjectIntl
    propName='placeholder'
    intlPath='placeholder.number'
    intlDefaultMessage='请输入'
  >
    <InputNumber />
  </InjectIntl>
));
registerComponent('select', (
  <InjectIntl
    propName='placeholder'
    intlPath='placeholder.select'
    intlDefaultMessage='请选择'
  >
    <CustomSelect />
  </InjectIntl>
));
registerComponent('textarea', (
  <InjectIntl
    propName='placeholder'
    intlPath='placeholder.textarea'
    intlDefaultMessage='请输入'
  >
    <Input.TextArea />
  </InjectIntl>
));
registerComponent('password', (
  <InjectIntl
    propName='placeholder'
    intlPath='placeholder.password'
    intlDefaultMessage='请输入密码'
  >
    <Input.Password />
  </InjectIntl>
));
registerComponent('picture', <PicturesWall />);
registerComponent('switch', <Switch />);
registerComponent('slider', <Slider />);
registerComponent('file-dragger', <CustomDragger />);
registerComponent('check-group', <CustomCheckGroup />);
registerComponent('radio-group', <CustomRadioGroup />);
registerComponent('picture', <PicturesWall />);
registerComponent('string', (
  <InjectIntl
    propName='placeholder'
    intlPath='placeholder.string'
    intlDefaultMessage='请输入'
  >
    <Input />
  </InjectIntl>
));

export type ComponentMap = {
  [key in ComponentType]?: [React.ComponentClass | React.FC | React.ExoticComponent, ComponentProps?]
}

const getComponent = (type: ComponentType) => {
  const result = registeredComponents.get(type);
  return result || registeredComponents.get('string');
}

export default getComponent;

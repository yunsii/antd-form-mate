import React from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { Input, InputNumber, Slider } from "antd";
import CustomDatePicker, { CustomRangePicker } from "../CustomDatePicker/index";
import CustomSwitch from "../CustomSwitch/index";
import CustomSelect from "../CustomSelect/index";
import LocationPicker from "../LocationPicker/index";
import PicturesWall from "../PicturesWall/index";
import CustomDragger from "../CustomDragger";
import CustomCheckGroup from "../CustomCheckGroup/index";
import CustomRadioGroup from "../CustomRadioGroup/index";
import {
  ComponentType,
  ComponentProps,
} from "../../props";
import { useIntl } from '../../../intl-context';

const { TextArea, Password } = Input;

export type ComponentMap = {
  [key in ComponentType | "default"]?: [React.ComponentClass | React.FC | React.ExoticComponent, ComponentProps?]
}

const getComponent = (type: ComponentType | "default") => {
  const intl = useIntl();

  switch (type) {
    case 'date':
      return <CustomDatePicker />;
    case 'datetime':
      return <CustomDatePicker />;
    case 'date-range':
      return <CustomRangePicker format='YYYY-MM-DD' />;
    case 'datetime-range':
      return <CustomRangePicker format='YYYY-MM-DD HH:mm:ss' showTime />;
    case 'number':
      return <InputNumber placeholder={intl.getMessage('placeholder.number', '请输入')} />;
    case 'select':
      return <CustomSelect />;
    case 'textarea':
      return <TextArea placeholder={intl.getMessage('placeholder.textarea', '请输入')} />;
    case 'password':
      return <Password placeholder={intl.getMessage('placeholder.password', '请输入密码')} />;
    case 'picture':
      return <PicturesWall />;
    case 'switch':
      return <CustomSwitch />;
    case 'slider':
      return <Slider />;
    case 'file-dragger':
      return <CustomDragger />;
    case 'location':
      return <LocationPicker />;
    case 'check-group':
      return <CustomCheckGroup />;
    case 'radio-group':
      return <CustomRadioGroup />;
    case 'string':
    default:
      return <Input placeholder={intl.getMessage('placeholder.string', '请输入')} />;
  }
}

export default getComponent;

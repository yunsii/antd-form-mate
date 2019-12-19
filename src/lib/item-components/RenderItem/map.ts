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

const { TextArea, Password } = Input;

export type ComponentMap = {
  [key in ComponentType | "default"]?: [React.ComponentClass | React.FC, ComponentProps?]
}

const componentMap: ComponentMap = {
  date: [
    CustomDatePicker,
  ],
  datetime: [
    CustomDatePicker,
    {
      style: { minWidth: "unset" },
      format: "YYYY-MM-DD HH:mm:ss",
      showTime: true,
    },
  ],
  "datetime-range": [
    CustomRangePicker,
    {
      format: "YYYY-MM-DD HH:mm:ss",
      showTime: true,
    },
  ],
  "date-range": [
    CustomRangePicker,
    {
      format: "YYYY-MM-DD",
    },
  ],
  number: [
    InputNumber,
    {
      placeholder: "请输入",
    },
  ],
  select: [
    CustomSelect,
  ],
  textarea: [
    TextArea,
    {
      placeholder: "请输入",
    },
  ],
  password: [
    Password,
    {
      placeholder: "请输入密码",
    },
  ],
  picture: [
    PicturesWall,
  ],
  switch: [
    CustomSwitch,
  ],
  slider: [
    Slider,
  ],
  "file-dragger": [
    CustomDragger,
  ],
  location: [
    LocationPicker,
  ],
  "check-group": [
    CustomCheckGroup,
  ],
  "radio-group": [
    CustomRadioGroup,
  ],
  default: [
    Input,
    {
      placeholder: "请输入",
    },
  ],
}

export default componentMap;

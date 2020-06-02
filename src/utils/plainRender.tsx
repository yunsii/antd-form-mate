import React from 'react';
import { Moment } from 'moment';
import _find from 'lodash/find';
import _flatten from 'lodash/flatten';
import _join from 'lodash/join';
import isBoolean from 'lodash/isBoolean';

import { ComponentType, ComponentProps, FormMateItemProps } from '../interfaces';
import { CustomSelectProps } from '../components/CustomSelect';
import PicturesWall, { PicturesWallProps } from '../components/PicturesWall';
import { CustomRadioGroupProps } from '../components/CustomRadioGroup';
import { CustomDraggerProps } from '../components/CustomDragger';
import { CascaderProps, CascaderOptionType } from 'antd/lib/cascader';

const getOption = (value, options) => {
  return _find(options, { value });
};

const joinOptions = (options) => {
  return _join(
    options.map((item) => item.label),
    '，'
  );
};

const dateFormat = 'YYYY-MM-DD';
const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';

function plainRender({
  type,
  value,
  componentProps,
}: {
  type: ComponentType;
  value: any;
  name: FormMateItemProps['name'];
  componentProps: ComponentProps;
}): any {
  if ((!isBoolean(value) && !value) || (Array.isArray(value) && value.length === 0)) {
    return '-';
  }

  switch (type) {
    case 'date':
      return (value as Moment).format(dateFormat);
    case 'datetime':
      return (value as Moment).format(datetimeFormat);
    case 'date-range':
      return `${value[0].format(dateFormat)} ~ ${value[1].format(dateFormat)}`;
    case 'datetime-range':
      return `${value[0].format(datetimeFormat)} ~ ${value[1].format(datetimeFormat)}`;
    case 'number':
      return value ?? '-';
    case 'select':
      const { options: selectOptions, mode } = componentProps as CustomSelectProps;
      const getTargetItem = (_value) => {
        return getOption(_value, _flatten(selectOptions?.map((item) => item.options || item)));
      };

      if (mode === 'tags') {
        return value;
      }

      if (mode === 'multiple') {
        const targets = value.map(getTargetItem);
        return joinOptions(targets);
      }

      return getTargetItem(value)?.label;
    case 'picture':
      return <PicturesWall fileList={value} {...(componentProps as PicturesWallProps)} disabled />;
    case 'file-dragger':
      return <PicturesWall fileList={value} {...(componentProps as CustomDraggerProps)} disabled />;
    case 'check-group':
      const { options: checkOptions } = componentProps as CustomRadioGroupProps;
      return joinOptions(value.map((item) => getOption(item, checkOptions)));
    case 'radio-group':
      const { options: radioOptions } = componentProps as CustomRadioGroupProps;
      return getOption(value, radioOptions)?.label;
    case 'number-range':
      return value.min && value.max ? `${value.min} ~ ${value.max}` : '-';
    case 'cascader':
      const {
        options: cascaderOptions,
        displayRender = (labels) => labels.join(' / '),
      } = componentProps as CascaderProps;

      const labels: string[] = [];
      const selectedOptions: CascaderOptionType[] = [];

      const loopOptions = (_options, index = 0) => {
        console.log(value?.[index], _options);
        const target = getOption(value?.[index], _options)!;

        labels.push(target.label);
        selectedOptions.push(target);

        if (index + 1 < value.length) {
          loopOptions(target.children, index + 1);
        }
      };
      loopOptions(cascaderOptions);

      return displayRender(labels, selectedOptions);
    default:
      return value.toString() || '-';
  }
}

export default plainRender;

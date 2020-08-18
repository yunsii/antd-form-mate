import React from 'react';
import { Slider } from 'antd';
import { SliderSingleProps, SliderRangeProps } from 'antd/lib/slider';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

export interface SliderEntryProps
  extends NewFormMateItemPropsWithoutChildren<any, SliderSingleProps | SliderRangeProps> {}

const plainRender: PlainRenderFn<any, SliderSingleProps | SliderRangeProps> = ({ value, entryProps }) => {
  const { range } = entryProps;

  return range ? value.join('~') : value;
};

const SliderEntry: React.FC<SliderEntryProps> = (props) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <Slider {...props.entryProps} />
    </FormMateItem>
  );
};

SliderEntry.displayName = getEntryDisplayName(SliderEntry);

export default SliderEntry;

import React from 'react';
import { Slider } from 'antd';
import { SliderProps } from 'antd/lib/slider';

import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface SliderEntryProps extends NewFormMateItemPropsWithoutChildren<SliderProps> {}

const SliderEntry: React.FC<SliderEntryProps> = (props) => {
  return (
    <FormMateItem {...props}>
      <Slider {...props.entryProps} />
    </FormMateItem>
  );
};

SliderEntry.displayName = `FM.${SliderEntry.name}`;

export default SliderEntry;

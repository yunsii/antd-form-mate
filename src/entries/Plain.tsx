import React from 'react';
import _get from 'lodash/get';
import { FormInstance } from 'antd/lib/form';

import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface PlainProps extends NewFormMateItemPropsWithoutChildren<void> {}

const Plain: React.FC<PlainProps> = (props) => {
  // name maybe: type InternalNamePath = (string | number)[]
  const { name, ...rest } = props;
  return (
    <FormMateItem
      noStyle
      shouldUpdate={(prevValues, currentValues) => _get(prevValues, name!) !== _get(currentValues, name!)}
    >
      {({ getFieldValue }: FormInstance) => {
        return (
          <FormMateItem name={name} {...rest}>
            <div className='ant-form-text'>{getFieldValue(name!)}</div>
          </FormMateItem>
        );
      }}
    </FormMateItem>
  );
};

Plain.displayName = `FM.${Plain.name}`;

export default Plain;

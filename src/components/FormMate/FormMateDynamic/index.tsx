import React, { useContext } from 'react';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import _find from 'lodash/find';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';

import { FormMateDynamicProps } from '../../../interfaces';
import FormMateContext from '../../../contexts/FormMateContext';
import { FormMateDynamicDisplayName } from '../../../constants/components';
import FormMateItem from '../FormMateItem';
import { getChildName } from '../utils';

export const FormMateDynamic = <T, P = {}>({
  name,
  render,
  children,
  shouldUpdate,
  ...restFormItemProps
}: FormMateDynamicProps<T, P>) => {
  const { renderItem } = useContext(FormMateContext);

  return (
    <Form.Item noStyle shouldUpdate={shouldUpdate}>
      {render
        ? (((form: FormInstance) => {
            const isVisible = render(form);
            if (!isVisible) {
              return null;
            }

            const formItem = <FormMateItem name={name} {...restFormItemProps} />;
            return renderItem ? renderItem(formItem, getChildName(formItem)) : formItem;
          }) as any)
        : children!}
    </Form.Item>
  );
};

FormMateDynamic.displayName = FormMateDynamicDisplayName;

export default FormMateDynamic;

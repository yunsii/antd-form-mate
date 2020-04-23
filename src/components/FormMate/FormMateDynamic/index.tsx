import React, { useContext } from 'react';
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
    <Form.Item noStyle shouldUpdate={shouldUpdate || true}>
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

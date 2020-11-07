import React, { useContext } from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _omit from 'lodash/omit';
import { Form } from 'antd';
import { FormInstance, FormItemProps } from 'antd/lib/form';
import FormMateContext from '../../../contexts/FormMateContext';
import { useIntl } from '../../../contexts/Intlcontext';
import { FormMateItemDisplayName } from '../../../constants/components';
import { cloneElement } from '../../../utils/reactNode';

declare type RenderChildren = (form: FormInstance) => React.ReactNode;

export type PlainRenderFn<V = any, P = Object> = (item: {
  value: V;
  name: NewFormMateItemProps<P>['name'];
  entryProps: P;
  children: RenderChildren | React.ReactNode;
}) => any;

export interface NewFormMateItemProps<V = any, P = any> extends FormItemProps {
  entryProps?: P;
  plain?: boolean;
  plainRender?: PlainRenderFn<V, P>;
  dynamicRender?: (form: FormInstance) => boolean | void;
  dense?: boolean;
}

export type NewFormMateItemPropsWithoutChildren<V = any, P = Object> = Omit<NewFormMateItemProps<V, P>, 'children'>;

const FormMateItem = <P,>(props: NewFormMateItemProps<P>) => {
  const intl = useIntl();
  const { renderItem } = useContext(FormMateContext);

  const { name, children, style, dense, extra, rules, plain, plainRender, dynamicRender, entryProps, ...rest } = props;

  function getStyle() {
    return dense ? { marginBottom: 0, ...style } : style;
  }

  if (!name) {
    /** 如果没有 `name` ，尚可使用 `dense` 属性 */
    return <Form.Item {...props} style={getStyle()} />;
  }

  if (dynamicRender) {
    return (
      <Form.Item noStyle shouldUpdate={rest.shouldUpdate || true}>
        {(form: FormInstance) => {
          if (dynamicRender(form)) {
            return renderItem ? (
              renderItem(<FormMateItem {..._omit(props, 'dynamicRender')}>{children}</FormMateItem>, name)
            ) : (
              <FormMateItem {..._omit(props, 'dynamicRender')}>{children}</FormMateItem>
            );
          }
          return null;
        }}
      </Form.Item>
    );
  }

  if (plain) {
    return (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => _get(prevValues, name!) !== _get(currentValues, name!)}
      >
        {({ getFieldValue }: FormInstance) => {
          const itemValue = getFieldValue(name!);

          return (
            <Form.Item name={name} style={getStyle()} {...rest}>
              {typeof plainRender === 'function'
                ? plainRender({
                    name,
                    value: itemValue,
                    entryProps: entryProps || ({} as P),
                    children,
                  }) ?? '-'
                : 'No plainRender.'}
            </Form.Item>
          );
        }}
      </Form.Item>
    );
  }

  function setRules() {
    let result = [...(rules || [])];

    if (rest.required && !_find(result, { required: true })) {
      result = [
        {
          required: true,
          message: `${rest.label} ${intl.getMessage('message.isRequired', '必填')}`,
        },
        ...result,
      ];
    }

    return result;
  }

  return (
    <Form.Item name={name} {...rest} style={getStyle()} rules={setRules()}>
      {cloneElement(children, _get(children, 'props.style') ? {} : { style: { width: '100%' } })}
    </Form.Item>
  );
};

FormMateItem.displayName = FormMateItemDisplayName;

export default FormMateItem;

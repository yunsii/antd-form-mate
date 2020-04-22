import React from 'react';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';

import { FormMateItemDisplayName, FormMateDynamicDisplayName } from '../../constants/components';
import { useIntl } from '../../contexts/Intlcontext';
import { ComponentType, FormMateItemProps } from '../../interfaces';

export interface InjectIntlProps {
  propName: string;
  // 之前该字段名为 `id` ，由于父级组件（未探明，可能是表单组件）也会注入 `id` 属性，遂使用 intl 前缀
  intlPath: string;
  intlDefaultMessage: string;
  children: JSX.Element;
}

export const InjectIntl: React.FC<InjectIntlProps> = ({
  propName,
  intlPath,
  intlDefaultMessage,
  children,
  ...rest
}) => {
  const intl = useIntl();
  return React.cloneElement(children, {
    [propName]: intl.getMessage(intlPath, intlDefaultMessage),
    ...rest,
  });
};

export function isJsxChild(child: React.ReactNode): child is JSX.Element {
  return React.isValidElement(child) && !_isString(child);
}

export function getChildName(child: React.ReactNode) {
  if (isJsxChild(child)) {
    if (_isString(child.type)) {
      return child.type;
    }

    return (child.type as any).displayName || child.type.name || 'Component';
  }
  return null;
}

export function getChildType(child: React.ReactNode): ComponentType | null {
  if (React.isValidElement(child) && !_isString(child)) {
    return child.props.type;
  }
  return null;
}

export function isFormItem(child: React.ReactNode): child is JSX.Element {
  return (
    React.isValidElement(child) && [FormMateItemDisplayName, FormMateDynamicDisplayName].includes(getChildName(child))
  );
}

export const isFormDynamic = (child: React.ReactNode) => {
  return React.isValidElement(child) && FormMateDynamicDisplayName === getChildName(child);
};

export function getFormItemName(child: React.ReactNode): FormMateItemProps['name'] {
  if (isFormItem(child)) {
    return child.props.name;
  }
  return undefined;
}

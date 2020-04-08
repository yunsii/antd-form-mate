import React from 'react';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';

import { useIntl } from '../../contexts/Intlcontext';
import { ComponentType } from '../../interfaces';

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

export function getChildName(child: React.ReactNode) {
  if (React.isValidElement(child) && !_isString(child)) {
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

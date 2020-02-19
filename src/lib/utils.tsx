import React from "react";
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { useIntl } from '../intl-context';

export interface InjectIntlProps {
  name: string;
  id: string;
  defaultMessage: string;
  children: JSX.Element;
}

export const InjectIntl: React.FC<InjectIntlProps> = ({ name, id, defaultMessage, children, ...rest }) => {
  const intl = useIntl();
  return React.cloneElement(children, {
    [name]: intl.getMessage(id, defaultMessage),
    ...rest,
  });
}

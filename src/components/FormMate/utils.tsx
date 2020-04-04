import React from "react";
import { Col } from 'antd';
import _isFunction from 'lodash/isFunction';
import { useIntl } from '../../contexts/Intlcontext';
import { WithCol, ItemConfig } from "../../interfaces";

export interface InjectIntlProps {
  propName: string;
  // 之前该字段名为 `id` ，由于父级组件（未探明，可能是表单组件）也会注入 `id` 属性，遂使用 intl 前缀
  intlPath: string;
  intlDefaultMessage: string;
  children: JSX.Element;
}

export const InjectIntl: React.FC<InjectIntlProps> = ({ propName, intlPath, intlDefaultMessage, children, ...rest }) => {
  const intl = useIntl();
  return React.cloneElement(children, {
    [propName]: intl.getMessage(intlPath, intlDefaultMessage),
    ...rest,
  });
}

export const renderCol = (config: ItemConfig, withCol?: WithCol) => (formItem: JSX.Element) => {
  if (withCol && config.type !== 'dynamic') {
    const colProps = _isFunction(withCol) ? withCol(config) : withCol;
    return (
      <Col
        key={`${config.name}`}
        {...colProps}
      >
        {formItem}
      </Col>
    );
  }
  return formItem;
}

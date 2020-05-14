import React from 'react';
import { FormMateProps, ComponentType } from '../../interfaces';

export interface FormMateConsumerProps {
  renderItem?: FormMateProps['renderItem'];
  type?: ComponentType;
  plainRender?: FormMateProps['plainRender'];
}

export const FormMateContext = React.createContext<FormMateConsumerProps>({});

FormMateContext.displayName = "antd-form-mate's FormMateContext";

/** 共享 `FormMate` 组件属性 */
export default FormMateContext;

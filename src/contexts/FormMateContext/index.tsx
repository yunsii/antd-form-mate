import React from 'react';
import { FormMateProps } from '../../interfaces';

export interface FormMateConsumerProps {
  renderItem?: FormMateProps['renderItem'];
}

export const FormMateContext = React.createContext<FormMateConsumerProps>({});

FormMateContext.displayName = "antd-form-mate's FormMateContext";

/** 共享 `FormMate` 组件属性 */
export default FormMateContext;

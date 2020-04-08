import React from 'react';

export interface FormMateConsumerProps {
  renderItem?: (item: React.ReactNode, name: string | null) => React.ReactNode;
}

export const FormMateContext = React.createContext<FormMateConsumerProps>({});

FormMateContext.displayName = "antd-form-mate's FormMateContext";

/** 共享 `FormMate` 组件属性 */
export default FormMateContext;

import React from 'react';
import { FormMateWrapperDisplayName } from '../../constants/components';

const FormMateWrapper: React.FC = ({ children }) => {
  return <>{children}</>;
};

FormMateWrapper.displayName === FormMateWrapperDisplayName;

export default FormMateWrapper;

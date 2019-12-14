import React, { useContext } from "react";
import _get from 'lodash/get';
import ConfigContext from '../../../config-provider/context';

export interface CurrentAddressProps {
  formattedAddress?: string;
}

export const CurrentAddress: React.FC<CurrentAddressProps> = ({
  formattedAddress,
  children,
}) => {
  const { afmLocale: { map } } = useContext(ConfigContext);
  const setAddress = () => formattedAddress || map.addressPickPlaceholder;

  return (
    <div>
      <p style={{ margin: '8px 0' }}>{map.currentAddress}{setAddress()}</p>
      {children}
    </div>
  );
}

export default CurrentAddress;

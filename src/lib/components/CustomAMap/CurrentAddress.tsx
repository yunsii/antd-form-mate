import React, { useContext } from "react";
import _get from 'lodash/get';
import ConfigContext from '../../../ConfigContext';
import defaultLocal from '../../../defaultLocal';

export interface CurrentAddressProps {
  formattedAddress?: string;
}

export const CurrentAddress: React.FC<CurrentAddressProps> = ({
  formattedAddress,
  children,
}) => {
  const { setLocale } = useContext(ConfigContext);
  const placeholder = _get(setLocale, 'map.addressPickPlaceholder') || defaultLocal.map.addressPickPlaceholder;
  const currentAddress = _get(setLocale, 'map.currentAddress') || defaultLocal.map.currentAddress;
  const setAddress = () => formattedAddress || placeholder;

  return (
    <div>
      <p style={{ margin: '8px 0' }}>{currentAddress}{setAddress()}</p>
      {children}
    </div>
  );
}

export default CurrentAddress;

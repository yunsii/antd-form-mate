import React from "react";
import { mapLocale } from '../../../locale';

export interface CurrentAddressProps {
  formattedAddress?: string;
}

export const CurrentAddress: React.FC<CurrentAddressProps> = ({
  formattedAddress,
  children,
}) => {
  const setAddress = () => formattedAddress || mapLocale.addressPickPlaceholder;

  return (
    <div>
      <p style={{ margin: '8px 0' }}>{mapLocale.currentAddress}{setAddress()}</p>
      {children}
    </div>
  );
}

export default CurrentAddress;

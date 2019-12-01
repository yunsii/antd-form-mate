import React from "react";
import { mapLocale } from '../../../locale';

export interface CurrentAddressProps {
  formattedAddress?: string;
}

export const CurrentAddress: React.FC<CurrentAddressProps> = ({
  formattedAddress,
  children,
}) => {
  let renderFormattedAddress = mapLocale.addressPickPlaceholder;
  if (formattedAddress) {
    renderFormattedAddress = formattedAddress;
  }

  return (
    <div>
      <p style={{ margin: '8px 0' }}>{mapLocale.currentAddress}{renderFormattedAddress}</p>
      {children}
    </div>
  );
}

export default CurrentAddress;

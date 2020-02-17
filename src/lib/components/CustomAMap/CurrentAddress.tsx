import React from "react";
import _get from 'lodash/get';

import { useIntl } from "../../../intl-context";

export interface CurrentAddressProps {
  formattedAddress?: string;
}

export const CurrentAddress: React.FC<CurrentAddressProps> = ({
  formattedAddress,
  children,
}) => {
  const intl = useIntl();

  const setAddress = () => formattedAddress || intl.getMessage('map.addressPickPlaceholder', '请选择地址');

  return (
    <div>
      <p style={{ margin: '8px 0' }}>{intl.getMessage('map.currentAddress', '当前地址：')}{setAddress()}</p>
      {children}
    </div>
  );
}

export default CurrentAddress;

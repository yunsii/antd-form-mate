import React from 'react';

import { cloneElement } from '../../utils/reactNode';
import styles from './index.less';

export interface AddonWrapperProps {
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
}

const AddonWrapper: React.FC<AddonWrapperProps> = (props) => {
  const { addonBefore, addonAfter, children } = props;

  const addonBeforeNode = addonBefore ? (
    <span className={styles.addon}>{addonBefore}</span>
  ) : null;
  const addonAfterNode = addonAfter ? (
    <span className={styles.addon}>{addonAfter}</span>
  ) : null;

  return (
    <span className={styles.wrapper}>
      {addonBeforeNode}
      {cloneElement(children, { style: null })}
      {addonAfterNode}
    </span>
  );
};

export default AddonWrapper;

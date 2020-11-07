import React from 'react';
import { UploadFile } from 'antd/lib/upload/interface';

import { getEntryDisplayName } from './utils';
import { cloneElement } from '../utils/reactNode';
import CustomUploadDragger, { CustomDraggerProps } from '../components/CustomUploadDragger';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface UpdateDraggerEntryProps
  extends NewFormMateItemPropsWithoutChildren<UploadFile[] | undefined, CustomDraggerProps> {}

const UploadDraggerEntry: React.FC<UpdateDraggerEntryProps> = (props) => {
  console.log(props);

  return (
    <FormMateItem
      valuePropName='fileList'
      plainRender={({ children, entryProps }) => cloneElement(children, { ...entryProps, disabled: true })}
      {...props}
    >
      <CustomUploadDragger {...props.entryProps} />
    </FormMateItem>
  );
};

UploadDraggerEntry.displayName = getEntryDisplayName(UploadDraggerEntry);

export default UploadDraggerEntry;
